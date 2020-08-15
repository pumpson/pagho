# -*- coding: utf-8 -*-
"""
Created on Wed Aug  5 11:21:10 2020

@author: piko
"""

import requests   # urlを読み込むためrequestsをインポート
import time
from bs4 import BeautifulSoup   # htmlを読み込むためBeautifulSoupをインポート

import os

FOLDERNAME = "echichiimg"

URL = "URLHAKOKOHE"
domainName = URL.split('/')[2]
siteFolderName = URL.split('/')[-2] # フォルダ内区別用
#siteFolderName = time.time() # unixtime
savingPath = FOLDERNAME + '/' + siteFolderName

try:
    #os.mkdir(FOLDERNAME)   # プログラムファイルのある場所にフォルダ「img」を作成
    os.makedirs(savingPath)
except:
    pass   # すでに「img」フォルダがある場合、作成をスキップ passは何もしない


images = []   # 画像リストの配列

#response = requests.get(URL)
ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
headers = {'User-Agent': ua}
response = requests.get(URL, headers=headers).content
#response = requests.get(URL, headers=headers).text
soup = BeautifulSoup(response,'lxml')   # bsでURL内を解析

def getYouso(yousoName):
    srcString = link.get(yousoName)
    if srcString is None: #'NoneType' object has no attribute対策
        return
    print(srcString)
    if (srcString.endswith(".jpg") 
        or srcString.endswith(".png")
        or srcString.endswith(".gif")):   # imgタグ内の.jpgであるsrcタグを取得
        if ((not "http" in srcString) or # 画像のURLが相対パス
            ("http" in srcString and domainName in srcString)): #もしくは同サイトである
            images.append(srcString)
    return

allImg = soup.find_all("img")
# lambdaは無名関数　lambda　引数:返り値
#allImg = soup.find_all(lambda tag: tag.has_attr('img') and str(tag.string).has_attr('width'))
for link in allImg:   # imgタグを取得しlinkに格納
    #if not link.has_attr('width') :
    #if link is None:
    #    continue
    
    getYouso("src")
    getYouso("data-src")
    """
    srcString = link.get("src")
    if srcString is None: #'NoneType' object has no attribute対策
        continue
    print(srcString)
    if (srcString.endswith(".jpg") 
        or srcString.endswith(".png")
        or srcString.endswith(".gif")):   # imgタグ内の.jpgであるsrcタグを取得
        if ((not "http" in srcString) or 
            ("http" in srcString and domainName in srcString)):
            images.append(srcString)   # imagesリストに格納
    """


print("取得数", len(allImg), "抽出数", len(images))
for target in images:   # imagesからtargetに入れる
    re = ''
    # 画像のパスが相対パスでhttp:がついていないなら付ける
    if target.startswith('http'):
        print(target)
        re = requests.get(target)
    else:
        re = requests.get('http://' + domainName + '/' + target)
        
    fileName = target.split('/')[-1] # 後ろから１番目を指定
    with open(savingPath + '/' + fileName, 'wb') as f:   # imgフォルダに格納
        f.write(re.content)   # .contentにて、画像データとして書き込む

print("ok")   # 確認