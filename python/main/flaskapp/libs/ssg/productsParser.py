from bs4 import BeautifulSoup

def getProduct(li):
    img = li.find("a", {"class":"clickable"}).find("img")
    info = li.find("div", {"class":"cunit_info"}).find("a")
    image = "http:" + img['src']
    link = "http://www.ssg.com/" + info['href']
    price = li.find("em", {"class":"ssg_price"})
    return {"image":image, "name":img['alt'], "link":link, "price":price.text}

def getProducts(string):
    bsObj = BeautifulSoup(string, "html.parser")
    ul = bsObj.find("ul", {"id":"idProductImg"})
    lis = ul.findAll("li")
    infos = []
    for i in range(min(len(lis), 10)):
        infos.append(getProduct(lis[i]))
    return infos
