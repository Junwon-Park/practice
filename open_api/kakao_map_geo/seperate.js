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
let convertedDataRows = convertedData.toString().split("\n").slice(1);
// console.log(convertedDataRows);

// 데이터를 100000개 씩 자르는 함수
const seperate10ThousandData = (rows) => {
  let fileCount = Math.ceil(rows.length / 50000);
  let remainData;
  let seperatedData;

  // Base Case
  if (fileCount === 0) {
    console.log("Base Case!!!", rows.length);
    return;
  }

  if (rows.length >= 50000) {
    seperatedData = rows.slice(0, 50000);
    console.log(seperatedData.length);
    remainData = rows.slice(50000);
    console.log("DATA!!!", remainData.length);
    seperate10ThousandData(remainData);
  } else if (rows.length < 50000) {
    seperatedData = rows.slice(0, rows.length);
    remainData = rows.slice(rows.length);
    seperate10ThousandData(remainData);
  }
  console.log(`${writeCsvPath}${fileCount}.csv`);
  //   console.log(...seperatedData);
  fs.writeFile(
    `${writeCsvPath}${fileCount}.csv`,
    convertedDataCol.concat(seperatedData),
    (err, result) => {
      if (err) console.log("error", err);
      else console.log(result);
    }
  );
};

seperate10ThousandData(convertedDataRows);
