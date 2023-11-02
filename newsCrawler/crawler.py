from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup

URL = "https://sports.news.naver.com/wfootball/news/index?page=1&isphoto=N"


def get_news():
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # 브라우저 창이 뜨지 않도록 headless 모드 사용

    # ChromeDriver의 경로를 지정해줍니다. 이 경로는 사용자의 환경에 따라 수정될 수 있습니다.
    driver_path = "/Users/hyun2y00/Documents/chromedriver"
    # executable_path=driver_path,
    browser = webdriver.Chrome(options=chrome_options)

    browser.get(URL)

    # 페이지 로딩을 기다립니다. (필요시 시간 조정)
    browser.implicitly_wait(3)

    html = browser.page_source
    soup = BeautifulSoup(html, 'html.parser')

    news_list = []
    news_items = soup.select("#_newsList ul li")
    for item in news_items:
        title = item.select_one("div.text > a.title span").text
        desc = item.select_one("div.text > p.desc").text
        news_url = "https://sports.news.naver.com" + \
            item.select_one("div.text > a.title").get("href")
        time_published = item.select_one("div.source span.time").text

        image_url = item.select_one("a.thmb img")["src"] if item.select_one(
            "a.thmb img") else "No Image"

        # 뉴스 URL로 접속하여 첫 번째 이미지를 가져온다.
        # browser.get(news_url)
        # browser.implicitly_wait(3)
        # news_html = browser.page_source
        # news_soup = BeautifulSoup(news_html, 'html.parser')

        # first_image = news_soup.select_one("span.end_photo_org img")
        # if first_image:
        #     image_url = first_image["src"]
        # else:
        #     image_url = "No Image"

        news_list.append({
            "title": title,
            "desc": desc,
            "image_url": image_url,
            "news_url": news_url,
            "time_published": time_published,
        })

    browser.quit()
    return news_list


# 위 함수를 테스트하기 위해 아래 코드를 추가합니다.
if __name__ == "__main__":
    news_data = get_news()
    for news in news_data:
        print(news["title"], news["desc"], news["image_url"])
