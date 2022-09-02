image = open('image.png', 'rb') # 마찬가지로 파일을 읽어오는 것이기 때문에 r 모드를 사용하지만 이미지 파일은 바이너리(Binary)로 되어 있기 때문에 Read Binary의 약자인 rb 모드를 사용해야 한다.
image2 = open('image2.png', 'wb')

print(image.read())
image2.write(image.read()) # 위에서 rb 모드로 메모리에 올린 image를 wb 모드로 image2.png라는 이름의 파일에 쓰라는 명령이다.

image.close()
image2.close()