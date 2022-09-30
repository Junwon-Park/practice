var add = function (n1, n2, showResult, phrase) {
    var result = n1 + n2;
    if (showResult)
        console.log(phrase + result);
    else
        return result;
};
var number1 = 5; // 5.0과 같은 실수도 같은 number 타입이다.
var number2 = 2.8;
var printResult = true;
var resultPhrase = "Result is ";
var number3 = 1;
// resultPhrase = 3;
var result = add(number1, number2, printResult, resultPhrase);
