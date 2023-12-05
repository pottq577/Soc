import requests
from bs4 import BeautifulSoup

# 웹페이지 URL
url = "https://sports.news.naver.com/wfootball/record/index?category=epl&year=2019&tab=team"

# 해당 URL로부터 HTML 페이지를 가져옵니다.
response = requests.get(url)

# 요청이 성공적으로 이루어졌는지 확인합니다.
if response.status_code == 200:
    # HTML 내용을 파싱합니다.
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # 이 부분에서 필요한 데이터를 찾아내고 추출하는 코드를 작성합니다.
    # 예: soup.find_all('태그명', class_='클래스명')
    
    # 추출한 데이터를 출력하거나 저장합니다.
else:
    print("웹 페이지를 가져오는 데 실패했습니다. 상태 코드:", response.status_code)
