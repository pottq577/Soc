import nest_asyncio
import aiohttp
import asyncio
from collections import defaultdict

nest_asyncio.apply()

# 비동기적으로 페이지 데이터를 가져오는 함수
async def fetch_page_data(session, base_url, page, per_page=500):
    async with session.get(f'{base_url}/england_events', params={'page': page, 'per_page': per_page}) as response:
        return await response.json()

# 비동기적으로 배치 데이터를 로드하는 함수
async def load_batch_data(session, base_url, start_page, end_page):
    tasks = [fetch_page_data(session, base_url, page) for page in range(start_page, end_page + 1)]
    responses = await asyncio.gather(*tasks)

    events = []
    for response in responses:
        events.extend(response['events'])
    return events

# 비동기적으로 와이스카우트 데이터셋을 로드하는 함수
async def load_wyscout_dataset(base_url='http://127.0.0.1:5000', total_pages=1295, batch_size=500):
    match_event_dict = defaultdict(list)

    async with aiohttp.ClientSession() as session:
        for start_page in range(1, total_pages + 1, batch_size):
            end_page = min(start_page + batch_size - 1, total_pages)
            events = await load_batch_data(session, base_url, start_page, end_page)
            
            for event in events:
                match_id = event['match_id']
                match_event_dict[match_id].append(event)

    return match_event_dict

# 메인 비동기 실행 함수
async def main():
    base_url = 'http://127.0.0.1:5000'
    match_event_dict = await load_wyscout_dataset(base_url)

    event_count = sum(len(events) for events in match_event_dict.values())
    print(f"Total number of events: {event_count}")

# 비동기 함수 실행
asyncio.run(main())
