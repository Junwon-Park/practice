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

cnt = int(input('1. 크롤링 할 건수는 몇건입니까?: '))
page_cnt = math.ceil(cnt / 10) # 한 페이지에 10개의 게시물이 있기 때문에 크롤링할 건수를 10으로 나누면 cnt 만큼 크롤링하기 위한 페이지 수가 나온다.
# 한 페이지에 20 개의 게시물이 있다면 cnt / 20을 한다.

f_dir = input('크롤링 결과를 저장할 폴더의 이름만 쓰세요: ')

opts = webdriver.ChromeOptions() # 크롬 드라이버의 옵션을 지정하는 메서드
opts.add_argument('--start-maximized') # 크롬 드라이버의 실행 옵션 중 시작 시 Full Screen 사이즈로 실행되도록 하는 "--start-maximized" 추가
driver = webdriver.Chrome(options=opts, service=Service(ChromeDriverManager().install())) 
# ChromeDriverManager의 install() 메서드가 자동으로 크롬 드라이버를 찾아서 실행한다.
# 첫 번째 인자로 options 위에서 정의한 옵션을 지정
# ? 왜인지는 모르겠지만 Full 사이즈로 실행하지 않으면 브라우저가 아래 while문이 있는데도 종료된다.
# ? 그래서 옵션에 --start-maximized 추가

# 크롬 드라이버로 위 URL로 접속
driver.get('https://eungdapso.seoul.go.kr/')

want = driver.find_element(By.CLASS_NAME, 'izc-btn').click()
# 여기에서는 부모 태그를 찾아서 해당 요소를 찾을 필요 없이 바로 해당 태그의 Class 또는 ID 값을 넣으면 된다.

while(True): pass # 크롬 브라우저 실행 유지
# selenium에서 driver.get() 함수의 실행이 종료되면 브라우저도 종료된다.
# 터미널에서 실행이 종료되면 브라우저도 종료된다.
