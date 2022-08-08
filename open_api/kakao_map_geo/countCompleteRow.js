const fs = require("fs");
const fileList = fs.readdirSync(__dirname + "/concatenatedData");

let rowList = [];

for (let i = 0; i < fileList.length; i++) {
  let rows = fs
    .readFileSync(__dirname + "/concatenatedData/" + fileList[i])
    .toString()
    .split("\n");

  let missingValue = [];

  rows.slice(1).forEach((el) => {
    if (el.split(",")[0] === "-1") missingValue.push(el);
  });

  rowList.push({
    fileName: fileList[i],
    total: rows.length - 1,
    missingValue: missingValue.length,
    effectiveValue: rows.slice(1).length - missingValue.length,
    ratio: Number(
      (missingValue.length / (rows.length - 1)).toString().slice(0, 9)
    ),
  });
}

console.log(rowList);
