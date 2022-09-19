from bs4 import BeautifulSoup

# html_find = """
# <html>
#     <head>
#         <title> HTML 연습 </title>
#     </head>
#     <body>
#         <p align="center"> text content Center! </p>
#         <p align="right"> text content Right! </p>
#         <p align="left"> text content Left! </p>
#         <img src="" />
#     </body>
# </html>
# """
# bs = BeautifulSoup(html_find, 'html.parser') # 첫 번째 인자는 HTML 문서가 들어있는 변수의 이름, 두 번째 인자는 HTML 문서를 분석하는 도구 이름

# # find() 메서드
# findTitle = bs.find('title') # 위에서 BeautifulSoup()의 첫 번째 인자로 지정한 HTML 문서를 분석한 bs에서 title 태그를 찾아라
# #! find() 메서드는 지정하여 찾아온 태그 중 가장 먼저 나오는 한 건만 출력
# print(findTitle)

# findParagraph = bs.find('p', align="center") # 두 번째 인자로 첫 번째 인자에 지정한 <p> 태그의 align 속성이 'center'인 것만 찾아온다.
# print(findParagraph)
# findParagraph = bs.find('p', align="right") # p 태그의 align 속성이 right인 것만 찾아온다.
# print(findParagraph)
# findParagraph = bs.find('p', align="left") # p 태그의 align 속성이 left인 것만 찾아온다.
# print(findParagraph)

html_find_all = """
<html>
    <head>
        <title> HTML 연습 </title>
    </head>
    <body>
        <p align="center"> text content center! 1 </p>
        <p align="center"> text content center! 2 </p>
        <p align="center"> text content center! 3 </p>
        <img src="" width='500' height='300' />
    </body>
</html>
"""

# find_all() 메서드
bs = BeautifulSoup(html_find_all, 'html.parser')

# body_tag = bs.find('body')
# bodys_list = body_tag.find_all(['p', 'img'])
# for el in bodys_list:
#     print(el)

# # findAllParagraph = bs.find_all('p')
# # print(findAllParagraph)

# # findAllParagraphArray = bs.find_all(['p', 'img'])
# # for el in findAllParagraphArray:
# #     print(el)

# # 정규식을 사용한 태그 검색
# import re

# tags = bs.find_all(re.compile("^p")) # re 모듈(정규식 모듈)의 compile() 메서드에 p로 시작하는 것을 의미하는 정규식을 컴파일 하여 find_all() 메서드로 모두 찾아온다.
# print(tags)

# # 태그의 속성을 지정하여 중복되는 태그 중 특정 순서에 있는 태그 지정하여 찾아오기
# findAlignCenter = bs.find_all(align='center') # bs(위에서 지정한 html 파일)에서 align 속성이 center인 것만 찾아온다.
# print('alignCenter!', findAlignCenter)

# findWidth = bs.find_all(width='500') # bs의 모든 태그 중 width라는 속성의 값이 500인 것만 가져와라
# print(findWidth)

# # 태그의 컨텐츠로 검색하기
# findAllText = bs.find_all(text = ' text content center! ') # 컨텐츠에 들어간 내용이 text 속성에 지정한 컨텐츠와 정확히 일치하는 것을 모두 찾아온다.
# print(findAllText)

# findAllText = bs.find_all(text = re.compile('text +')) # text로 시작하는 컨텐츠를 가진 태그를 모두 가져온다.
# print(findAllText)

# findLimitText = bs.find_all('p', limit=2) # p 태그를 2 개만 찾아와라
# print(findLimitText)
# findLimitText = bs.find_all(text = re.compile('text +'), limit=2) # p 태그를 2 개만 찾아와라
# print(findLimitText)

# # stirng 키워드로 문장 가져오기
# body_tag = bs.find('body') # body 태그를 포함한 모든 자식 태그까지 추출한다.
# # print('Body tag!', body_tag)
# p_tag = body_tag.find_all('p') # body_tag 중 p 태그만 추출한다.
# # print(p_tag) # 위에서 추출한 p 태그의 컨텐츠를 추출한다.
# # ! 하지만 가장 처음에 있는 것 한 개만 출력하기 때문에 p_tag의 모든 p 태그의 컨텐츠를 출력하려면 아래처럼 반복문을 사용해야 한다.
# for el in p_tag: # p_tag의 모든 요소를 순회하며 각 요소의 컨텐츠 반환
#     print('String!', el.string)

# # get_text()
# bs.find('body')
# getBodyText = body_tag.get_text() # body 태그의 모든 자식 요소의 컨텐츠 반환
# print('Get body text!',getBodyText)

# bs.find('body')
# getBodyText = body_tag.get_text('-') # 출력 옵션으로 하이픈 '-' 지정
# print('Get body text width - !',getBodyText)