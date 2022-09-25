from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By # HTML 요소를 찾을 때, 속성을 지정하는 객체
from selenium.webdriver.chrome.service import Service # 크롬 드라이버를 자동으로 찾기 위해 ChromeDriverManager를 등록하는 객체
from webdriver_manager.chrome import ChromeDriverManager # 크롬 드라이버를 자동으로 찾거나 관리하는 객체
import time
import sys

query_txt = input('크롤링할 키워드는 무엇입니까?: ')
f_name = input('검색 결과를 저장할 파일 경로와 이름을 지정하세요(txt): ')
fc_name = input('검색 결과를 저장할 파일 경로와 이름을 지정하세요(csv): ')
fx_name = input('검색 결과를 저장할 파일 경로와 이름을 지정하세요(xlsx): ')
# ./file.txt

opts = webdriver.ChromeOptions() # 크롬 드라이버의 옵션을 지정하는 메서드
opts.add_argument('--start-maximized') # 크롬 드라이버의 실행 옵션 중 시작 시 Full Screen 사이즈로 실행되도록 하는 "--start-maximized" 추가
driver = webdriver.Chrome(options=opts, service=Service(ChromeDriverManager().install())) 
# ChromeDriverManager의 install() 메서드가 자동으로 크롬 드라이버를 찾아서 실행한다.
# 첫 번째 인자로 options 위에서 정의한 옵션을 지정
# ? 왜인지는 모르겠지만 Full 사이즈로 실행하지 않으면 브라우저가 아래 while문이 있는데도 종료된다.
# ? 그래서 옵션에 --start-maximized 추가

# 크롬 드라이버로 위 URL로 접속
driver.get('https://korean.visitkorea.or.kr/main/main.html')

# 검색 input창 id -> inp_search
# 검색 버튼 class -> btn_search

# 동작 명령 -> 논리적 동작 순서대로 작성해야 한다.
input_element = driver.find_element(By.ID, "inp_search") # 속성의 id가 inp_search인 것을 찾아라
input_element.send_keys(query_txt) # 위에서 찾은 속성에 send_keys()의 인자로 넣은 query_txt(위에서 input() 함수로 전달 받은 문자열)를 전달해라
driver.find_element(By.CLASS_NAME, 'btn_search').click() # 속성의 class가 btn_search인 것을 찾아서 클릭해라

time.sleep(1) # 위 작업이 끝날 때 까지 기다려야하기 때문에 1초 동안 기다려준 것이다.
# 위 작업이 진행되지 않고 아래 작업으로 넘어가 정상적으로 작업이 수행되지 않는 경우 time.sleep()으로 잠시 기다려준다.

# orig_stdout = sys.stdout # 컴퓨터에서 기본 출력 뱡향은 모니터이다. 
# # 위 코드는 출력 방향을 기본인 모니터가 아닌 다른 변수에 할당함으로써 다른 채널로 변경한다는 의미이다.(다시 원래대로(sys.stdout = orig_stdout) 돌려놓을 때까지 화면에 데이터가 출력되지 않는다.)
# f = open(f_name, 'a', encoding='UTF-8') # 크롤링에는 반드시 계속 추가하는 'a'모드를 사용한다.
# # open()의 첫 번째 인자인 파일의 경로는 상대경로를 대입한다.
# sys.stdout = f # 기본 출력 방향을 화면이 아닌 f(위에서 open으로 지정한 파일)로 바꾸었기 때문에 print() 메서드로 출력하면 화면에 출력되는 것이 아닌 해당 파일에 작성된다.

html = driver.page_source # 크롬 드라이버로 현재 페이지의 HTML 소스 파일을 가져온다.
soup = BeautifulSoup(html, 'html.parser') # 위에서 가져온 HTML 소스 파일을 BeautifulSoup에 넣고 html-parser로 분석한다.
blog_list = soup.find('ul','list_thumType type1') # BeautifulSoup으로 분석한 HTML 소스 파일의 ul 태그를 찾아서 ul 태그와 그 자식 요소들을 불러온다.
# find는 조건으로 넣은 태그를 포함해서 자식 요소들도 모두 가져오지만 조건을 만족하는 형제 태그는 모두 반환하지 않고 가장 먼저 찾은 태그만 반환한다.
# 특정 조건의 태그를 모두 가져오려면 find_all() 메서드를 사용해야 한다.

time.sleep(1)

no = 1
no_array = []
titles = []
tags = []

for i in blog_list: # 위에서 Selenium으로 가져온 ul 태그와 그 자식 요소들을 각각 순횐한다.

    if i.find('div', 'pc'): # 요소 중 배너가 있어서 예외처리
        continue
    
    # 각 데이터 번호
    no_array.append(no)
    print('번호', no)

    # BeautifulSoup의 find로 div 태그 중 tit라는 클래스 이름을 가진 요소의 Text 값 추출 후 제목 배열에 append
    title = i.find('div', 'tit').get_text()
    titles.append(title.strip())
    print('제목', titles)

    # BeautifulSoup의 find로 p 태그 중 tag_type이라는 클래스 이름을 가진 요소의 Text 값 추출 후 태그 배열에 append
    tag = i.find('p', 'tag_type').get_text()
    tags.append(tag.strip())
    print('태그: ', tags)
    print('\n')

    no += 1 # 번호 카운팅

# 다양한 형태의 파일에 저장하기

# .txt 형태로 저장하기
f = open(f_name, 'a', encoding='UTF-8')
f.write(str(titles))
f.write(str(tags))
f.close()
print('txt 파일 저장 경로: %s' %f_name)

# Pandas를 사용하여 csv, excel(xls)로 만들기
import pandas as pd

korea_trip = pd.DataFrame()
korea_trip['번호'] = no_array
korea_trip['제목'] = titles
korea_trip['태그'] = tags

# .csv 형식으로 작성
korea_trip.to_csv(fc_name, encoding='utf-8-sig')
print('csv 파일 저장 경로: %s' %fc_name)

# Excel 형식으로 작성
korea_trip.to_excel(fx_name)
print('xls 파일 저장 경로: %s' %fx_name)

print('요청하신 데이터 수집 작업이 정상적으로 완료되었습니다.')

while(True): pass # 크롬 브라우저 실행 유지
# selenium에서 driver.get() 함수의 실행이 종료되면 브라우저도 종료된다.
# 터미널에서 실행이 종료되면 브라우저도 종료된다.
