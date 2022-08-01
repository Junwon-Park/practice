const axios = require("axios");
const Iconv = require("iconv").Iconv;
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// File 관련 변수 / File 형식 변환
let readFILE_NAME = `dataset5000line.csv`;
let writeFILE_NAME = `newDataset5000line.csv`;
let seperateFILE_NAME = "seperatedFile";
const readCsvPath = path.join(__dirname, "sourceData", readFILE_NAME);
const writeCsvPath = path.join(__dirname, "resultData", writeFILE_NAME);
const seperateFilePath = path.join(
  __dirname,
  "seperateData",
  seperateFILE_NAME
);
const encodeUTF16to8 = new Iconv("utf-16", "utf-8"); // utf16을 utf8로 변환하는 encoder
const csvFileUtf16 = fs.readFileSync(readCsvPath); // 변환할 utf16 File 불러오기
const csvFileUtf8 = encodeUTF16to8.convert(csvFileUtf16); // 위에서 불러온 encoder 사용해서 utf16 -> utf8(Buffer)로 변환
const utf8Text = csvFileUtf8.toString("utf-8"); // Buffer를 utf8로 변환

// File 내용을 Column과 Row로 분리
let csvCol = utf8Text.split("\n")[0]; // Column 부분 추출
let csvRow = utf8Text.split("\n").slice(1); // Row(Data) 부분 추출

//? NodeJS의 fs모듈의 readFileSync는 utf-8 Encoding을 지원하지 않는다. -> 그래서 파일 불러온 후 Iconv 모듈 사용
// const readCSVFile = fs.readFileSync(readCsvPath, 'utf-8');
// console.log(readCSVFile);

// Kakao API 호출, 위도/경도 부분 추출 함수
const kakaoGeoAPI = async (adrs) => {
  const res = await axios
    .get(`http://dapi.kakao.com/v2/local/search/address.json?query=${adrs}`, {
      headers: { Authorization: process.env.KAKAO_API_KEY_1 },
    })
    .catch((err) => console.error(err));

  console.count("kakaoGeoAPI"); // 요청 횟수 count

  if (res.data.documents.length === 0) {
    // 데이터의 결측치 예외 처리(Kakao Local API 요청 시, 주소에 대한 정보가 없어 빈 배열로 응답이 오는 경우)
    return { geoX: -1, geoY: -1 };
  }

  // 좌표 - 소수점 7자리 까지 끊어야 한다.
  const geoX = res.data.documents[0].address.x.slice(0, 11);
  const geoY = res.data.documents[0].address.y.slice(0, 10);
  console.log("X : ", geoX);
  console.log("Y : ", geoY);

  return { geoX, geoY };
};

// kakaoGeoAPI(address);

// 읽어온 CSV File의 컬럼에 좌표 컬럼을 추가하는 함수
const addGeoCol = async (col) => {
  //? async/await이 아닌 일반함수로 실행 시, geo가 Promise{<Pending>} 상태로 출력
  let newCol = "GeoX," + "GeoY," + " " + col;

  return newCol;
};

// 기존의 Row들에 좌표 정보를 추가하는 함수
const addGeoData = async (geo, row) => {
  const Geo = await geo;
  const x = Geo.geoX;
  const y = Geo.geoY;

  let newRow = `${x},${y},` + row; // 각각의 Row에 좌표 데이터 추가
  console.log(newRow);

  return newRow;
};

// 위에서 분리하고 각각 데이터 처리한 Column과 Row들을 하나의 데이터로 가공하여 반환하는 함수
const concatData = async (col, rows) => {
  //? 인자로 받은 col과 rows 모두 비동기 함수로 부터 받은 반환 값이기 때문에 await으로 받아 변수에 할당 후 사용해야 한다.
  let c = await col;
  let r = await rows;
  let result = [c].concat(r);

  return result;
};

let finalCol = addGeoCol(csvCol); // 좌표 컬럼 추가

const returnFinalData = async () => {
  // 아래 비동기 함수인 addGeoData와 kakaoGeoAPI를 호출해서 그 결과 값을 받아서 다음을 처리하기 위한 async 함수
  // async 함수를 선언해서 그 내부에서 비동기 함수를 awiat으로 처리한다.
  //? 그렇지 않으면 kakaoGeoAPI 처리 중 429 Too Many Requests 응답이 오는데, 원인은 정확히 모르겠으나 비동기로 처리하니 잘 동작한다.
  let finalData = [];

  for (let i = 0; i < csvRow.length - 1; i++) {
    // Source Data의 주소지와 지번 부분을 결합해서 하나의 주소로 만들어서 한글 주소이기 때문에 encodeURI 메서드로 인코딩하여 대입한다.
    finalData.push(
      await addGeoData(
        kakaoGeoAPI(
          encodeURI(`${csvRow[i].split(",")[3]} ${csvRow[i].split(",")[4]}`)
        ),
        csvRow[i]
      )
    ); // 데이터에 좌표 데이터 추가
  }

  return finalData; // 좌표 정보가 추가된 최종 데이터 반환
};

// 최종 가공된 데이터의 Column과 Row들을 concat해서 줄 바꿈('\n') 단위로 join 하여 CSV 파일을 생성하는 async/await 함수
const writeCsvFile = async () => {
  const resultData = await concatData(finalCol, returnFinalData()).catch(
    (err) => console.error(err)
  );
  const result = resultData.join("\n");
  fs.writeFileSync(writeCsvPath, result);
};

writeCsvFile(); // 최종 CSV 파일 생성하는 함수 호출

// 아래 Promise.resolve 부분 writeCsvFile async / await 함수로 대체
// Promise.resolve(concatData(finalCol, returnFinalData()))
//   .then((res) => {
//     // concatData(finalCol, finalData)의 반환 값이 Promise{<Pending>}으로 나와서 Promise.resolve 사용
//     const result = res.join("\n"); // 배열 형태인 Column과 각 Row들을 줄바꿈 기준으로 Join
//     fs.writeFileSync(writeCsvPath, result); // File로 내려받는다.
//   })
//   .catch((err) => console.error(err));
