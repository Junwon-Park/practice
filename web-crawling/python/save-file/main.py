from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By # HTML 요소를 찾을 때, 속성을 지정하는 객체
from selenium.webdriver.chrome.service import Service # 크롬 드라이버를 자동으로 찾기 위해 ChromeDriverManager를 등록하는 객체
from webdriver_manager.chrome import ChromeDriverManager # 크롬 드라이버를 자동으로 찾거나 관리하는 객체
import time
import sys

query_txt = input('크롤링할 키워드는 무엇입니까?: ')
f_name = input('검색 결과를 저장할 파일 경로와 이름을 지정하세요: ')
# ~/Documents/coding/practice/web-crawling/python/save-file

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
element = driver.find_element(By.ID, "inp_search") # 속성의 id가 inp_search인 것을 찾아라
element.send_keys(query_txt) # 위에서 찾은 속성에 send_keys()의 인자로 넣은 query_txt(위에서 input() 함수로 전달 받은 문자열)를 전달해라
driver.find_element(By.CLASS_NAME, 'btn_search').click() # 속성의 class가 btn_search인 것을 찾아서 클릭해라

time.sleep(1) # 위 작업이 끝날 때 까지 기다려야하기 때문에 1초 동안 기다려준 것이다.
# 위 작업이 진행되지 않고 아래 작업으로 넘어가 정상적으로 작업이 수행되지 않는 경우 time.sleep()으로 잠시 기다려준다.

orig_stdout = sys.stdout
f = open(f_name, 'a', encoding='UTF-8') # 크롤링에는 반드시 계속 추가하는 'a'모드를 사용한다.
sys.stdout = f

html = driver.page_source # 크롬 드라이버로 현재 페이지의 HTML 소스 파일을 가져온다.
soup = BeautifulSoup(html, 'html.parser') # 위에서 가져온 HTML 소스 파일을 BeautifulSoup에 넣고 html-parser로 분석한다.
blog_list = soup.find('ul','list_thumType type1') # BeautifulSoup으로 분석한 HTML 소스 파일의 ul 태그를 찾아서 ul 태그와 그 자식 요소들을 불러온다.

time.sleep(1)

for i in blog_list:
    print(i.text.strip())
    print('\n')

sys.stdout = orig_stdout
f.close()

print('요청하신 데이터 수집 작업이 정상적으로 완료되었습니다.')

while(True): pass # 크롬 브라우저 실행 유지
# selenium에서 driver.get() 함수의 실행이 종료되면 브라우저도 종료된다.
# 터미널에서 실행이 종료되면 브라우저도 종료된다.
