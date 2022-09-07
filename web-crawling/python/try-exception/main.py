# no1 = int(input())
# # input()에 int()로 감싸고 있기 때문에 무조건 숫자가 와야 하지만 a를 입력해서 아래와 같은 ValueError가 발생했다.
# # Traceback (most recent call last):
# #   File "./python/regular-expression-exception/main.py", line 1, in <module>
# #     no1 = int(input())
# # ValueError: invalid literal for int() with base 10: 'a'
# # ? 에러에 보면 ValueError라는 에러 종류가 나오는데, try exception 구문에서 exception에 대입하는 에러 이름에 여기에서 발생한 에러를 대입하면 된다.
# try: no1 = int(input())
# except ValueError: print('숫자만 입력하세요!')

# no1 = 10
# no2 = 0
# print(no1 / no2) # 0으로 나눌 수 없기 때문에 ZeroDivisionError가 발생한다.
# # Traceback (most recent call last):
# #   File "./python/regular-expression-exception/main.py", line 13, in <module>
# #     print(no1 / no2)
# # ZeroDivisionError: division by zero
# # ? 에러에 보면 현재 발생한 에러는 ZeroDivisionError라는 것을 알 수 있다. 이 에러를 try exception의 exception에 지정하면 된다.
# try: 
#     print(no1 / no2)
# except ZeroDivisionError: 
#     print("0으로 나눌 수 없습니다!")

# try:
#     no1 = int(input("숫자만 입력하세요!\n"))
# except ValueError:
#     print("숫자가 아닙니다.")
# else: 
#     print(no1 * 2)
# # try 구문에서 input에 숫자가 아닌 값이 들어오면 ValuError가 발생하고 "숫자가 아닙니다." 출력
# # 숫자가 들어와 ValuError가 발생하지 않은 경우 else 구문이 실행되어서 입력된 숫자 * 2를 수행 후 출력

# # ? 각 에러마다 다른 메세지 출력
# no1 = 10
# # no2 = 0
# no2 = 'a'
# try:
#     print(no1 / no2)
# except TypeError:
#     print("숫자를 입력하세요~")
# except ZeroDivisionError:
#     print("0으로 나눌 수 없습니다~")
# # no2에 'a'를 넣으면 숫자가 아니기 때문에 나눗셈을 수행할 수 없으므로 TypeError가 발생한다.
# # no2에 0을 넣으면 0으로 10을 나눌 수 없기 때문에 ZeroDivisionError가 발생한다. 

# ? 어떤 상황에도 무조건 실행되는 구문 finally
no1 = 10
# no2 = 0
no2 = 'a'
try:
    print(no1 / no2)
except TypeError:
    print("숫자를 입력하세요~")
except ZeroDivisionError:
    print("0으로 나눌 수 없습니다~")
finally:
    print('0 이상의 숫자만 입력할 수 있습니다.')
# no2에 'a'를 넣으면 숫자가 아니기 때문에 나눗셈을 수행할 수 없으므로 TypeError가 발생한다.
# no2에 0을 넣으면 0으로 10을 나눌 수 없기 때문에 ZeroDivisionError가 발생한다.
# finally 구문은 마지막에 무조건 실행된다.