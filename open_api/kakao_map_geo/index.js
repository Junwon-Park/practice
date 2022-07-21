const axios = require('axios');
const Iconv = require('iconv').Iconv;
const fs = require('fs');
const path = require('path');
require("dotenv").config();

// Kakao API address 변수
let address = encodeURI('경기도 용인시 기흥구 보정동'); //? URI의 쿼리에 들어갈 문자열이 한글인 경우 API 요청 시 서버에서 인식하지 못해 에러가 나는 경우가 있다. 이럴 땐, Encoding이 필요하다.
let readFILE_NAME = `dataset5000line.csv`;
let writeFILE_NAME = `newDataset5000line.csv`;
const readCsvPath = path.join(__dirname, 'sourceData', readFILE_NAME);
const writeCsvPath = path.join(__dirname, 'resultData', writeFILE_NAME);
const encodeUTF16to8 = new Iconv('utf-16', 'utf-8'); // utf16을 utf8로 변환하는 encoder
const csvFileUtf16 = fs.readFileSync(readCsvPath); // 변환할 utf16 File 불러오기
const csvFileUtf8 = encodeUTF16to8.convert(csvFileUtf16); // 위에서 불러온 encoder 사용해서 utf16 -> utf8(Buffer)로 변환
const utf8Text = csvFileUtf8.toString('utf-8'); // Buffer를 utf8로 변환
let csvCol = utf8Text.split('\n')[0];
let csvRow = utf8Text.split('\n').slice(1);

console.log(`${csvRow[0].split(',')[3]} ${csvRow[0].split(',')[4]}`);


//? NodeJS의 fs모듈의 readFileSync는 utf-8 Encoding을 지원하지 않는다.
// const readCSVFile = fs.readFileSync(readCsvPath, 'utf-8');
// console.log(readCSVFile);

// Kakao API 호출, 위도/경도 부분 추출 함수
const kakaoGeoAPI = async (adrs) => {
    const res = await axios.get(`http://dapi.kakao.com/v2/local/search/address.json?query=${adrs}`, {
        headers: {Authorization: process.env.KAKAO_API_KEY},
    }).catch(err => console.error(err));
    // 좌표 - 소수점 7자리 까지 끊어야 한다.
    console.log(res);
    const geoX = res.data.documents[0].address.x.slice(0, 11);
    const geoY = res.data.documents[0].address.y.slice(0, 10);
    console.log('X : ', geoX);
    console.log('Y : ', geoY);
    return {geoX, geoY};
}

// 읽어온 CSV File의 컬럼에 좌표 컬럼 추가
const addGeoCol = async (col) => { //? async/await이 아닌 일반함수로 실행 시, geo가 Promise{<Pending>} 상태로 출력
    let newCol = 'GeoX,' + 'GeoY,' + ' ' + col;
    
    return newCol;
}

const addGeoData = async (geo, rows) => {
    const Geo = await geo;
    const x = Geo.geoX;
    const y = Geo.geoY;
    let newData = [];

    for(let i = 0; i < rows.length-1; i++) {
        let newRow =`${x},${y},` + rows[i];
        newData.push(newRow);
    }
    return newData;
}

const concatData = async (col, rows) => {
    let c = await col;
    let r = await rows;
    let result = [c].concat(r);
    return result;
}

let finalData;
let finalCol = addGeoCol(csvCol); // 좌표 컬럼 추가

for(let i = 0; i < csvRow.length; i++) {
    finalData = addGeoData(kakaoGeoAPI(encodeURI(`${csvRow[i].split(',')[3]} ${csvRow[i].split(',')[4]}`)), csvRow); // 데이터에 좌표 데이터 추가
}

Promise.resolve(concatData(finalCol, finalData)).then(res => { // concatData(finalCol, finalData)의 반환 값이 Promise{<Pending>}으로 나와서 Promise.resolve 사용
    const result = res.join('\n');
    fs.writeFileSync(writeCsvPath, result);
}).catch(err => console.error(err));
