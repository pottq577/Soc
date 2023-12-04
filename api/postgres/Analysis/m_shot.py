import numpy as np
import pandas as pd
from tqdm import tqdm
#선택 경기에 대한 슈팅에 대한 모든 정보
pd.set_option('display.max_columns', 40)

match_id = 2499719
match_events = pd.read_pickle(f'data/refined_events/England/{match_id}.pkl')
shot_records = match_events[
    (match_events['event_type'] == 'Shot') |
    (match_events['sub_event_type'].isin(['Free kick shot', 'Penalty']))
]
shots = shot_records.groupby(['team_id', 'team_name', 'player_id', 'player_name'])['event_id'].count()
shots.name = 'total_shots'
shots