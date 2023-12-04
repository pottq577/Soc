import numpy as np
import pandas as pd
from tqdm import tqdm
#선택 경기에 대한 패스에 대한 모든 정보
pd.set_option('display.max_columns', 40)

match_id = 2499719
match_events = pd.read_pickle(f'data/refined_events/England/{match_id}.pkl')
pass_records = match_events[
    (match_events['event_type'] == 'Pass') |
    (match_events['sub_event_type'].isin(['Free kick', 'Free kick cross', 'corner']))
]
passes = pass_records.groupby(['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
passes.name = 'total_passes'

#정확도
acc_pass_records = pass_records[pass_records['tags'].apply(lambda x: 'Accurate' in x)]
acc_passes = acc_pass_records.groupby(['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
acc_passes.name = 'acc_passes'

pass_stats = pd.concat([passes, acc_passes], axis=1).fillna(0).astype(int)
pass_stats['pass_accuracy'] = (pass_stats['acc_passes'] / pass_stats['total_passes']).round(2)
pass_stats