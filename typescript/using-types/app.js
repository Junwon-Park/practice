var add = function (n1, n2) {
    return n1 + n2;
};
var printResult = function (num) {
    console.log("Result: " + num);
};
printResult(add(5, 12));
// const addAndHandler = (n1: number, n2: number, cb: (num: number) => number) => {
//   const result = n1 + n2;
//   return cb(result);
// };
// const resultValue = addAndHandler(10, 60, (num) => {
//   console.log(num);
//   return num;
// });
// console.log(resultValue);
var addAndHandler = function (n1, n2, cb) {
    var result = n1 + n2;
    return cb(result);
};
var resultValue = addAndHandler(10, 50, function (num) {
    console.log(num);
    return num.toString();
});
console.log(resultValue);
// const addAndHandler = (n1: number, n2: number, cb: (num: number) => void) => {
//   const result = n1 + n2;
//   return cb(result);
// };
// const resultValue = addAndHandler(10, 60, (num) => {
//   console.log(num);
//   return num.toString();
// });
// console.log(resultValue);
