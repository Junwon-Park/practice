# f = open('./test.txt', 'r')

# line = f.readline() # readline() 메서드는 파일의 내용을 한 번에 한 줄씩 읽어온다.(줄바꿈 기준 한 줄)
# print(line)
# # 1. 햄버거

# line = f.readline()
# print(line)
# # 2. 치즈 돈까스

# line = f.readline()
# print(line)
# # 3. 불닭발

# line = f.readline()
# print(line)
# # 4. 매운 떡볶이

# line = f.readline()
# print(line)
# # 5. 쭈꾸미 볶음

# f.close()

f = open('./test.txt', 'r')

lines = f.readlines()
print(lines)
# ['1. 햄버거\n', '2. 치즈 돈까스\n', '3. 불닭발\n', '4. 매운 떡볶이\n', '5. 쭈꾸미 볶음']

f.close()