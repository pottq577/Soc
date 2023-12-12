# models.py
from database import db

# 선수 모델


class Player(db.Model):
    __tablename__ = 'players'

    passportarea_name = db.Column(db.String(255))
    passportarea_id = db.Column(db.Integer)
    passportarea_alpha3code = db.Column(db.String(3))
    passportarea_alpha2code = db.Column(db.String(2))
    weight = db.Column(db.Integer)
    firstname = db.Column(db.String(255))
    lastname = db.Column(db.String(255))
    currentteamid = db.Column(db.Integer)
    height = db.Column(db.Integer)
    role_code2 = db.Column(db.String(2))
    role_code3 = db.Column(db.String(3))
    role_name = db.Column(db.String(255))
    birtharea_name = db.Column(db.String(255))
    birtharea_id = db.Column(db.Integer)
    birtharea_alpha3code = db.Column(db.String(3))
    birtharea_alpha2code = db.Column(db.String(2))
    wyid = db.Column(db.Integer, nullable=False, primary_key=True)
    foot = db.Column(db.String(255))
    shortname = db.Column(db.String(255))
    currentnationalteamid = db.Column(db.Integer)

    def __repr__(self):
        return f'<Player {self.firstname} {self.lastname}>'

# 축구 클럽 모델


class Team(db.Model):
    __tablename__ = 'teams'  # 테이블 이름을 PostgreSQL 정의와 일치시킵니다.

    city = db.Column(db.String(255))
    name = db.Column(db.String(255))
    wyid = db.Column(db.Integer, primary_key=True)
    officialname = db.Column(db.String(255))
    area_name = db.Column(db.String(255))
    area_id = db.Column(db.Integer)
    area_alpha3code = db.Column(db.String(3))
    area_alpha2code = db.Column(db.String(2))
    type = db.Column(db.String(50))

    def __repr__(self):
        return f'<Team {self.name} ({self.city})>'

# 경쟁 리그 모델(England만 사용가능 나머지는 더미데이터)


class Competition(db.Model):
    __tablename__ = 'competitions'
    __table_args__ = {'schema': 'public'}

    wyid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    format = db.Column(db.String(100))
    area_name = db.Column(db.String(255))
    area_id = db.Column(db.Integer)
    area_alpha3code = db.Column(db.String(3))
    area_alpha2code = db.Column(db.String(2))
    type = db.Column(db.String(50))

    def __repr__(self):
        return f'<Competition {self.name}>'

# Tags(이벤트 태그명)


class Tag2Name(db.Model):
    __tablename__ = 'tags2name'
    __table_args__ = {'schema': 'public'}

    tag = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(255))
    description = db.Column(db.Text)

    def __repr__(self):
        return f'<Tag2Name {self.tag}: {self.label}>'

# 경기 데이터 모델


class MatchEngland(db.Model):
    __tablename__ = 'matches_england'
    __table_args__ = {'schema': 'public'}

    wyid = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(255))
    roundid = db.Column(db.Integer)
    gameweek = db.Column(db.Integer)
    teamsdata = db.Column(db.Text)
    seasonid = db.Column(db.Integer)
    dateutc = db.Column(db.DateTime)
    winner = db.Column(db.Integer)
    venue = db.Column(db.String(255))
    label = db.Column(db.Text)
    date = db.Column(db.Text)
    referees = db.Column(db.Text)
    duration = db.Column(db.String(50))
    competitionid = db.Column(db.Integer)

    def __repr__(self):
        return f'<MatchEngland {self.wyid}>'

# 이벤트 모델(England)


class EnglandEvent(db.Model):
    __tablename__ = 'england_events'
    __table_args__ = {'schema': 'public'}

    index = db.Column(db.Integer, primary_key=True)
    match_id = db.Column(db.Integer)
    event_id = db.Column(db.Integer)
    period = db.Column(db.String(10))
    time = db.Column(db.Float)
    team_id = db.Column(db.Integer)
    team_name = db.Column(db.String(255))
    player_id = db.Column(db.Integer)
    player_name = db.Column(db.String(255))
    event_type = db.Column(db.String(50))
    sub_event_type = db.Column(db.String(50))
    tags = db.Column(db.Text)
    start_x = db.Column(db.Float)
    start_y = db.Column(db.Float)
    end_x = db.Column(db.Float)
    end_y = db.Column(db.Float)

    def __repr__(self):
        return f'<EnglandEvent {self.index}>'


class Match(db.Model):
    __tablename__ = 'matches'
    __table_args__ = {'schema': 'public'}

    match_id = db.Column(db.Integer, primary_key=True)
    gameweek = db.Column(db.Integer)
    datetime = db.Column(db.DateTime)
    venue = db.Column(db.String(255))
    team1_id = db.Column(db.Integer)
    team1_name = db.Column(db.String(255))
    team1_goals = db.Column(db.Integer)
    team2_id = db.Column(db.Integer)
    team2_name = db.Column(db.String(255))
    team2_goals = db.Column(db.Integer)
    duration = db.Column(db.String(50))

    def __repr__(self):
        return f'<Match {self.match_id}>'


class TeamRank(db.Model):
    __tablename__ = 'team_rank'

    rank = db.Column(db.Integer, primary_key=True)
    team = db.Column(db.String(50), nullable=False)
    matches = db.Column(db.Integer, nullable=False)
    wins = db.Column(db.Integer, nullable=False)
    draws = db.Column(db.Integer, nullable=False)
    losses = db.Column(db.Integer, nullable=False)
    goals_for = db.Column(db.Integer, nullable=False)
    goals_against = db.Column(db.Integer, nullable=False)
    goal_difference = db.Column(db.String(5), nullable=False)
    points = db.Column(db.Integer, nullable=False)
    wyid = db.Column(db.Integer, nullable=False, unique=True)

    def __repr__(self):
        return f'<Team {self.team}, Rank {self.rank}>'


class PlayerStats(db.Model):
    __tablename__ = 'player_stats'

    match_id = db.Column(db.Integer, primary_key=True)
    team_id = db.Column(db.Integer)
    team_name = db.Column(db.String(255))
    player_id = db.Column(db.Integer, primary_key=True)
    player_name = db.Column(db.String(255))
    playing_time = db.Column(db.Float)
    goals = db.Column(db.Integer)
    assists = db.Column(db.Integer)
    own_goals = db.Column(db.Integer)
    total_shots = db.Column(db.Integer)
    shots_on_target = db.Column(db.Integer)
    rfoot_shots = db.Column(db.Integer)
    lfoot_shots = db.Column(db.Integer)
    header_shots = db.Column(db.Integer)
    fouls = db.Column(db.Integer)
    offsides = db.Column(db.Integer)
    yellow_cards = db.Column(db.Integer)
    red_cards = db.Column(db.Integer)
    total_passes = db.Column(db.Integer)
    acc_passes = db.Column(db.Integer)
    pass_accuracy = db.Column(db.Float)

    def __repr__(self):
        return f'<PlayerStats MatchID={self.match_id}, PlayerID={self.player_id}>'
