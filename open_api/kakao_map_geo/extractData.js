const fs = require("fs");
const path = require("path");

originalFileName = "AL_44_D003_20220702.csv";
const originalData = fs.readFileSync(
  __dirname + `/original/${originalFileName}`
);
// iconv 사용 예제
const Iconv = require("iconv").Iconv;
// euc-kr을 utf-8로 변환 설정
const encoderUTF8 = new Iconv("euc-kr", "utf-8");
const encodedData = encoderUTF8.convert(originalData);

let writeFILE_NAME = `Boryeong.csv`;
const writeCsvPath = path.join(__dirname, "sourceData", writeFILE_NAME);

// console.log(encodedData.toString().split("\n")[0]);
const encodedDataCol = encodedData.toString().split("\n")[0];
const encodedDataRows = encodedData.toString().split("\r").slice(1); // \r을 기준으로 해야 ","가 row의 마지막에 찍혀 나옴
console.log(encodedDataRows);

const localName = "보령";
let boryeong = [];

for (let i = 0; i < encodedDataRows.length; i++) {
  console.count("Count");
  let row = encodedDataRows[i].split(",")[2];
  //   console.log(typeof row);
  console.log(row);
  try {
    if (row.includes(localName)) {
      if (
        row.includes(localName) &&
        !encodedDataRows[i + 1].split(",")[2].includes(localName)
      ) {
        boryeong.push(encodedDataRows[i].slice(0, encodedDataRows.length));
        console.log("Break!!!");
        break;
      } else {
        boryeong.push(encodedDataRows[i].slice(0, encodedDataRows.length));
        console.log("보령!!!");
      }
    }
  } catch (err) {
    console.log("에러!!!!!!!", row.slice(0, 10));
    console.error(err);
  }
}
console.log("보령!!!!", boryeong.slice(0, 10));

const boryeongExtractedData = boryeong.join("\r");
const concatColAndRows = encodedDataCol.concat(boryeongExtractedData);

fs.writeFileSync(writeCsvPath, concatColAndRows);
