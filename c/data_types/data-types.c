/**
 * ** 정수 자료형 **
 * 
 * * 부호가 있는 자료형(자료형 앞에 signed가 생략되어 있다. signed를 명시해도 동일하게 동작한다.)
 * (signed) char                 /   1Byte   /   -128 ~ 127                  /   printf format 문자: %c 또는 %d
 * (signed) short                /   2Byte   /   -32768 ~ 32767              /   printf format 문자: %d
 * (signed) int                  /   4Byte   /   -2147483648 ~ 2147483647    /   printf format 문자: %d
 * (signed) long                 /   4Byte   /   -2147483648 ~ 2147483647    /   printf format 문자: %ld
 * (signed) long long            /   8Byte   /   -2^63 ~ 2^63 - 1            /   printf format 문자: %lld
 * 
 * * 부호가 없는 자료형
 * unsigned char        /   1Byte   /   0 ~ 255                     /   printf format 문자: %u
 * unsigned short       /   2Byte   /   0 ~ 65535                   /   printf format 문자: %u
 * unsigned int         /   4Byte   /   0 ~ 4295967295              /   printf format 문자: %u
 * unsigned long        /   4Byte   /   0 ~ 4295967295              /   printf format 문자: %lu
 * unsigned long long   /   8Byte   /   0 ~ 2^64 - 1                /   printf format 문자: %llu
 * 
 * unsigned는 부호가 없는 자료형이라는 의미이며 부호가 없다는 것은 - 부호가 없다는 것을 의미한다.
 * 즉, 양수만을 의미하므로 표현할 수 있는 범위 자체는 signed와 동일하지만 범위는 - 범위를 제외한 양수만으로 동일한 범위를 표현한다.
 * 예를 들어, int는 -2147483648 ~ 2147483647 처럼 음수를 포함한 범위를 표현하지만 
 * unsigned int는 부호가 없는 int 자료형이므로 0 ~ 4295967295 음수를 제외한(총 표현 범위는 동일) 값의 표현만 가능하다는 것을 명시한 것이다.
 * 
 * ~ char
 * 1Byte 정수 자료형인 char는 문자를 뜻하는 character로 자료형 중에는 가장 낮은 범위의 데이터 표현힌 128 ~ 127 범위의 값을 저장살 수 있지만
 * 주로 문자를 저장하는 용도로 사용되어진다.(즉, 허용하는 범위 내의 숫자도 표현 가능) char 자료형 변수에 문자를 할당하고 이를 컴파일하면 컴파일러는 이 문자를 
 * 0 ~ 127 사이의 정수(아스키 코드 값)로 바꾸어 실행한다. 아스키 코드는 0 ~ 127 까지 있기 떄문에 char 자료형의 범위로 이를 모두 표현할 수 있다.
 * 
 * ~ short, int, long
 * 정수 자료형의 기본인 int는 integer(정수)의 약어로 다른 언어에서도 보편적으로 사용되는 자료형이다.
 * 가장 표현 범위가 작은 short도 용도에 맞게 사용할 수도 있지만 연산을 하는 경우 int로 변환되기 때문에 변환 과정을 포함하면 실행 속도가 느려질 수 있다.
 * 따라서 특별한 경우가 아니라면 short 보다는 int를 사용하는 것이 나으며 int로 표현할 수 없는 값을 저장할 때는 int 보다 표현 범위가 큰 long long을 사용할 수 있지만
 * 메모리의 낭비가 많아 효율성이 떨어진다. 그렇기 때문에 보통은 int 사용을 권장하고 short와 long long은 꼭 필요한 경우에만 사용한다.
 * * short는 연산할 때 int로 변환한 뒤에 연산한다고 했는데, 이를 "정수의 승격"이라고 하며 표현 범위가 작은 자료형과 표현범위가 큰 자료형을 연산하려는 경우
 * * 표현 범위가 작은 자료형을 표현 범위가 큰 자료형으로 변환한 뒤, 연산하는 것이다.(Java의 Type casting과 동일하다.)
 * * 보통은 int를 사용하기 때문에 어떤 일부의 자료형만 short를 사용하는 경우 short + int와 같은 연산이 발생할 확률이 높은데 이 때 컴파일러는 short -> int 후에 연산을 수행한다.
 * * Type casting을 통해 표현 범위가 상대적으로 더 큰 자료형으로 변환하는 이유는 동일한 자료형 끼리만 연산이 가능하고 이 때, 표현 범위가 상대적으로 더 큰 자료형으로 변환한 뒤 연산을 수행하게 된다.
 * 
*/

/**
 * ** 실수 자료형 **
 * 
 * ? 실수 자료형이란 말 그대로 실수(소수점 이하도 포함하는 수)를 표현하는 자료형이다.
 * 
 * float        /   -3.4 * 10^35 ~ 3.4 * 10^35      /   소수점 이하 6자리   /   printf format 문자: %f
 * double       /   -1.79 * 10^308 ~ 1.79 * 10^308  /   소수점 이하 15자리  /   printf format 문자: %lf
 * long double  /   double 이상                      /   double 이상      /   printf format 문자: %Lu
*/

#include<stdio.h>

// main 함수 전에 함수의 원형을 입력 해줘야 컴파일러가 main 함수 실행 중 함수의 존재를 인지할 수 있다.
// 함수의 원형이 아닌 함수의 선언 자체를 여기에 해도 된다.
// 함수의 선언을 main함수 보다 아래에 한 경우 여기에 선언한 함수의 원형을 입력해줘야 한다.
void intAndshort(int a, short b);
void intAndDouble(int a, double b);

int main(void) {
    intAndshort(1, 1);
    intAndDouble(1, 1.234);

    unsigned int ua = -1;
    printf("\n%d", ua); // -1 출력
    printf("\n%u", ua); // 4294967295 출력
    // 먼저 컴퓨터는 음수의 그 절댓 값을 2의 보수로 저장하는데, -1과 4294967295 모두 2의 보수로 표현하면 11111111 11111111 11111111 11111111로 동일하다.
    // %d를 사용한 부분에서 unsigned임에도 -1이 정상적으로 출력되었다.
    // %d가 signed의 Format string이므로 컴퓨터에 저장된 2의 보수 중 가장 왼쪽의 비트를 부호로 인식하여 10진수로 변환하고 signed로 type casting 해서 그 결과인 -1을 출력한 것이다.
    // unsigned의 Format string은 %u이다.
    // %u를 사용하면 부호를 고려하지 않으므로 모든 비트를 10진수로 바꿔 4294967295을 출력한 것이다.
    // 결국에는 unsigned형 변수에 음수도 저장할 수 있다. 그러나 연산을 하거나 대소를 비교할 때는 -, + 부호 비트를 고려하지 않고 항상 양수로 처리하므로 결과가 예상과 다를 수 있다.
    // ! 그렇기 때문에 unsigned 자료형에는 항상 양수를 저장하고 %u로 출력하는 것이 권장된다.

    return 0;
}

void intAndshort(int a, short b) {
    // a와 b의 자료형이 각각 int, short로 서로 다르지만 정상적으로 출력된다.
    // 이유는 위에서도 설명했듯이 서로 다른 자료형 끼리의 연산 시 상대적으로 표현 범위가 작은 자료형을 상대적으로 표현 범위가 큰 자료형으로 Type casting하기 때문이다.
    printf("%d + %d = %d", a, b, a + b);
}

void intAndDouble(int a, double b) {
    // 마찬가지로 매개변수 a와 b 각각의 자료형이 다르지만 컴파일러가 컴파일 할 때 int를 double로 Type casting 했기 때문에 연산이 가능하다.
    // double의 format string은 %lf지만 %f로만 작성해도 잘 동작하고 %lf라고 해도 잘 동작한다.
    printf("%d + %f = %f", a, b, a + b);
}
