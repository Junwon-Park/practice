from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By # HTML 요소를 찾을 때, 속성을 지정하는 객체
from selenium.webdriver.chrome.service import Service # 크롬 드라이버를 자동으로 찾기 위해 ChromeDriverManager를 등록하는 객체
from webdriver_manager.chrome import ChromeDriverManager # 크롬 드라이버를 자동으로 찾거나 관리하는 객체

query_txt = input('크롤링할 키워드는 무엇입니까?: ')

# Selenium 크롬 실행 함수
# Step.1 크롬 드라이버를 사용해서 웹 브라우저를 실행한다.
# 크롬을 사용하려면 크롬 드라이버가 설치되어 있어야 하며, 다른 브라우저를 사용한다면 해당 브라우저가 설치되어 있어야 한다.
opts = webdriver.ChromeOptions() # 크롬 드라이버의 옵션을 지정하는 메서드
opts.add_argument('--start-maximized') # 크롬 드라이버의 실행 옵션 중 시작 시 Full Screen 사이즈로 실행되도록 하는 "--start-maximized" 추가
driver = webdriver.Chrome(options=opts, service=Service(ChromeDriverManager().install())) 
# ChromeDriverManager의 install() 메서드가 자동으로 크롬 드라이버를 찾아서 실행한다.
# 첫 번째 인자로 options 위에서 정의한 옵션을 지정
# ? 왜인지는 모르겠지만 Full 사이즈로 실행하지 않으면 브라우저가 아래 while문이 있는데도 종료된다.
# ? 그래서 옵션에 --start-maximized 추가

driver.get('https://korean.visitkorea.or.kr/main/main.html')

# 검색 input창 id -> inp_search
# 검색 버튼 class -> btn_search

# 동작 명령 -> 논리적 동작 순서대로 작성해야 한다.
element = driver.find_element(By.ID, "inp_search") # 속성의 id가 inp_search인 것을 찾아라
element.send_keys(query_txt) # 위에서 찾은 속성에 send_keys()의 인자로 넣은 query_txt(위에서 input() 함수로 전달 받은 문자열)를 전달해라
driver.find_element(By.CLASS_NAME, 'btn_search').click() # 속성의 class가 btn_search인 것을 찾아서 클릭해라


while(True): pass # 크롬 브라우저 실행 유지
# selenium에서 driver.get() 함수의 실행이 종료되면 브라우저도 종료된다.
# 터미널에서 실행이 종료되면 브라우저도 종료된다.