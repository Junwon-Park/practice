import csv

f = open('member_test.csv') # 인코딩 에러가 발생할 경우 open()의 두 번째 인자로 encoding을 알맞게 지정하면 된다.
read = csv.reader(f)

print(read) # 메모리 주소 반환(참조타입 자료형이라는 의미이다.)
print(list(read)) # 리스트로 반환되기 때문에 list()로 감싸주면 각 요소로 리스트 형태인 것을 확인할 수 있다.

# 출력
# <_csv.reader object at 0x7f3d9fe1cd60>
# [['번호', '이름'], ['1', '홍길동'], ['2', '일지매']]