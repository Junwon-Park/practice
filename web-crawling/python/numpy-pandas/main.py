import numpy
import pandas as pd # 실행 잘 되는데 왜 빨간줄?? ㅡㅡ

cnt = []
name = []

cnt.append(1)
cnt.append(2)

name.append('홍길동')
name.append('일지매')

member = pd.DataFrame() # ! pandas의 DataFrame() 메서드로 컬럼을 지정하여 표(Chart)를 만들 수 있다.
member['번호'] = cnt
member['이름'] = name

print(member)

# member.to_csv('./member_test.csv', encoding='utf-8', index=False) 
# # index 인자는 boolean 값을 줄 수 있고, 파일의 내용의 row마다 가장 왼쪽에 index 번호를 줄 것인지를 설정

member.to_excel('./member_test.xlsx')