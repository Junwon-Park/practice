/**
 * 64bit 운영체제에서 하나의 메모뢰 공간의 크기는 8Bytes이다.
 * 64bit가 8Bytes를 의미한다. -> 8bit * 8 = 64
 * 즉, 64bit 운영체제라는 것은 메모리 한 칸의 크기가 64bit(8Bytes)인 운영체제라는 의미이다.
 * 32bit 운영체제는 메모리 한 칸의 크기가 32bit(4Bytes)라는 의미이다.
 * 만약 여기에 int a;라는 변수의 공간을 할당한다면 int의 크기는 4Bytes이기 때문에 하나의 저장 공간의 반을 할당하게 된다.
 * char b;는 8Btypes 중 1Bytes를 사용하게 된다.
 * 하지만 int *ptrA;라는 변수를 선언한 뒤 sizeof()함수를 사용해 실행하면 8이 출력된다.
 * char *ptrB;라는 변수를 선언한 뒤 동일하게 사이즈를 출력하면 8이 출력된다.
 * 그 이유는 *ptr이라는 포인터 변수는 메모리 공간의 주소를 가지고 있고 해당 주소를 가진 공간의 크기를 반환한 것인데, 64bit 운영체제의 메모리 공한 하나의 크기가 8Bytes이기 때문에 해당 포인터 변수에 할당된 주소의 메모리 공간의 크기는 8Bytes인 것이다.
*/

#include<stdio.h>

void sizeOf();
void point();
void swap(int *num1, int *num2);
void pointerOperation();

int main() {

    // swap()을 위한 변수 선언
    int a = 5;
    int b = 10;

    /** void 형 포인터 */
    void *vPtr; // void 포인터는 타입을 지정하지 않는 포인터 변수를 의미한다.
    // 그렇기 때문에 변수의 주소를 할당할 때, 해당 변수의 타입으로 형변환 한 뒤 주소를 할당해야 한다.
    vPtr = (int*) &a; // void 타입의 vPtr은 타입이 지정되어 있지 않기 때문에 a 변수의 타입으로 강제 형변환을 해야 한다.
    // 포인터 변수에 강제 형변환 한 주소를 할당할 떄는 강제 형변환 하는 타입에 *를 붙여줘야 한다.
    // vPtr은 포인터 변수이기 때문에 &를 사용하여 주소를 할당해야 한다.
    printf("Void pointer vPtr = %x", vPtr); // a의 주소 출력
    
    sizeOf();
    point();
    swap(&a, &b); // 포인터를 매개 변수로 받는 swap() 함수의 인자로 a와 b의 주소 대입
    printf("a = %d, b = %d\n", a, b); // swap()에서 a와 b의 주소로 직접 접근하여 값을 변경했기 때문에 a = 10, b = 5 출력 -> 실제 값이 변경됐다.
    pointerOperation();

    return 0;
}

/** 메모리 공간 크기 */
void sizeOf() {
    char c = 'a';
    printf("%lu\n", sizeof(c)); // 1 출력
    printf("%lu\n", sizeof(&c)); // 8 출력
    // c라는 변수는 char 형이기 떄문에 1Bytes의 크기를 갖는다.
    // 하지만 해당 변수의 주소의 크기를 출력하면 해당 주소에 해당하는 메모리의 총 크기인 8이 출력된다.

    int a = 5;
    printf("%lu\n", sizeof(a)); // 4 출력
    printf("%lu\n", sizeof(&a)); // 8 출력
    // char의 경우와 동일하다.

    int *ptr;
    printf("%lu\n", sizeof(ptr)); // 8 출력
    // 포인터 변수에는 메모리 공간의 주소가 할당되어 있기 때문에 크기는 해당 주소에 해당하는 메모리 공간의 총 공간이 출력된다.

    printf("sizeOf execute is done\n");
}

/** 포인터 기본 */
void point() {
    int a = 5;
    int b = 10;

    int *ptr;
    int *ptr2;

    ptr = &a; // a 변수의 메모리 주소 할당
    ptr2 = &b; // b 변수의 메모리 주소 할당.
    
    printf("Value of ptr is %d\n", *ptr); // Value of ptr is 5 출력
    // ptr 포인터 변수에는 a 변수의 메모리 주소가 할당되어 있고 그 주소에 할당된 값에 접근하려면 *ptr 처럼 * 기소를 붙이면 된다.
    // 포인터 변수에 *를 붙이지 않고 접근하면 할당된 주소가 출력되고 *를 붙이면 그 주소에 할당된 값에 접근하는 것이다.
    
    printf("b - a = %d\n", *ptr2 - *ptr); // 5 출력
    // 포인터 변수에 *를 붙여 각각의 주소에 할당된 값에 접근했고 그 연산 결과 5가 출력됐다.

    printf("Point execute is done\n");
}

/** 포인터 스왑 */
void swap(int *num1, int *num2) { // 매개 변수를 포인터 변수로 선언해서 인자를 주소로 받도록 했다.
    // 만약 이 함수에서 num1과 num2에 들어오는 변수의 값을 서로 스왑해도 함수의 매개 변수는 함수 내에서만 유요하기 때문에 인자로 전달한 변수의 실제 값이 변하지 않는다.
    // 하지만 매개 변수를 포인터로 선언하여 함수 호출 시 인자를 변수의 주소로 전달하게 된다면 해당 주소에 접근할 수 있게 되기 떄문에 해당 변수의 실제 값을 조작할 수 있게 된다.
    
    // *num1과 *num2에는 main() 함수의 a와 b의 주소를 각각 대입했다.
    int temp;

    temp = *num1;
    *num1 = *num2;
    *num2 = temp;

    printf("swap execute is done\n");
}

/** 포인터 연산 */
void pointerOperation() {
    char charArr[6] = "hello"; // 문자열은 chaf(문자)의 배열이다.

    char *ptr;

    ptr = &charArr[0]; // charArr의 0번쨰 인덱스의 주소 할당.

    printf("%c\n", *ptr); // charArr의 0번째 인덱스의 값에 해당하는 'h'가 출력된다.
    printf("%c\n", *(ptr + 4)); // ptr은 charArr의 0번째 인덱스의 주소를 저장하고 있고 이 주소 포인터에 4(4번쨰 인덱스)를 더하면 해당 주소에 해당하는 변수의 타입에 해당하는 크기 * 4 만큼 이동하게 된다.
    // 그러면 "hello" 중 "o"가 위치한 공간의 주소를 가리키게 되고 이를 괄호로 묶어 앞에 *를 분이면 해당 주소에 할당된 값을 의미하므로 "o"가 출력된다.
    // 이렇게 포인터 연산을 사용하여 연속된 값의 메모리 주소를 포인팅 하여 접근할 수 있다.
    // 다만 포인터 연산을 사용하려면 배열이나 문자열(문자의 배열)과 같은 연속된 공간에 저장된 형태여야 한다.

    printf("pointerOperation execute is done\n");
}