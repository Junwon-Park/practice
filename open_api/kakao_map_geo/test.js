const axios = require("axios");

const kakaoGeoAPI = async (adrs) => {
  const res = await axios
    .get(`http://dapi.kakao.com/v2/local/search/address.json?query=${adrs}`, {
      headers: { Authorization: `KakaoAK 32d86861ec9df0a7532e251f69b0e716` },
    })
    .catch((err) => console.error(err));
  console.count("kakaoGeoAPI");
  console.log(res.data.documents);
  if (res.data.documents.length === 0) {
    return { geoX: -1, geoY: -1 };
  }
  const geoX = res.data.documents[0].address.x.slice(0, 11);
  const geoY = res.data.documents[0].address.y.slice(0, 10);
  console.log("X : ", geoX);
  console.log("Y : ", geoY);
  return { geoX, geoY };
};
kakaoGeoAPI(
  "%EC%B6%A9%EC%B2%AD%EB%82%A8%EB%8F%84%20%EC%98%88%EC%82%B0%EA%B5%B0%20%EC%98%A4%EA%B0%80%EB%A9%B4%20%EB%82%B4%EB%9F%89%EB%A6%AC%2036-31"
);
