import numpy as np
import pandas as pd
from tqdm import tqdm

pd.set_option('display.max_columns', 40)
match_id = 2499719
match_events = pd.read_pickle(f'data/refined_events/England/{match_id}.pkl')

#슈팅 횟수
shot_records = match_events[
    (match_events['event_type'] == 'Shot') |
    (match_events['sub_event_type'].isin(['Free kick shot', 'Penalty']))
]
shots = shot_records.groupby(['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
shots.name = 'total_shots'

#패스 횟수
pass_records = match_events[
    (match_events['event_type'] == 'Pass') |
    (match_events['sub_event_type'].isin(['Free kick', 'Free kick cross', 'corner']))
]
passes = pass_records.groupby(['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
passes.name = 'total_passes'

#파울 횟수
foul_records = match_events[match_events['event_type'] == 'Foul']
fouls = foul_records.groupby(['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
fouls.name = 'fouls'

#오프사이드 횟수
offside_records = match_events[match_events['event_type'] == 'Offside']
offsides = offside_records.groupby(['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
offsides.name = 'offsides'

#유효 슈팅 횟수 + 신체 부위별 슈팅 횟수
acc_shot_records = shot_records[shot_records['tags'].apply(lambda x: 'Accurate' in x)]
acc_shots = acc_shot_records.groupby(['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
acc_shots.name = 'shots_on_target'
rshot_records = shot_records[shot_records['tags'].apply(lambda x: 'Right foot' in x)]
rshots = rshot_records.groupby(['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
rshots.name = 'rfoot_shots'
lshot_records = shot_records[shot_records['tags'].apply(lambda x: 'Left foot' in x)]
lshots = lshot_records.groupby(['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
lshots.name = 'lfoot_shots'
hshot_records = shot_records[shot_records['tags'].apply(lambda x: 'Head/body' in x)]
hshots = hshot_records.groupby(['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
hshots.name = 'header_shots'
shot_stats_list = [shots, acc_shots, rshots, lshots, hshots]
shot_stats = pd.concat(shot_stats_list, axis=1).fillna(0).astype(int)

#득점/도움/자책골 횟수
goal_records = match_events[match_events['tags'].apply(lambda x: 'Goal' in x)]
goals = goal_records.groupby(['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
goals.name = 'goals' #골
assist_records = match_events[match_events['tags'].apply(lambda x: 'Assist' in x)]
assists = assist_records.groupby(['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
assists.name = 'assists' #도움
own_goal_records = match_events[match_events['tags'].apply(lambda x: 'Own goal' in x)]
own_goals = own_goal_records.groupby(['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
own_goals.name = 'own_goals' #자책골
goal_stats_list = [goals, assists, own_goals]
goal_stats = pd.concat(goal_stats_list, axis=1).fillna(0).astype(int)

#패스 성공률
acc_pass_records = pass_records[pass_records['tags'].apply(lambda x: 'Accurate' in x)]
acc_passes = acc_pass_records.groupby(['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
acc_passes.name = 'acc_passes'
pass_stats = pd.concat([passes, acc_passes], axis=1).fillna(0).astype(int)
pass_stats['pass_accuracy'] = (pass_stats['acc_passes'] / pass_stats['total_passes']).round(2)

#경고/퇴장 횟수
yellow_records = foul_records[foul_records['tags'].apply(lambda x: 'Yellow card' in x)]
yellows = yellow_records.groupby(['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
yellows.name = 'yellow_cards'
red_records = foul_records[foul_records['tags'].apply(lambda x: 'Red card' in x)]
reds = red_records.groupby(['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
reds.name = 'red_cards'
foul_stats = pd.concat([fouls, offsides, yellows, reds], axis=1).fillna(0).astype(int)

#경기 내 선수별 기록 정리표
player_stats = pd.concat([goal_stats, shot_stats, foul_stats, pass_stats], axis=1, sort=True)
player_stats = player_stats.fillna(0).reset_index()
for col in player_stats.columns[4:]:
    if col != 'pass_accuracy':
        player_stats[col] = player_stats[col].astype(int)

#선수교체 및 퇴장 기록 필터링
player_change_records = match_events[
    (match_events['event_type'] == 'Substitution') |
    (match_events['tags'].apply(lambda x: 'Red card' in x))
]
#선발 선수 추출
in_players = player_change_records[player_change_records['sub_event_type'] == 'Player in']['player_id'].tolist()
player_ids = [p for p in match_events['player_id'].unique() if not p in in_players]

#선수 교체 및 퇴장 기록을 활용한 페이즈 구분 
period_durations = match_events.groupby('period')['time'].max()
phase_record_list = []
phase = 1
for period in period_durations.index:
    change_times = player_change_records[player_change_records['period'] == period]['time'].unique().tolist()
    change_times.append(period_durations[period])
    if 0 not in change_times:
        change_times = [0] + change_times

    for i in range(len(change_times[:-1])):
        moment_records = player_change_records[
            (player_change_records['period'] == period) &
            (player_change_records['time'] == change_times[i])
        ]
        for _, record in moment_records.iterrows():
            if record['sub_event_type'] == 'Player out' or record['event_type'] == 'Foul':
                player_ids.remove(record['player_id'])
            else:
                player_ids.append(record['player_id'])
        phase_record = {
            'phase': phase,
            'period': period,
            'start_time': change_times[i],
            'end_time': change_times[i+1],
            'duration': change_times[i+1] - change_times[i],
            'player_ids': player_ids.copy()
        }
        phase += 1
        phase_record_list.append(phase_record)
phase_records = pd.DataFrame(phase_record_list).set_index('phase')

#선수별 각 페이즈 출전 여부 판단
player_ids = np.sort(match_events['player_id'].unique())
for player_id in player_ids:
    phase_records[player_id] = 0

for phase in phase_records.index:
    for player_id in phase_records.at[phase, 'player_ids']:
        phase_records.at[phase, player_id] = 1

phase_records = phase_records[np.concatenate([phase_records.columns[:4], player_ids])]

#선수별 출전 시간 산출
playing_times = pd.Series(index=player_ids, dtype='float')
for player_id in player_ids:
    playing_times[player_id] = phase_records[phase_records[player_id] == 1]['duration'].sum().round(1)
playing_times = playing_times.reset_index()
playing_times.columns = ['player_id', 'playing_time']

#출전 시간 정보 추가
player_stats = pd.merge(player_stats, playing_times)

#출력
player_stats