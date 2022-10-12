/**가로로 별 출력 from, to: 별의 개수 시작과 끝, step: 별 증가 개수, type: 정렬 타입, space: 출력할 공백의 수*/
const getStar = (from, to, step, type, space) => {
  const result = [];
  let starCount = from;
  let spaceCount = space;
  let loop = true;

  if (from === to) return `${"*".repeat(starCount)}`;

  if (type === "left") {
    while (loop) {
      result.push("*".repeat(starCount));
      if (from < to) {
        starCount += step;
        loop = starCount <= to;
      } else if (from > to) {
        starCount -= step;
        loop = starCount >= to;
      }
    }
  }
  if (type === "center") {
    while (loop) {
      result.push(
        `${" ".repeat(spaceCount)}${"*".repeat(starCount)}${" ".repeat(
          spaceCount
        )}`
      );
      if (from < to) {
        starCount += step;
        spaceCount--;
        loop = starCount <= to;
      } else if (from > to) {
        starCount -= step;
        spaceCount++;
        loop = starCount >= to;
      }
    }
  }

  return result.join("\n");
};

/**입력받은 숫자만큼 크기의 삼각형 출력 */
const getTriangle = (num) => {
  return getStar(1, num, 1, "left", 0);
};

/**입력받은 숫자만큼 크기의 역삼각형 출력 */
const getInvertedTriangle = (num) => {
  return getStar(num, 1, 1, "left", 0);
};

/**입력받은 숫자만큼 크기의 이등변 삼각형 출력 */
const getIsoscelesTriangle = (num) => {
  const endLineRule = num + (num - 1);
  const spaceRule = num - 1;

  return getStar(1, endLineRule, 2, "center", spaceRule, 1);
};

/**다이아몬드 출력 */
const getDiamond = (num) => {
  const result = [];
  const topSpaceRule = Math.floor(num / 2);
  const bottomStarRule = num - 2;

  result.push(getStar(1, num, 2, "center", topSpaceRule, 1)); // Top
  result.push(getStar(bottomStarRule, 1, 2, "center", 1, 1)); // Bottom

  return result.join("\n");
};

/**입력받은 숫자만큼의 크기의 별을 입력받은 숫자 만큼의 개수만큼 가로, 세로 출력 */
const getHexagram = (num, row, col) => {
  const star = [];
  const rows = [];
  const triangleRule = (num - 1) / 2;
  const bodyTopEndLineRule = (num - 1) / 2 + 2;
  const bodyBottomStartLineRule = (num - 1) / 2 + 2 + 2;
  let result;

  // 별 만드는 부분
  // Head 만들기 규칙: num / 2의 결과에 반내림 후 2로 나눈 값을 반올림
  star.push(getStar(1, triangleRule, 2, "center", (num - 1) / 2)); // Head triangle
  star.push(getStar(num, bodyTopEndLineRule, 2, "center", 0)); // Body top
  star.push(getStar(bodyBottomStartLineRule, num, 2, "center", 1)); // Body bottom
  star.push(
    getStar(triangleRule, 1, 2, "center", Math.ceil((num - 1) / 2 / 2))
  ); // Tail triangle

  // 별 가로로 붙이는 부분
  let cols;

  if (col) {
    // col === Truthy
    cols = star.map((partOfHexagram) => {
      const partsOfHexagram = [];

      partOfHexagram
        .split("\n")
        .forEach((line) => partsOfHexagram.push(line.repeat(col)));

      return partsOfHexagram.join("\n");
    });
  }

  // 별 세로로 붙이는 부분
  if (row) {
    // row === Truthy
    for (let i = 0; i < row; i++) {
      rows.push(cols.join("\n"));
    }
    result = rows;
  }

  return result.join("\n");
};

console.log(getHexagram(7, 5, 10));
console.log(getHexagram(11, 5, 10));

module.exports = {
  getStar,
  getTriangle,
  getInvertedTriangle,
  getIsoscelesTriangle,
  getDiamond,
  getHexagram,
};
