package string;

public class StringStudy {
    public static void main(String[] args) {
        /**
         * 문자열을 제외한 int, boolean, char, short, float, double, long int, long double은 원시 타입 자료형이다.
         * 원시타입 자료형의 키워드는 모두 "소문자"로 시작한다.
         * 하지만 문자열은 String이라는 키워드를 사용하고 대문자로 시작한다. 그 말은 문자열 자료형인 String은 원시타입 키워드가 아닌 클래스라는 의미이다.
         * 정확히는 java.lang 패키지의 문자열을 다루기 위한 클래스이다.(java.lang.String)
         * java.lang 패키지는 import 하지 않고 바로 사용할 수 있다.
         * 그리고 String s = "ABC"라는 문자열 변수가 있다면 메모리의 s라는 공간에 바로 문자열 "ABC"가 할당되는 것이 아니라 "ABC"라는 값은 heap에 저장되고
         * s라는 변수에는 그 주소가 할당되어 참조 변수가 된다.
         * 그리고 문자열을 할당하는 방법은 여러 가지가 있는데 기본적으로 String s = "ABC"와 같이 문자열 리터럴 형식으로 할당하는 방법과
         * String s = new String("ABC")와 같이 인스턴스를 생성하는 것이다.
         * 둘의 가장 큰 차이점은 동일한 문자열 값을 할당했을 때, 메모리 자원의 사용 방식이다.
         * 먼저 저장되는 곳은 둘 다 heap이기는 하지만 정확히는 리터럴 형식으로 할당한 값은 heap의 Constant pool에 할당되고,
         * new 연산자를 사용한 인스턴스 형식으로 할당한 값은 heap에 할당된다.
         * 그리고 String s = "ABC"와 같은 리터럴 타입은 각각 다른 변수에 동일한 값을 할당한 경우 가장 처음 할당한 메모리의 주소를 해당 변수가 참조하게 된다.
         * 그렇기 때문에 동일한 문자열 리터럴 값에 대해서는 추가로 저장 공간을 사용하지 않고 처음 할당된 공간의 참조를 공유하는 것이다.
         * 반면 new String()과 같이 인스턴스 방식으로 할당한 문자열 값은 그 값이 "ABC"로 동일해도 각각 다른 변수에 여러번 선언한 경우 그 각각이 메모리에 할당된다.
         * 그렇기 때문에 인스턴스 방식으로 문자열을 할당하게 되면 값이 동일해도 이를 각각 다른 변수에 여러번 할당하면 그 각각의 메모리 공간을 할당하게 된다.(메모리 자원 낭비)
         * 이런 차이점은 문자열을 비교할 때 확실히 알 수 있다. 만약 String s1 = "ABC", String s2 = "ABC"를 비교하련는 경우
         * s1 == s2는 true가 반환된다. 이유는 이 둘은 모두 리터럴 타입으로 할당되었기 때문 s1과 s2에는 "ABC"가 할당된 메모리 주소를 동일하게 참조하고 있다.
         * 그렇기 때문에 위 비교는 "s1에 할당된 주소 == s2에 할당된 주소"가 되고 모두 동일한 주소를 참조하고 있기 때문에 true가 반환돤다.
         * new String() 방식을 사용한 경우 String s1 = new String("ABC"), String s2 = new String("ABC")가 있을 때 둘을 비교하면
         * s1 == s2는 false를 반환한다. 이유는 이 둘은 값은 동일하지만 각각의 인스턴스를 생성했기 떄문에 s1이 참조하는 주소와 s2가 참조하는 주소가 다르고 == 연산자로 비교하는 경우
         * 변수에 할당된 값(주소 참조 값)을 그 대로 비교하기 때문에 서로 다른 주소를 참조하고 있는 s1과 s2에 대한 비교의 결과는 false가 된다.
         * 그렇기 때문에 new String()으로 할당한 s1과 s2를 비교하려면 String 클래스의 equalse() 메서드를 사용하면 된다. equals() 메서드는 이 둘의 주소가 아니라 해당 인스턴스에 할당한 문자열 값을 비교하는 메서드이다.
         * s1.equals(s2)의 결과는 true이다.
         * 두 방식 모두 문자열을 할당하는 방법이고 할당한 문자열은 수정이 불가능하다.(문자열의 값은 Immutable 하다.)
         * 그렇기 때문에 이들의 값을 수정하면 새로운 공간을 할당해서 그 곳에 수정된 값을 저장한다.(비교적 비효율적)
         * 문자열의 수정이 빈번한 경우 해당 문자열은 StringBuffer 타입으로 선언한다.
         * StringBuffer 타입은 String 타입과 동일한 문자열 클래스이지만 수정이 가능하다.
         * 그렇기 때문에 값이 수정되어도 메모리의 새로운 공간에 값을 할당하는 것이 아니라 기존에 사용하던 공간에 값만 수정하는 방식으로 동작한다.(문자열의 잦은 수정이 일어나는 경우 String 타입 방식보다 비교적 효율적)
         * */

        String si1 = new String("A"); // java.lang.String의 인스턴스
        String si2 = new String("A"); // java.lang.String의 인스턴스
        System.out.println(si1 == si2); // false 출력
        System.out.println(si1.equals(si2)); // true 출력
        String sl1 = "A"; // String 타입의 값을 리터럴 형식으로 할당
        String sl2 = "A"; // String 타입의 값을 리터럴 형식으로 할당
        System.out.println(sl1 == sl2); // true 출력

        StringBuffer sb = new StringBuffer("A"); // java.lang.StringBuffer의 인스턴스
        // sb의 값을 수정해도 새로운 메모리 공간을 사용하지 않고 현재 사용하는 공간을 사용하게 된다.
        System.out.println(sb + "B"); // AB 출력 -> 기존 메모리 공간 그대로 사용
        // 그렇기 때문에 문자열의 수정(문자열의 문자 추가, 제거)이 많은 부분은 StringBuffer를 사용하는 것이 효율적이다.
    }
}
