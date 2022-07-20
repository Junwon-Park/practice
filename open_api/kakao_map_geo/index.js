const axios = require('axios');
let address = encodeURI('경기도 용인시 기흥구 보정동');
require("dotenv").config();

axios.get(`http://dapi.kakao.com/v2/local/search/address.json?query=${address}`, {
    headers: {Authorization: process.env.KAKAO_API_KEY},
}).then(res => {
    console.log(res.data.documents[0].address);
    const geoX = res.data.documents[0].address.x;
    const geoY = res.data.documents[0].address.y;
    console.log('X : ', geoX);
    console.log('Y : ', geoY);
})