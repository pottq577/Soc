from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor
import concurrent.futures
import requests
from datetime import datetime
from functools import lru_cache

URL = "https://sports.news.naver.com/wfootball/news/index?page=1&isphoto=N"


@lru_cache(maxsize=300)
def get_news_detail(news_url):
    # 각 뉴스 페이지에서 첫 번째 이미지를 가져오는 코드
    response = requests.get(news_url)
    news_html = response.text
    news_soup = BeautifulSoup(news_html, 'html.parser')

    first_image = news_soup.select_one("span.end_photo_org img")
    image_url = first_image["src"] if first_image else "No Image"
    return image_url


def get_news():
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # GUI 없이 백그라운드에서 브라우저 실행
    chrome_options.add_argument("--disable-gpu")  # GPU 하드웨어 가속을비활성화
    # 보안이 중요하지 않은 환경이기에 샌드박스 모드 비활성화
    chrome_options.add_argument("--no-sandbox")
    # 메모리 이슈 방지를 위해 /dev/shm 파티션을 사용하지 않도록 설정
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument(
        "--disable-software-rasterizer")  # 소프트웨어 래스터라이저 비활성화
    # 페이지 로딩 속도 개선을 위해 이미지 로딩 비활성화
    chrome_options.add_argument("--disable-images")
    # 불필요한 리소스 사용을 줄이기 위해 플러그인 비활성화
    chrome_options.add_argument("--disable-plugins")

    driver_path = "/Users/hyun2y00/Documents/chromedriver"
    browser = webdriver.Chrome(options=chrome_options)

    browser.get(URL)
    browser.implicitly_wait(3)

    html = browser.page_source
    soup = BeautifulSoup(html, 'html.parser')

    news_list = []
    news_items = soup.select("#_newsList ul li")

    # 멀티스레딩을 위해 ThreadPoolExecutor를 사용합니다.
    with ThreadPoolExecutor(max_workers=10) as executor:
        future_to_url = {executor.submit(get_news_detail, "https://sports.news.naver.com" + item.select_one(
            "div.text > a.title").get("href")): item for item in news_items}

        for future in concurrent.futures.as_completed(future_to_url):
            item = future_to_url[future]
            try:
                image_url = future.result()
            except Exception as exc:
                print('%r generated an exception: %s' % (item, exc))
                image_url = "No Image"

            title = item.select_one("div.text > a.title span").text
            desc = item.select_one("div.text > p.desc").text
            news_url = "https://sports.news.naver.com" + \
                item.select_one("div.text > a.title").get("href")
            time_published = item.select_one("div.source span.time").text

            news_list.append({
                "title": title,
                "desc": desc,
                "image_url": image_url,
                "news_url": news_url,
                "time_published": time_published,
            })

    # news_list를 time_published에 따라 정렬
    news_list.sort(key=lambda x: datetime.strptime(
        x['time_published'], '%Y.%m.%d %H:%M'), reverse=True)

    browser.quit()
    return news_list


if __name__ == "__main__":
    news_data = get_news()
    for news in news_data:
        print(news["title"], news["desc"], news["image_url"])
