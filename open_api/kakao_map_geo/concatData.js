const fs = require("fs");
const path = require("path");
const dir = "resultData";

const files = fs.readdirSync(dir); // 디렉토리를 읽어온다
const writeFILE_NAME = "Boryeong.csv";
const writeCsvPath = path.join(__dirname, "concatenatedData", writeFILE_NAME);

const concatData = (fileList, writePath) => {
  // 결합할 파일들의 이름 목록(확장자 포함) 배열을 인자로 받는다.
  let dataList = [];
  console.log(fileList);

  for (let i = 0; i < fileList.length; i++) {
    const readCsvPath = path.join(__dirname, "resultData", fileList[i]);
    const readFile = fs.readFileSync(readCsvPath);
    if (i === 0) dataList.push(readFile);
    else dataList.push(readFile.toString().split("\r").slice(1));
  }

  let result = dataList.join("\n");

  fs.writeFileSync(writePath, result);
};

concatData(files, writeCsvPath);
