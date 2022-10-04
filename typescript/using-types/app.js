var add = function (n1, n2) {
    return n1 + n2;
};
var printResult = function (num) {
    console.log("Result: " + num);
};
printResult(add(5, 12));
// // 예제 1
// let combineValues; // 일반적인 JS의 변수 선언
// combineValues = add; // 함수를 할당
// combineValues = 5; // 숫자 5를 재할당
// console.log(combineValues(8, 8)); // TS에서는 최종적으로 combineValues라는 변수에 할당된 값이 5라는 number 타입의 값이기 때문에 해당 변수의 타입을 number라고 추론한다.
// // 그렇기 때문에 빨간줄이 생긴다.
// // 기존의 TS는 이런 상황을 감지하지 못해 빨간줄이 생기지 않아 런타임 때 에러가 발생했다고 한다.
// // 예제 2
// let combineValues: Function; // combineValues 변수에 함수 타입 지정
// combineValues = add; // add는 함수이기 때문에 Function 타입인 combineValues 변수에 할당할 수 있다.
// // combineValues = 5; // 5는 number 타입이기 때문에 당연히 빨간 줄이 생기고 실행하면 에러가 발생한다.
// console.log(combineValues(8, 8));
// 예제3
var combineValues;
combineValues = add;
combineValues = printResult;
console.log(combineValues(8, 8));
