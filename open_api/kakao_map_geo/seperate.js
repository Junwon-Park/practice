const fs = require("fs");
const path = require("path");

let readFILE_NAME = `Yesan.csv`;
let writeFILE_NAME = `seperateFile${readFILE_NAME.slice(0, 5)}`;
console.log(writeFILE_NAME);
const readCsvPath = path.join(__dirname, "sourceData", readFILE_NAME);
// console.log(readCsvPath);
const writeCsvPath = path.join(__dirname, "seperatedData", writeFILE_NAME);
console.log(writeCsvPath);
const convertedData = fs.readFileSync(readCsvPath);
// console.log(convertedData.toString());
let convertedDataCol = convertedData.toString().split("\n")[0];
let convertedDataRows = convertedData.toString().split("\r").slice(1);
//? \n을 기준으로 split 하면 ","가 다음 row의 0번째 인덱스에 붙음
//? \r을 기준으로 split 해서 해결
// console.log(convertedDataRows);
const seperateCount = 100000;

// 데이터를 자르는 함수(재귀)
const seperateData = (rows) => {
  let fileCount = Math.ceil(rows.length / seperateCount);
  let remainData;
  let seperatedData;

  // Base Case
  if (fileCount === 0) {
    return;
  }

  if (rows.length >= seperateCount) {
    // rows의 길이가 seperateCount 이상일 때
    seperatedData = rows.slice(0, seperateCount);
    remainData = rows.slice(seperateCount);
    seperateData(remainData);
  } else if (rows.length < seperateCount) {
    // rows의 길이가 seperateCount 미만일 때
    seperatedData = rows.slice(0, rows.length);
    remainData = rows.slice(rows.length);
    seperateData(remainData);
  }
  console.log(`${writeCsvPath}${fileCount}.csv`);
  fs.writeFile(
    `${writeCsvPath}${fileCount}.csv`,
    convertedDataCol.concat(seperatedData),
    (err) => {
      if (err) console.log("error", err);
    }
  );
};

seperateData(convertedDataRows);
