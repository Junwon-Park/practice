// 리터럴 타입(Literal Type)
var combine = function (input1, input2, resultConversion) {
    var result;
    if ((typeof input1 === "number" && typeof input2 === "number") ||
        resultConversion === "as-number")
        result = +input1 + +input2;
    else
        result = input1.toString() + input2.toString();
    if (resultConversion === "as-number")
        return +result;
    else
        result.toString();
    return result;
};
var combineAges = combine(30, 26, "as-number");
console.log(combineAges);
var combineStringAges = combine("30", "26", "as-number");
console.log(combineStringAges);
var combineNames = combine("Max", "Anna", "as-text");
console.log(combineNames);
