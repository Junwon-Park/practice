from unittest import result
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By # HTML 요소를 찾을 때, 속성을 지정하는 객체
from selenium.webdriver.chrome.service import Service # 크롬 드라이버를 자동으로 찾기 위해 ChromeDriverManager를 등록하는 객체
from webdriver_manager.chrome import ChromeDriverManager # 크롬 드라이버를 자동으로 찾거나 관리하는 객체
import time
import sys
import re
import math
import numpy
import random
import os # 폴더 생성을 위해 필요.
import pandas as pd

query_txt = '서울시응답소'

cnt = int(input('1. 크롤링 할 건수는 몇건입니까?: '))
page_cnt = math.ceil(cnt / 10) # 한 페이지에 10개의 게시물이 있기 때문에 크롤링할 건수를 10으로 나누면 cnt 만큼 크롤링하기 위한 페이지 수가 나온다.
# 15건을 입력하면 math.ceil()로 반올림 해서 2페이지가 된다.
# 한 페이지에 20 개의 게시물이 있다면 cnt / 20을 한다.

f_dir = input('크롤링 결과를 저장할 폴더의 이름만 쓰세요: ')
# ./data -> 현재 디렉토리에 data 디렉토리

# 파일이 저장될 위치와 파일의 이름 지정
now = time.localtime() # 현재의 시간
s = '%04d-%02d-%02d-%02d-%02d-%02d' %(now.tm_year, now.tm_mon, now.tm_mday, now.tm_hour, now.tm_min, now.tm_sec)

os.makedirs(f_dir + s + '-' + query_txt) # 디렉토리 생성
os.chdir(f_dir + s + '-' + query_txt) # 위 디렉토리 내에 자식 디렉토리 생성

# '\\' 이전이 디렉토리 이름 '\\'은 '\'의 이스케이프(두 번 입력, 디렉토리 내부에 저장하기 위해 \ 입력) 다음 해당 디렉토리에 저장할 파일
ff_name = f_dir + s + '-' + query_txt + '\\' + s + '-' + query_txt + '.txt'
fc_name = f_dir + s + '-' + query_txt + '\\' + s + '-' + query_txt + '.csv'
fx_name = f_dir + s + '-' + query_txt + '\\' + s + '-' + query_txt + '.xlsx'

opts = webdriver.ChromeOptions() # 크롬 드라이버의 옵션을 지정하는 메서드
opts.add_argument('--start-maximized') # 크롬 드라이버의 실행 옵션 중 시작 시 Full Screen 사이즈로 실행되도록 하는 "--start-maximized" 추가
driver = webdriver.Chrome(options=opts, service=Service(ChromeDriverManager().install())) 
# ChromeDriverManager의 install() 메서드가 자동으로 크롬 드라이버를 찾아서 실행한다.
# 첫 번째 인자로 options 위에서 정의한 옵션을 지정
# ? 왜인지는 모르겠지만 Full 사이즈로 실행하지 않으면 브라우저가 아래 while문이 있는데도 종료된다.
# ? 그래서 옵션에 --start-maximized 추가

# 크롬 드라이버로 위 URL로 접속
driver.get('https://eungdapso.seoul.go.kr/')

time.sleep(3) # 딜레이가 필요한 곳에 넣어준다.
# 안그러면 딜레이가 필요한 작업이 끝나기 전에 다음 코드가 실행되어 에러가 발생하고 프로그램이 종료된다.

# "시장에게 바란다" 바로가기 버튼(링크) 클릭
# driver.find_element(By.CLASS_NAME, 'izc-btn').click()
# # 여기에서는 부모 태그를 찾아서 해당 요소를 찾을 필요 없이 바로 해당 태그의 Class 또는 ID 값을 넣으면 된다.
driver.find_element(By.XPATH, '//*[@id="gnb"]/div[4]/div[2]/div/a').click()
# XPath는 찾으려는 태그의 id 또는 class가 없을 때 사용한다.
# 찾으려는 태그를 우클릭 -> Copy -> Copy XPath를 누르면 XPath가 복사된다.
# 해당 태그는 Class가 있지만 XPath로 테스트 해보려고 XPath로 했다.

html = driver.page_source # 크롬 드라이버로 현재 페이지의 HTML 소스 파일을 가져온다.
soup = BeautifulSoup(html, 'html.parser') # 위에서 가져온 HTML 소스 파일을 BeautifulSoup에 넣고 html-parser로 분석한다.

# 게시판의 번호, 제목, 날짜 등의 텍스트 수집
result_list = soup.find('div', 'pclist_table mt20').get_text()

no2 = [] # 게시글 번호 컬럼
contents = [] # 게시글 내용 컬럼

no = 1

click_cnt = 1 # 현재 페이지 번호

#  이중 for문
for x in range(1, page_cnt + 1): # 페이지를 순회하기 위한 반복문(마지막 숫자는 포함 안되기 때문에 +1을 해준 것이다.)
    print('%s 페이지 내용 수집 시작 =====================' %x)
    for i in range(2, 12): # 각 페이지의 게시물을 순회하기 위한 반복문(게시물 제목의 XPath의 tr의 인덱스 2가 첫 게시물이라 2부터 시작)
        driver.find_element(By.XPATH, '//*[@id="content_cont"]/div[2]/div/form/div[4]/table/tbody/tr[%s]/td[2]/a' %i).click()

        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')

        content = soup.find('div', 'table_inner_desc').get_text() # 게시글 본문 텍스트 수집
        print(content)

        no2.append(no) # 게시글 번호 리스트 추가
        contents.append(content.replace('\n', "") + '\n') # 내용 리스트 추가 - 게시글 본문 텍스트 컨텐츠 리스트에 저장

        no += 1 # 게시물 추가될 때마다 +1 증가

        time.sleep(1)

        driver.back() # 뒤로가기(Selenium 웹 페이지 뒤로 이동)

        time.sleep(2)

    if click_cnt > page_cnt + 1:
        break

    click_cnt += 1 # 게시판 페이징의 숫자를 누를지 > 버튼을 누를지 결정하기 위한 카운트 변수

    if(click_cnt % 5 == 0): # 현재 페이지가 5 페이지라면(이 사이트의 게시판은 다섯 페이지 까지 숫자 페이지 버튼을 누르고 그 이상은 > 버튼을 눌러야 한다.)
        # By.LINK_TEXT는 해당 링크 태그(a 태그)의 컨텐츠 값을 넣으면 된다.
        driver.find_element(By.LINK_TEXT, '''>''').click()
    else:
        driver.find_element(By.LINK_TEXT, """%s""" %click_cnt).click() # 게시판 다음 페이지 번호 클릭

seoul = pd.DataFrame()
seoul['번호'] = no2
seoul['내용'] = contents

# txt
f = open(ff_name, 'a', encoding="UTF-8") # a 모드로 해야 컨텐츠를 덮어쓰지 않고 추가한다.
f.write(str(contents) + '\n') # 실제 컨텐츠를 쓰는 작업
f.close() # 파일 쓰기 닫기

# CSV
seoul.to_csv(fc_name, encoding="utf-8-sig")

# XLSX
seoul.to_excel(fx_name)

print('파일 저장 완료: txt 파일명: %s ' %ff_name)
print('파일 저장 완료: csv 파일명: %s ' %fc_name)
print('파일 저장 완료: xlsx 파일명: %s ' %fx_name)

driver.close() # 브라우저 닫기
