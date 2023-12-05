from flask import Flask, jsonify, request, url_for, send_file, render_template
from flask_cors import CORS
from database import db
from models import Player
from models import Team
from models import Competition
from models import Tag2Name
from models import MatchEngland
from models import EnglandEvent
from models import Match
from models import TeamRank
import requests
import subprocess
import os
import json
import pandas as pd
import numpy as np
from tqdm import tqdm

import matplotlib.pyplot as plt
from collections import defaultdict
from Analysis.plot_utils import draw_pitch
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
from io import BytesIO
from stats_generator import generate_player_stats

portNum = 5002


def create_app():
    app = Flask(__name__, static_url_path='/static', static_folder='static')

    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://hyun2y00:1234@localhost/Soc'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    return app


app = create_app()

# 선수


@app.route('/players', methods=['GET'])
def get_players():
    # Player 모델을 사용하여 데이터베이스의 모든 선수 레코드를 조회합니다.
    players = Player.query.all()

    # 각 선수의 데이터를 JSON 형식으로 변환합니다.
    players_data = [
        {
            'wyid': player.wyid,
            'firstname': player.firstname,
            'lastname': player.lastname,
            'passportarea_name': player.passportarea_name,
            'passportarea_id': player.passportarea_id,
            'passportarea_alpha3code': player.passportarea_alpha3code,
            'passportarea_alpha2code': player.passportarea_alpha2code,
            'weight': player.weight,
            'currentteamid': player.currentteamid,
            'height': player.height,
            'role_code2': player.role_code2,
            'role_code3': player.role_code3,
            'role_name': player.role_name,
            'birtharea_name': player.birtharea_name,
            'birtharea_id': player.birtharea_id,
            'birtharea_alpha3code': player.birtharea_alpha3code,
            'birtharea_alpha2code': player.birtharea_alpha2code,
            'foot': player.foot,
            'shortname': player.shortname,
            'currentnationalteamid': player.currentnationalteamid
        } for player in players
    ]

    # JSON 형식으로 변환된 데이터를 반환합니다.
    return jsonify(players_data)

# 팀


@app.route('/teams', methods=['GET'])
def get_teams():
    # Team 모델을 사용하여 데이터베이스의 모든 팀 레코드를 조회합니다.
    teams = Team.query.all()

    # 각 팀의 데이터를 JSON 형식으로 변환합니다.
    teams_data = [
        {
            'wyid': team.wyid,
            'name': team.name,
            'city': team.city,
            'officialname': team.officialname,
            'area_name': team.area_name,
            'area_id': team.area_id,
            'area_alpha3code': team.area_alpha3code,
            'area_alpha2code': team.area_alpha2code,
            'type': team.type
        } for team in teams
    ]

    # JSON 형식으로 변환된 데이터를 반환합니다.
    return jsonify(teams_data)

# 경쟁 리그(England만 사용가능 나머지는 더미데이터)


@app.route('/competitions', methods=['GET'])
def get_competitions():
    # Competition 모델을 사용하여 데이터베이스의 모든 대회 레코드를 조회합니다.
    competitions = Competition.query.all()

    # 각 대회의 데이터를 JSON 형식으로 변환합니다.
    competitions_data = [
        {
            'wyid': competition.wyid,
            'name': competition.name,
            'format': competition.format,
            'area_name': competition.area_name,
            'area_id': competition.area_id,
            'area_alpha3code': competition.area_alpha3code,
            'area_alpha2code': competition.area_alpha2code,
            'type': competition.type
        } for competition in competitions
    ]

    # JSON 형식으로 변환된 데이터를 반환합니다.
    return jsonify(competitions_data)

# Tags(이벤트 태그명)


@app.route('/tags2name', methods=['GET'])
def get_tags2name():
    # Tag2Name 모델을 사용하여 데이터베이스의 모든 태그 레코드를 조회합니다.
    tags = Tag2Name.query.all()

    # 각 태그의 데이터를 JSON 형식으로 변환합니다.
    tags_data = [
        {
            'tag': tag.tag,
            'label': tag.label,
            'description': tag.description
        } for tag in tags
    ]

    # JSON 형식으로 변환된 데이터를 반환합니다.
    return jsonify(tags_data)

# 경기


@app.route('/matches_england', methods=['GET'])
def get_matches_england():
    # MatchEngland 모델을 사용하여 데이터베이스의 모든 경기 레코드를 조회합니다.
    matches = MatchEngland.query.all()

    # 각 경기의 데이터를 JSON 형식으로 변환합니다.
    matches_data = [
        {
            'wyid': match.wyid,
            'status': match.status,
            'roundid': match.roundid,
            'gameweek': match.gameweek,
            'teamsdata': match.teamsdata,
            'seasonid': match.seasonid,
            'dateutc': match.dateutc.isoformat() if match.dateutc else None,
            'winner': match.winner,
            'venue': match.venue,
            'label': match.label,
            'date': match.date,
            'referees': match.referees,
            'duration': match.duration,
            'competitionid': match.competitionid
        } for match in matches
    ]

    # JSON 형식으로 변환된 데이터를 반환합니다.
    return jsonify(matches_data)

# 이벤트


@app.route('/england_events', methods=['GET'])
def get_england_events():
    # 페이지 번호와 페이지당 항목 수 매개변수를 받아옵니다.
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 100, type=int)

    # paginate 메소드를 사용하여 데이터를 페이지별로 반환합니다.
    paginated_events = EnglandEvent.query.paginate(
        page=page, per_page=per_page)

    # 각 이벤트의 데이터를 JSON 형식으로 변환합니다.
    events_data = [
        {
            'index': event.index,
            'match_id': event.match_id,
            'event_id': event.event_id,
            'period': event.period,
            'time': event.time,
            'team_id': event.team_id,
            'team_name': event.team_name,
            'player_id': event.player_id,
            'player_name': event.player_name,
            'event_type': event.event_type,
            'sub_event_type': event.sub_event_type,
            'tags': event.tags,
            'start_x': event.start_x,
            'start_y': event.start_y,
            'end_x': event.end_x,
            'end_y': event.end_y
        } for event in paginated_events.items
    ]
    # 다음 페이지의 URL 생성
    if paginated_events.has_next:
        next_url = url_for(
            'get_england_events', page=paginated_events.next_num, per_page=per_page, _external=True)
    else:
        next_url = None

    response = {
        'events': events_data,
        'next_url': next_url
    }

    return jsonify(response)

# '/matches' 경로에 대한 GET 요청 처리


@app.route('/matches', methods=['GET'])
def get_matches():
    try:
        # 데이터베이스에서 모든 경기 레코드를 조회합니다.
        matches = Match.query.all()

        # 각 경기의 데이터를 JSON 형식으로 변환합니다.
        matches_data = [
            {
                'match_id': match.match_id,
                'gameweek': match.gameweek,
                'datetime': match.datetime.isoformat(),
                'venue': match.venue,
                'team1_id': match.team1_id,
                'team1_name': match.team1_name,
                'team1_goals': match.team1_goals,
                'team2_id': match.team2_id,
                'team2_name': match.team2_name,
                'team2_goals': match.team2_goals,
                'duration': match.duration
            } for match in matches
        ]

        # JSON 형식으로 변환된 데이터를 반환합니다.
        return jsonify(matches_data)
    except Exception as e:
        # 예외 처리
        return jsonify({'error': str(e)}), 500


@app.route('/TeamRank', methods=['GET'])
def get_standings():
    try:
        # 데이터베이스에서 모든 축구 리그 순위 레코드를 조회합니다.
        teamRank = TeamRank.query.all()

        # 각 팀의 순위 데이터를 JSON 형식으로 변환합니다.
        standings_data = [
            {
                'rank': standing.rank,
                'team': standing.team,
                'matches': standing.matches,
                'wins': standing.wins,
                'draws': standing.draws,
                'losses': standing.losses,
                'goals_for': standing.goals_for,
                'goals_against': standing.goals_against,
                'goal_difference': standing.goal_difference,
                'points': standing.points
            } for standing in teamRank
        ]

        # JSON 형식으로 변환된 데이터를 반환합니다.
        return jsonify(standings_data)
    except Exception as e:
        # 예외 처리
        return jsonify({'error': str(e)}), 500

# 엔드포인트: 특정 팀의 선수 목록 조회


@app.route('/get-team-players', methods=['POST'])
def get_team_players():
    try:
        data = request.json
        team_id = data.get('teamId')

        if not team_id:
            return jsonify({'error': 'Team ID is required'}), 400

        # 서버의 다른 엔드포인트에서 선수들의 데이터를 조회
        players_data = requests.get('http://127.0.0.1:5002/players').json()

        # 해당 팀 ID에 맞는 선수만 필터링
        team_players = [
            player for player in players_data if player['currentteamid'] == int(team_id)]

        # 선수 목록을 JSON 형식으로 반환
        return jsonify(team_players)
    except Exception as e:
        # 예외 상황에 대한 정보를 로그로 남김
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

################################################


@app.route('/match/<matchId>', methods=['GET'])
def get_match(matchId):
    match = Match.query.get(matchId)
    if match:
        return jsonify({
            'match_id': match.match_id,
            'gameweek': match.gameweek,
            'datetime': match.datetime.isoformat(),
            'venue': match.venue,
            'team1_id': match.team1_id,
            'team1_name': match.team1_name,
            'team1_goals': match.team1_goals,
            'team2_id': match.team2_id,
            'team2_name': match.team2_name,
            'team2_goals': match.team2_goals,
            'duration': match.duration
        })
    else:
        return jsonify({'message': 'Match not found'}), 404


@app.route('/teams/england', methods=['GET'])
def get_england_teams():
    try:
        # 기존 '/teams' 엔드포인트에서 모든 팀 데이터를 가져옵니다.
        teams_response = requests.get('http://127.0.0.1:5002/teams')
        if teams_response.status_code != 200:
            raise Exception("Failed to fetch teams data")

        # JSON 형식으로 변환된 데이터를 파싱
        teams_data = teams_response.json()

        # England 지역의 팀들만 필터링
        england_teams = [
            team for team in teams_data if 'England' in team.get('area_name', '')]

        # 필터링된 팀들을 JSON 형식으로 반환
        return jsonify(england_teams)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# 기존 엔드포인트에서 데이터를 가져오는 함수
def fetch_data(endpoint):
    response = requests.get(endpoint)
    return response.json() if response.status_code == 200 else None

# 새로운 엔드포인트: refined_events


@app.route('/refined_events', methods=['GET'])
def refined_events():
    try:
        # 기존 엔드포인트에서 데이터 가져오기
        matches_data = fetch_data('http://127.0.0.1:5002/matches_england')
        events_data = fetch_data(
            'http://127.0.0.1:5002/england_events')['events']
        teams_data = fetch_data('http://127.0.0.1:5002/teams')
        players_data = fetch_data('http://127.0.0.1:5002/players')

        # 데이터가 정상적으로 로드되었는지 확인
        if not (matches_data and events_data and teams_data and players_data):
            raise ValueError("Failed to fetch data from the endpoints")

        # 팀과 플레이어 정보를 사전 형태로 변환
        team_dict = {team['wyid']: team['name'] for team in teams_data}
        player_dict = {player['wyid']: player['shortname']
                       for player in players_data}

        # 이벤트 데이터 변환
        refined_events = []
        for event in events_data:
            team_name = team_dict.get(event['team_id'], 'Unknown')
            player_name = player_dict.get(event['player_id'], 'Unknown')

            refined_event = {
                'match_id': event['match_id'],
                'event_id': event['event_id'],
                'team_name': team_name,
                'player_name': player_name,
                # 기타 필요한 필드 추가
            }
            refined_events.append(refined_event)

        return jsonify(refined_events)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 득점왕 실행 요청
# @app.route('/run-goal-stats', methods=['GET'])
# def run_goal_stats():
#     try:
#         # 스크립트 파일 경로 설정
#         script_path = os.path.join('mstp', 'tp', 'Server', 'Analysis', 'goal_stats.py')

#         # 파이썬 스크립트 실행
#         result = subprocess.run(['python', script_path], capture_output=True, text=True)

#         # 결과 반환
#         return jsonify({'output': result.stdout})
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500


@app.route('/run-goal-stats', methods=['GET'])
def run_goal_stats():
    try:
        # 스크립트 실행
        script_path = os.path.join(app.root_path, 'Analysis', 'goal_stats.py')
        result = subprocess.run(['python', script_path],
                                capture_output=True, text=True)

        # 결과 반환
        if result.returncode == 0:
            return jsonify({'output': result.stdout})
        else:
            return jsonify({'error': result.stderr}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500


#           ===== ↓ 경기별 기록 모음집 ↓ =====

# 경기별 슈팅 기록 조회
@app.route('/get_shots/<int:match_id>', methods=['GET'])
def get_shots(match_id):
    try:
        pd.set_option('display.max_columns', 40)
        match_events = pd.read_pickle(
            f'Analysis/data/refined_events/England/{match_id}.pkl')
        shot_records = match_events[
            (match_events['event_type'] == 'Shot') |
            (match_events['sub_event_type'].isin(
                ['Free kick shot', 'Penalty']))
        ]
        shots = shot_records.groupby(
            ['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
        shots.name = 'total_shots'
        # 결과를 JSON 형식으로 변환
        result = shots.reset_index().to_json(orient='records')
        return jsonify({'data': result})
    except Exception as e:
        # 오류 처리
        return jsonify({'error': str(e)})

# 경기별 패스 기록_정확도 포함 조회


@app.route('/get_passes/<int:match_id>', methods=['GET'])
def get_passes(match_id):
    try:
        pd.set_option('display.max_columns', 40)
        match_events = pd.read_pickle(
            f'Analysis/data/refined_events/England/{match_id}.pkl')

        pass_records = match_events[
            (match_events['event_type'] == 'Pass') |
            (match_events['sub_event_type'].isin(
                ['Free kick', 'Free kick cross', 'corner']))
        ]
        # 전체 패스 횟수
        passes = pass_records.groupby(
            ['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
        passes.name = 'total_passes'

        # 정확한 패스 횟수
        acc_pass_records = pass_records[pass_records['tags'].apply(
            lambda x: 'Accurate' in x)]
        acc_passes = acc_pass_records.groupby(
            ['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
        acc_passes.name = 'acc_passes'

        # 패스 통계
        pass_stats = pd.concat([passes, acc_passes],
                               axis=1).fillna(0).astype(int)
        pass_stats['pass_accuracy'] = (
            pass_stats['acc_passes'] / pass_stats['total_passes']).round(2)

        # 결과를 JSON 형식으로 변환
        result = pass_stats.reset_index().to_json(orient='records')
        return jsonify({'data': result})
    except Exception as e:
        # 오류 처리
        return jsonify({'error': str(e)})


# 한 경기에 대한 전체 정보
@app.route('/match_player_stats/<int:match_id>', methods=['GET'])
def get_player_stats(match_id):
    try:
        pd.set_option('display.max_columns', 40)
        # match_id에 해당하는 모든 이벤트를 검색합니다.
        events = EnglandEvent.query.filter_by(match_id=match_id).all()

        # 이벤트 데이터를 DataFrame으로 변환합니다.
        events_data = [{
            'index': event.index,
            'match_id': event.match_id,
            'event_id': event.event_id,
            'period': event.period,
            'time': event.time,
            'team_id': event.team_id,
            'team_name': event.team_name,
            'player_id': event.player_id,
            'player_name': event.player_name,
            'event_type': event.event_type,
            'sub_event_type': event.sub_event_type,
            'tags': event.tags,
            'start_x': event.start_x,
            'start_y': event.start_y,
            'end_x': event.end_x,
            'end_y': event.end_y
        } for event in events]
        # match_events = pd.read_pickle(f'Analysis/data/refined_events/England/{match_id}.pkl')
        match_events = pd.DataFrame(events_data)

        # 슈팅 횟수
        shot_records = match_events[
            (match_events['event_type'] == 'Shot') |
            (match_events['sub_event_type'].isin(
                ['Free kick shot', 'Penalty']))
        ]
        shots = shot_records.groupby(
            ['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
        shots.name = 'total_shots'

        # 패스 횟수
        pass_records = match_events[
            (match_events['event_type'] == 'Pass') |
            (match_events['sub_event_type'].isin(
                ['Free kick', 'Free kick cross', 'corner']))
        ]
        passes = pass_records.groupby(
            ['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
        passes.name = 'total_passes'

        # 파울 횟수
        foul_records = match_events[match_events['event_type'] == 'Foul']
        fouls = foul_records.groupby(
            ['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
        fouls.name = 'fouls'

        # 오프사이드 횟수
        offside_records = match_events[match_events['event_type'] == 'Offside']
        offsides = offside_records.groupby(
            ['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
        offsides.name = 'offsides'

        # 유효 슈팅 횟수 + 신체 부위별 슈팅 횟수
        acc_shot_records = shot_records[shot_records['tags'].apply(
            lambda x: 'Accurate' in x)]
        acc_shots = acc_shot_records.groupby(
            ['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
        acc_shots.name = 'shots_on_target'

        rshot_records = shot_records[shot_records['tags'].apply(
            lambda x: 'Right foot' in x)]
        rshots = rshot_records.groupby(
            ['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
        rshots.name = 'rfoot_shots'

        lshot_records = shot_records[shot_records['tags'].apply(
            lambda x: 'Left foot' in x)]
        lshots = lshot_records.groupby(
            ['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
        lshots.name = 'lfoot_shots'

        hshot_records = shot_records[shot_records['tags'].apply(
            lambda x: 'Head/body' in x)]
        hshots = hshot_records.groupby(
            ['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
        hshots.name = 'header_shots'

        shot_stats_list = [shots, acc_shots, rshots, lshots, hshots]
        shot_stats = pd.concat(shot_stats_list, axis=1).fillna(0).astype(int)

        # 득점/도움/자책골 횟수
        goal_records = match_events[match_events['tags'].apply(
            lambda x: 'Goal' in x)]
        goals = goal_records.groupby(
            ['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
        goals.name = 'goals'  # 골

        assist_records = match_events[match_events['tags'].apply(
            lambda x: 'Assist' in x)]
        assists = assist_records.groupby(
            ['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
        assists.name = 'assists'  # 도움

        own_goal_records = match_events[match_events['tags'].apply(
            lambda x: 'Own goal' in x)]
        own_goals = own_goal_records.groupby(
            ['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
        own_goals.name = 'own_goals'  # 자책골

        goal_stats_list = [goals, assists, own_goals]
        goal_stats = pd.concat(goal_stats_list, axis=1).fillna(0).astype(int)

        # 패스 성공률
        acc_pass_records = pass_records[pass_records['tags'].apply(
            lambda x: 'Accurate' in x)]
        acc_passes = acc_pass_records.groupby(
            ['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
        acc_passes.name = 'acc_passes'

        pass_stats = pd.concat([passes, acc_passes],
                               axis=1).fillna(0).astype(int)
        pass_stats['pass_accuracy'] = (
            pass_stats['acc_passes'] / pass_stats['total_passes']).round(2)

        # 경고/퇴장 횟수
        yellow_records = foul_records[foul_records['tags'].apply(
            lambda x: 'Yellow card' in x)]
        yellows = yellow_records.groupby(
            ['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
        yellows.name = 'yellow_cards'

        red_records = foul_records[foul_records['tags'].apply(
            lambda x: 'Red card' in x)]
        reds = red_records.groupby(['team_id', 'team_name', 'player_id', 'player_name'])[
            'event_id'].count()
        reds.name = 'red_cards'

        foul_stats = pd.concat(
            [fouls, offsides, yellows, reds], axis=1).fillna(0).astype(int)

        # 경기 내 선수별 기록 정리표
        player_stats = pd.concat(
            [goal_stats, shot_stats, foul_stats, pass_stats], axis=1, sort=True)
        player_stats = player_stats.fillna(0).reset_index()
        for col in player_stats.columns[4:]:
            if col != 'pass_accuracy':
                player_stats[col] = player_stats[col].astype(int)

        # JSON으로 변환
        result = player_stats.to_json(orient='records')

        return jsonify({'data': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# 득점왕 조져보자
@app.route('/top_scorers', methods=['GET'])
def top_scorers():
    try:
        # Match 테이블의 모든 데이터를 조회합니다.
        matches = Match.query.all()

        # 데이터를 Pandas DataFrame으로 변환합니다.
        match_df = pd.DataFrame([
            {
                'match_id': match.match_id,
                'gameweek': match.gameweek,
                'datetime': match.datetime,
                'venue': match.venue,
                'team1_id': match.team1_id,
                'team1_name': match.team1_name,
                'team1_goals': match.team1_goals,
                'team2_id': match.team2_id,
                'team2_name': match.team2_name,
                'team2_goals': match.team2_goals,
                'duration': match.duration
            }
            for match in matches
        ])

        stats_list = []
        for match_id in match_df.index:
            match_player_stats = generate_player_stats(match_id)
            stats_list.append(match_player_stats)
        player_stats = pd.concat(stats_list, ignore_index=True)

        grouped = player_stats.groupby(
            ['team_id', 'team_name', 'player_id', 'player_name'])
        player_stats_accum = grouped[player_stats.columns[5:-1]].sum()
        player_stats_accum['pass_accuracy'] = (
            player_stats_accum['acc_passes'] / player_stats_accum['total_passes']).round(2)
        player_stats_accum['matches'] = grouped['match_id'].count()
        player_stats_accum = player_stats_accum[[
            'matches'] + player_stats.columns[5:-1].tolist()].reset_index()

        # JSON으로 변환합니다.
        result = player_stats_accum.to_json(orient='records')
        return jsonify({'data': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/england_events/match/<int:match_id>', methods=['GET'])
def get_events_by_match(match_id):
    # 페이지 번호와 페이지당 항목 수 매개변수를 받아옵니다.
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 100, type=int)

    # 특정 match_id에 해당하는 이벤트들을 페이지별로 필터링합니다.
    paginated_events = EnglandEvent.query.filter_by(
        match_id=match_id).paginate(page=page, per_page=per_page)

    # 각 이벤트의 데이터를 JSON 형식으로 변환합니다.
    events_data = [
        {
            'index': event.index,
            'match_id': event.match_id,
            'event_id': event.event_id,
            'period': event.period,
            'time': event.time,
            'team_id': event.team_id,
            'team_name': event.team_name,
            'player_id': event.player_id,
            'player_name': event.player_name,
            'event_type': event.event_type,
            'sub_event_type': event.sub_event_type,
            'tags': event.tags,
            'start_x': event.start_x,
            'start_y': event.start_y,
            'end_x': event.end_x,
            'end_y': event.end_y
        } for event in paginated_events.items
    ]

    # 다음 페이지의 URL 생성
    if paginated_events.has_next:
        next_url = url_for('get_events_by_match', match_id=match_id,
                           page=paginated_events.next_num, per_page=per_page, _external=True)
    else:
        next_url = None

    response = {
        'events': events_data,
        'next_url': next_url
    }

    return jsonify(response)


@app.route('/matchAnalysis/<int:match_id>/<team_name>', methods=['GET'])
def get_refined_events(match_id, team_name):
    # 서버에서 해당 match_id의 이벤트 데이터를 가져옵니다
    # response = requests.get(f'http://119.204.24.238:5002/england_events/match/{match_id}')
    # if response.status_code != 200:
    #    return jsonify({'error': 'Data not found'}), 404
    match_events = pd.read_pickle(
        f'Analysis/data/refined_events/England/{match_id}.pkl')
    # 시각화 결과를 저장할 Figure 객체 생성
    fig, ax = plt.subplots()

    # match_events = pd.DataFrame(response.json()['events'])
    # ... 이후 데이터 처리 및 시각화 로직 ...

    passes = match_events[match_events['event_type'] == 'Pass']
    pass_summary = passes.groupby(['team_name', 'player_name'])[
        ['start_x', 'start_y']].mean()
    pass_summary['total_count'] = passes.groupby(
        ['team_name', 'player_name'])['event_id'].count()

    nodes = pass_summary.loc[team_name].reset_index()

    team_events = match_events[match_events['team_name'] == team_name]
    player_change_records = team_events[
        (team_events['event_type'] == 'Substitution') |
        (team_events['tags'].apply(lambda x: 'Red card' in x))
    ]
    in_players = player_change_records[player_change_records['sub_event_type']
                                       == 'Player in']['player_id'].tolist()

    player_ids = [p for p in team_events['player_id'].unique()
                  if not p in in_players]

    period_durations = match_events.groupby('period')['time'].max()
    phase_record_list = []
    phase = 1

    for period in period_durations.index:
        change_times = player_change_records[player_change_records['period'] == period]['time'].unique(
        ).tolist()
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

#
    phase = 1

    period = phase_records.at[phase, 'period']
    start_time = phase_records.at[phase, 'start_time']
    end_time = phase_records.at[phase, 'end_time']

    team_phase_events = team_events[
        (team_events['period'] == period) &
        (team_events['time'] >= start_time) &
        (team_events['time'] <= end_time)
    ].reset_index(drop=True)

    passes = team_phase_events[team_phase_events['event_type'] == 'Pass']
    nodes = passes.groupby('player_name')[['start_x', 'start_y']].mean()
    nodes['total_count'] = passes.groupby('player_name')['event_id'].count()

#####
    pass_count_dict = defaultdict(int)

    for i in team_phase_events.index[:-2]:
        event = team_phase_events.loc[i]
        next_event = team_phase_events.loc[i+1]

        if event['event_type'] == 'Pass' and 'Accurate' in event['tags']:
            player1_name = event['player_name'] if isinstance(
                event['player_name'], str) else 'Unknown Player'
            player2_name = next_event['player_name'] if isinstance(
                next_event['player_name'], str) else 'Unknown Player'
            player_pair = [player1_name, player2_name]
            player1 = min(player_pair)
            player2 = max(player_pair)
            pass_count_dict[(player1, player2)] += 1

    pass_count_list = []

    for pair, count in pass_count_dict.items():
        pass_count_list.append([pair[0], pair[1], count])

    edges = pd.DataFrame(pass_count_list, columns=[
                         'player1', 'player2', 'count'])
    edges = pd.merge(edges, nodes[['start_x', 'start_y']],
                     left_on='player1', right_index=True)
    edges = edges.rename(
        columns={'start_x': 'player1_x', 'start_y': 'player1_y'})
    edges = pd.merge(edges, nodes[['start_x', 'start_y']],
                     left_on='player2', right_index=True)
    edges = edges.rename(
        columns={'start_x': 'player2_x', 'start_y': 'player2_y'}).reset_index(drop=True)

    draw_pitch('white', 'black', size_x=18, size_y=12)

    x = nodes['start_x']
    y = nodes['start_y']
    s = nodes['total_count'] * 100
    # plt.scatter(x, y, s=s, c='red', edgecolors='black', zorder=2)
    ax.scatter(x, y, s=s, c='red', edgecolors='black', zorder=2)

    for player_name, node in nodes.iterrows():
        # plt.annotate(player_name, xy=(node['start_x'], node['start_y']), c='k', fontsize=15, zorder=3)
        ax.annotate(player_name, xy=(
            node['start_x'], node['start_y']), c='k', fontsize=15, zorder=3)

    max_count = edges['count'].max()
    for i, edge in edges.iterrows():
        alpha = edge['count'] / max_count * 0.7 + 0.3
        ax.plot(
            edge[['player1_x', 'player2_x']], edge[['player1_y', 'player2_y']],
            lw=edge['count'] * 2, color='grey', alpha=alpha, zorder=1
        )
    # 메모리에 그림을 저장
    output = BytesIO()
    fig.canvas.print_png(output)
    plt.close(fig)  # 생성된 그래프를 닫습니다.

    # 메모리 스트림을 읽고 클라이언트에게 바이너리 데이터로 전송
    return send_file(BytesIO(output.getvalue()), mimetype='image/png')

    # # 이미지 파일 저장
    # image_filename = f'pass_network_{match_id}_{team_name}.png'
    # image_path = os.path.join('static', 'images', image_filename)
    # plt.savefig(image_path, bbox_inches='tight')
    # plt.close()

    # # 이미지 URL 반환
    # image_url = url_for('static', filename=f'images/{image_filename}')
    # return jsonify({'image_url': image_url})


@app.route('/get_image')
def get_image():
    image_path = 'images/my_image.png'  # static 폴더 내의 경로
    full_image_url = url_for('static', filename=image_path)
    return {'image_url': full_image_url}


# def create_directory():
#     # 'static/images' 경로 설정
#     directory = os.path.join('static', 'images')

#     # 해당 경로가 존재하지 않으면 생성
#     if not os.path.exists(directory):
#         os.makedirs(directory)
#         print(f"Directory {directory} created")
#     else:
#         print(f"Directory {directory} already exists")

# # 서버 시작 시 디렉토리 생성 함수 호출
# create_directory()


@app.route('/')
def index():
    # image_url = url_for(
    #     'static', filename='images/pass_network_2499719_Arsenal.png')
    # return {'image_url': image_url}
    return render_template('index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=portNum, debug=True)
