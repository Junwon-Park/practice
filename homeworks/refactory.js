/**가로로 별 출력 num: 별의 개수(Hexagram에서는 입력 숫자), space: 공백 개수, direction: 별의 정렬 방향*/
const getStar = (from, to, step, type, space, row) => {
  let result = [];
  let starCount = from;
  let spaceCount = space;

  if (from === to) return `${"*".repeat(starCount)}`.repeat(row);

  if (type === "left" && from < to) {
    while (starCount <= to) {
      result.push("*".repeat(starCount));
      starCount += step;
    }
  }
  if (type === "left" && from > to) {
    while (starCount >= to) {
      result.push("*".repeat(starCount));
      starCount -= step;
    }
  } else if (type === "center" && from < to) {
    while (starCount <= to) {
      result.push(
        `${" ".repeat(spaceCount)}${"*".repeat(starCount)}${" ".repeat(
          spaceCount
        )}`.repeat(row)
      );
      starCount += step;
      spaceCount--;
    }
  } else if (type === "center" && from > to) {
    while (starCount >= to) {
      result.push(
        `${" ".repeat(spaceCount)}${"*".repeat(starCount)}${" ".repeat(
          spaceCount
        )}`.repeat(row)
      );
      starCount -= step;
      spaceCount++;
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
  return getStar(1, num + (num - 1), 2, "center", num - 1, 1);
};

/**다이아몬드 출력 */
const getDiamond = (num) => {
  let result = [getStar(1, num, 2, "center", Math.floor(num / 2), 1)]; // Top

  result.push(getStar(num - 2, 1, 2, "center", 1, 1)); // Bottom

  return result.join("\n");
};

/**입력받은 숫자만큼의 크기의 별을 입력받은 숫자 만큼의 개수만큼 가로, 세로 출력 */
const getHexagram = (num, n, col) => {
  const star = [];
  const row = [];
  let result;

  // 별 만드는 부분
  // Head 만들기 규칙: num / 2의 결과에 반내림 후 2로 나눈 값을 반올림
  star.push(getStar(1, (num - 1) / 2, 2, "center", (num - 1) / 2, n)); // Head
  star.push(getStar(num, (num - 1) / 2 + 2, 2, "center", 0, n)); // Body top
  star.push(getStar((num - 1) / 2 + 2 + 2, num, 2, "center", 1, n)); // Body bottom
  star.push(
    getStar((num - 1) / 2, 1, 2, "center", Math.ceil((num - 1) / 2 / 2), n)
  ); // Tail

  // 별 세로로 붙이는 부분
  if (col) {
    // col === Truthy
    for (let i = 0; i < col; i++) {
      row.push(star.join("\n"));
    }
    result = row;
  }

  return result.join("\n");
};

console.log(getHexagram(7, 10, 3));
console.log(getHexagram(11, 10, 4));

module.exports = {
  getStar,
  getTriangle,
  getInvertedTriangle,
  getIsoscelesTriangle,
  getDiamond,
  getHexagram,
};
