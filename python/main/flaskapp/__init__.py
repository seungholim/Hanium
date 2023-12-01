from flask import Flask, request, jsonify
from flaskapp.libs.stringGetter import getPageString
from flaskapp.libs.ssg.productsParser import getProducts

app = Flask(__name__)
app.debug = True

@app.route('/api/crawling/getSSG', methods=['GET'])
def getProductsInfo():
    keyword = request.args.get('keyword')
    url = "http://www.ssg.com/search.ssg?target=all&query=" + keyword
    pageString = getPageString(url)
    print(getProducts(pageString))
    return jsonify(getProducts(pageString))
