import re

url = '<a href="https://blog.naver.com/abc1224"> 여행블로그 </a>'
print(re.search('href="(.*?)">',url).group(1))
# https://blog.naver.com/abc1224 출력 

# # ? re.search() vs re.match()
# # ? re.search(Pattern, Data) -> search()는 내가 지정한 패턴이 데이터의 일부에만 맞아도 찾으라는 명령
# # ? re.search()는 이에 부합하는 첫 번째 요소만 반환한다.
# search = re.search("[pP]", "apPie") # 두 번째 인자의 Data("apPie")에서 p나 P가 있다면 찾으라는 명령
# print(search) # <re.Match object; span=(1, 2), match='p'> 출력 -> Data에서 지정한 패턴 중 소문자 p가 일치했기 때문에 찾은 것이다.

# # re.match(Pattern, Data) -> match()는 지정한 패턴과 정확히 일치하는 것만 찾으라는 명령
# match = re.match("[pP]", "apPie")
# print(match) # None 출력 -> 일치하는 데이터 없음

# # ? re.compile() -> 인자로 지정한 패턴을 찾으라는 명령을 저장할 수 있다.
# s_txt = re.compile("a.c") # 알파벳 a와 c 사이에 임의의 문자 하나가 들어간 패턴을 s_txt라는 변수에 저장한 것이다.
# print(s_txt.search("aaa"))
# # 위에서 s_txt는 a로 시작하고 c로 끝나야 하면서 그 사이에 임의의 문자가 하나 있어야 하는데, 현재 search()에 대입한 데이터는 패턴의 조건을 만족하지 못하기 때문에 아무 것도 찾지 못해 None을 반환한다.
# print(s_txt.search("aac"))
# # <re.Match object; span=(0, 3), match='aac'> 출력 -> 지정한 패턴의 조건에 만족하기 때문에 찾아냈다.
# print(s_txt.search("aㄱc"))
# # <re.Match object; span=(0, 3), match='aㄱc'> 출력 -> .은 임의의 한 개의 문자이므로 한글이던 알파벳이던 하나만 오면 된다.

# ? ?(Question Mark) -> ? 바로 앞에 있는 문자가 아에 없거나 단 하나만 존재해야 한다.
# s_txt = re.compile("py?n") # "pyn" 중 y가 한 개만 존재하거나 아에 존재하지 않는다는 패턴을 저장한다.
# print(s_txt.search("pyn")) # "pyn" 중 y가 한 번만 존재하기 때문에 위에서 저장한 패턴의 조건을 만족한다.
# # <re.Match object; span=(0, 3), match='pyn'> 출력
# print(s_txt.search("pyyn")) # "pyn" 중 y가 두 번 나왔기 때문에 위에서 저장한 패턴의 조건을 만족하지 못한다.
# # None 출력
# print(s_txt.search("pn")) # "pn"에는 y가 없기 때문에 위에서 지정한 패턴의 조건에 만족한다.
# # <re.Match object; span=(0, 2), match='pn'> 출력
# print(s_txt.search("pin")) # "pin" 중에는 p와 n 사이에 y가 아닌 i가 있으므로 위에서 저장한 패턴의 조건을 만족하지 못한다.
# # None 출력

# # ? *(Ampersand) -> ? 바로 앞에 문자가 아에 없거나 하나 이상 존재해야 한다.(?와 약간의 차이)
# s_txt = re.compile("py*n") # y가 없거나 하나 이상 존재한다는 패턴을 저장한다.
# print(s_txt.search("pyn")) # p와 n사이에 y가 한 개 존재하므로 위에서 저장한 패턴의 조건을 만족한다.
# # <re.Match object; span=(0, 3), match='pyn'> 출력
# print(s_txt.search("pyyn")) # p와 n 사이에 y가 한 개 이상 있으므로 위에서 저장한 패턴의 조건을 만족한다.
# # <re.Match object; span=(0, 4), match='pyyn'> 출력
# print(s_txt.search("pn")) # p와 n 사이에 y가 없으므로 위에서 지정한 패턴의 조건을 만족한다.
# # <re.Match object; span=(0, 2), match='pn'> 출력
# print(s_txt.search("pin")) # p와 n 사이에 y가 아닌 i가 있으므로 위에서 지정한 패턴의 조건을 만족하지 못한다.
# # None 출력

# # ? +(Plus) -> + 바로 앞의 문자가 한 번이 상 존재하면서 그 뒤에 지정한 문자도 존재해야 한다.
# s_txt = re.compile("py+n") # p와 n사이에 y가 한 번 이상 존재하면서 그 뒤의 문자열도 존재한다는 패턴을 지정한다.
# print(s_txt.search("pyn")) # p와 n사이에 y가 한 번 이상 존재하면서 그 뒤에 n이 존재하기 때문에 위에서 지정한 패턴의 조건을 만족한다.
# # <re.Match object; span=(0, 3), match='pyn'> 출력
# print(s_txt.search("pyyn")) # p와 n사이에 y가 한 번 이상 존재하면서 그 뒤에 n이 존재하기 때문에 위에서 지정한 패턴의 조건을 만족한다.
# # <re.Match object; span=(0, 4), match='pyyn'> 출력
# print(s_txt.search("pn")) # p와 n사이에 y가 존재하지 않기 때문에 위에서 지정한 패턴의 조건을 만족하지 못한다.
# # None 출력
# print(s_txt.search("pin")) # p와 n사이에 y가 존재하지 않고 그 대신 i가 존재하기 때문에 위에서 지정한 패턴의 조건을 만족하지 못한다.
# # None 출력

# # ? ^(Carrot) -> ^ 바로 뒤의 문자로 시작해야 한다.
# s_txt = re.compile("^p") # p(소문자)로 시작하는 패턴을 저장한다.
# print(s_txt.search("python")) # p(소문자)로 시작하기 때문에 위에서 지정한 패턴의 조건을 만족한다.
# # <re.Match object; span=(0, 1), match='p'> 출력
# print(s_txt.search("sython")) # s로 시작하기 때문에 위에서 지정한 패턴의 조건을 만족하지 못한다.
# # None 출력

# # ? $(Dollar) -> $ 바로 앞의 문자로 끝나야 한다.
# s_txt = re.compile("n$") # n(소문자)으로 끝나는 패턴을 저장한다.
# print(s_txt.search("python")) # n(소문자)으로 끝나기 때문에 위에서 지정한 패턴의 조건에 만족한다.
# # <re.Match object; span=(5, 6), match='n'> 출력
# print(s_txt.search("apple")) # e로 끝나기 때문에 위에서 지정한 패턴의 조건에 만족하지 못한다.
# # None 출력

# # ? [](Square Bracket) -> []안에 존재하는 모든 문자를 포함하기만 하면 만족한다.
# s_txt = re.compile("[pa]") # p 또는 a를 단 하나라도 포함한다는 패턴을 저장한다.
# print(s_txt.search("python")) # p가 포함되어 있기 때문에 위에서 지정한 패턴의 조건에 만족한다.
# # <re.Match object; span=(0, 1), match='p'> 출력
# print(s_txt.search("pineapple")) # p와 a 모두 포함되어 있기 때문에 위에서 지정한 패턴의 조건을 만족한다.
# # <re.Match object; span=(0, 1), match='p'> 출력
# print(s_txt.search("banana")) # a가 포함되어 있기 때문에 위에서 지정한 패턴의 조건을 만족한다.
# # <re.Match object; span=(0, 1), match='a'> 출력

# # ? [^] -> ^ 기호 뒤에 문자를 제외한 나머지 모든 문자를 포함하면 만족한다.
# s_txt = re.compile("[^pa]") # p(소문자)나 a(소문자)를 제외한 나머지 모든 문자를 포함한다는 패턴을 저장한다.(p나 a가 있어도 이를 제외한 나머지 모든 문자 중 하나라도 포함하면 만족한다.)
# print(s_txt.search("python")) # p는 제외지만 그 다음 p나 a가 아닌 y를 포함하기 때문에 위에서 지정한 패턴의 조건에 만족한다.
# # <re.Match object; span=(1, 2), match='y'> 출력
# print(s_txt.search("pineapple")) # p는 제외지만 그 다음 p나 a가 아닌 i를 포함하기 때문에 위에서 지정한 패턴의 조건에 만족한다.
# # <re.Match object; span=(1, 2), match='i'> 출력
# print(s_txt.search("p")) # p와 a는 제외하는 패턴이기 때문에 위에서 지정한 패턴에 만족하지 못한다.
# print(s_txt.search("a")) # p와 a는 제외하는 패턴이기 때문에 위에서 지정한 패턴에 만족하지 못한다.
# # 위 둘은 None 출력

# # ? [] 범위 -> 대괄호 안의 범위에 들어가면 만족한다.
# s_txt = re.compile("[0-9]") # 숫자 0 ~ 9 까지의 알파벳의 범위에 포함된다는 패턴을 저장한다.
# print(s_txt.search("abc123")) # 123 모두 1, 2, 3 모두 위에서 지정한 패턴의 조건에 만족한다.
# # <re.Match object; span=(3, 4), match='1'> 출력
# s_txt = re.compile("[a-d]") # 소문자 a ~ d 까지의 알파벳의 범위에 포함된다는 패턴을 저장한다.
# print(s_txt.search("abc123")) # a, b, c 모두 위에서 지정한 패턴의 조건에 만족한다.
# # <re.Match object; span=(0, 1), match='a'> 출력
# s_txt = re.compile("[A-D]") # 대문자 A ~ D 까지의 알파벳의 범위에 포함된다는 패턴을 저장한다.
# print(s_txt.search("abc123")) # 대문자가 아에 존재하지 않으므로 위에서 지정한 패턴의 조건에 만족하지 못한다.
# # None 출력
# s_txt = re.compile("[가-사]") # 한글도 가능하며 가 ~ 사 까지의 문자의 범위에 포함된다는 패턴을 저장한다.
# print(s_txt.search("강원도")) # "강"이 위에서 지정한 패턴의 조건에 만족한다.
# # <re.Match object; span=(0, 1), match='강'> 출력

# # ? re.search() vs re.findall()
# # ? 정규식에 부합하는 첫 번째 요소만 반환하는 search()와 다르게 findall()은 정규식에 부합하는 모든 문자열을 리스트로 반환한다.
# s_txt = "저의 생일은 1982년 7월 15일 입니다"
# print(re.findall("\d", s_txt)) # s_txt에서 숫자에 해당하는 것을 모두 찾아 해당 숫자 각각을 요소로 갖는 배열로 반환
# # ['1', '9', '8', '2', '7', '1', '5'] 출력
# print(re.findall("\d+", s_txt)) # s_txt에서 숫자에 해당하는 것을 모두 찾아 숫자를 각각 쪼개지 않고 숫자 덩어리 채를 요소로 갖는 배열로 반환
# # ['1982', '7', '15'] 출력

# # ? re.split() -> 주어지 ㄴ문자열을 특정 패턴을 기준으로 분리한다.
# s_txt = "https://blog.naver.com/abc1234"
# print(re.split('/', s_txt)) # s_txt 문자열에서 /를 기준으로 분리하여 각각을 요소로 갖는 배열 반환
# # ['https:', '', 'blog.naver.com', 'abc1234'] 출력
# print(re.split('//', s_txt)) # https:// 부분에 /가 연속 두 번이기 때문에 공백으로 출력되던 것을 조건에 //을 줘서 공백은 반환되는 배열의 요소로 포함되지 않도록 한 것이다.
# # ['https:', 'blog.naver.com/abc1234'] 출력

# # ? re.sub() -> 주어진 패턴과 일치하는 문자를 변경한다.
# s_txt = "https://blog.naver.com/abc1234"
# print(re.sub("https://", "", s_txt)) # s_txt에서 re.sub()의 첫 번째 인자로 지정한 부분을 ""(공백)으로 변경한다.(해당 부분을 제거한 것과 같다.)
# # blog.naver.com/abc1234 출력