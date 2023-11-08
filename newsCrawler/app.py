from flask import Flask, jsonify, request, redirect, url_for, render_template
from crawler import get_news
import logging
from logging.handlers import RotatingFileHandler
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
portNum = 5001

# 로깅 설정
# logging.basicConfig(level=logging.DEBUG)
# logHandler = RotatingFileHandler('flask.log', maxBytes=10000, backupCount=1)
# logHandler.setLevel(logging.INFO)
# formatter = logging.Formatter(
#     "[%(asctime)s] {%(pathname)s:%(lineno)d} %(levelname)s - %(message)s")
# logHandler.setFormatter(formatter)
# app.logger.addHandler(logHandler)


@app.before_request
def log_request_info():
    app.logger.info('Headers: %s', request.headers)
    app.logger.info('Body: %s', request.get_data())


@app.route('/')
def home():
    # '/home' 경로에서 '/database'와 '/get-news'로 갈 수 있는 링크를 제공합니다.
    # 예시로 render_template을 사용했지만, 실제 HTML 파일이 필요합니다.
    return render_template('home.html')


@app.route('/database')
def database():
    # '/database' 경로의 처리 로직을 구현합니다.
    # 이 예제에서는 단순히 텍스트를 반환합니다.
    return "Database route"


@app.route('/get-news', methods=['GET'])
def fetch_news():
    try:
        news = get_news()
        return jsonify(news)
    except Exception as e:
        app.logger.error(f"Error occurred: {str(e)}")
        return jsonify({"error": "An error occurred while fetching news."}), 500

# 이 부분은 모든 정의되지 않은 경로에 대한 리다이렉션을 처리합니다.


@app.errorhandler(404)
def page_not_found(e):
    # 사용자가 존재하지 않는 페이지에 접근하면 '/home'으로 리다이렉션합니다.
    return redirect(url_for('home'))


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=portNum)
