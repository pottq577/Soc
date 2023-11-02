from flask import Flask, jsonify, request
from crawler import get_news
import logging
from logging.handlers import RotatingFileHandler
from flask_cors import CORS

app = Flask(__name__)
portNum = '5001'

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


@app.route('/get-news', methods=['GET'])
def fetch_news():
    try:
        news = get_news()
        return jsonify(news)
    except Exception as e:
        app.logger.error(f"Error occurred: {str(e)}")
        return jsonify({"error": "An error occurred while fetching news."}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=portNum)

CORS(app)
