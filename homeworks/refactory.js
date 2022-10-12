Array.prototype.repeat = function (n) {
  const result = [];
  for (let i = 0; i < n; i++) this.forEach((item) => result.push(item));
  return result;
};

const repeat = (lines, col, row) => {
  return lines.map((line) => line.repeat(col)).repeat(row);
};

const formatPlainText = (lines) => lines.join("\n");

const formatHtml = (lines) => lines.join("<br>"); // html용

/**가로로 별 출력 from, to: 별의 개수 시작과 끝, step: 별 증가 개수, type: 정렬 타입, space: 출력할 공백의 수*/
const getStar = (from, to, step, type, space) => {
  const result = [];

  const loopCount = Math.abs(from - to) / step + 1;
  const stepForStar = from > to ? -step : step;
  const stepForSpace = from > to ? 1 : -1;

  let starCount = from;
  let spaceCount = space;

  if (from === to) return ["*".repeat(starCount)];

  if (type === "left") {
    for (let i = 0; i < loopCount; i++) {
      result.push("*".repeat(starCount));
      starCount += stepForStar;
    }
  } else if (type === "center") {
    for (let i = 0; i < loopCount; i++) {
      result.push(
        `${" ".repeat(spaceCount)}${"*".repeat(starCount)}${" ".repeat(
          spaceCount
        )}`
      );
      starCount += stepForStar;
      spaceCount += stepForSpace;
    }
  }

  return result;
};
console.log(formatPlainText(repeat(getStar(4, 4, 0, "left", 0), 4, 5)));

/**입력받은 숫자만큼 크기의 삼각형 출력 */
const getTriangle = (num) => {
  return getStar(1, num, 1, "left", 0);
};
console.log(formatPlainText(repeat(getTriangle(11), 5, 3)));

/**입력받은 숫자만큼 크기의 역삼각형 출력 */
const getInvertedTriangle = (num) => {
  return getStar(num, 1, 1, "left", 0);
};
console.log(formatPlainText(repeat(getInvertedTriangle(11), 4, 2)));

/**입력받은 숫자만큼 크기의 이등변 삼각형 출력 */
const getIsoscelesTriangle = (num) => {
  const endLineRule = num + (num - 1);
  const spaceRule = num - 1;

  return getStar(1, endLineRule, 2, "center", spaceRule, 1);
};
console.log(formatPlainText(repeat(getIsoscelesTriangle(11), 8, 2)));

/**다이아몬드 출력 */
const getDiamond = (num) => {
  const topSpaceRule = Math.floor(num / 2);
  const bottomStarRule = num - 2;

  const result = [
    ...getStar(1, num, 2, "center", topSpaceRule, 1), // Top
    ...getStar(bottomStarRule, 1, 2, "center", 1, 1), // Bottom
  ];

  return result;
};
console.log(formatPlainText(repeat(getDiamond(11), 5, 3)));

/**입력받은 숫자만큼의 크기의 별을 입력받은 숫자 만큼의 개수만큼 가로, 세로 출력 */
const getHexagram = (num) => {
  const triangleRule = (num - 1) / 2;
  const bodyTopEndLineRule = (num - 1) / 2 + 2;
  const bodyBottomStartLineRule = (num - 1) / 2 + 2 + 2;

  // 별 만드는 부분
  // Head 만들기 규칙: num / 2의 결과에 반내림 후 2로 나눈 값을 반올림
  const result = [
    ...getStar(1, triangleRule, 2, "center", (num - 1) / 2), // Head triangle
    ...getStar(num, bodyTopEndLineRule, 2, "center", 0), // Body top
    ...getStar(bodyBottomStartLineRule, num, 2, "center", 1), // Body bottom
    ...getStar(triangleRule, 1, 2, "center", Math.ceil((num - 1) / 2 / 2)), // Tail triangle
  ];

  return result;
};

console.log(formatPlainText(repeat(getHexagram(7), 3, 3)));
console.log(format(repeat(getHexagram(11), 5, 10)));

module.exports = {
  getStar,
  getTriangle,
  getInvertedTriangle,
  getIsoscelesTriangle,
  getDiamond,
  getHexagram,
};
