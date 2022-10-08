/**가로로 별 출력 */
const getStar = (num) => "*".repeat(num);

/**가로로 공백 출력 */
const getSpace = (num) => " ".repeat(num);

/**입력받은 숫자만큼 크기의 삼각형 출력 */
const getTriangle = (num) => {
  let lines = [];

  for (let i = 1; i <= num; i++) {
    lines.push(getStar(i));
  }

  return lines.join("\n");
};

/**입력받은 숫자만큼 크기의 역삼각형 출력 */
const getInvertedTriangle = (num) => {
  let result = [];

  for (let i = num; i > 0; i--) {
    result.push(`${getStar(i)}`);
  }

  return result.join("\n");
};

/**입력받은 숫자만큼 크기의 이등변 삼각형 출력 */
const getIsoscelesTriangle = (num, what, n) => {
  // what은 헥사그램 때 사용
  const result = [];
  let startCount = 1;

  if (what === "star") {
    for (let i = num - 1; i >= 0; i--) {
      result.push(
        `${getSpace(i + num)}${getStar(startCount)}${getSpace(i + num)}`.repeat(
          n
        )
      );
      startCount += 2;
    }
  } else {
    for (let i = num - 1; i >= 0; i--) {
      result.push(`${getSpace(i)}${getStar(startCount)}`.repeat(n));
      startCount += 2;
    }
  }

  return result.join("\n");
};

/**다이아몬드 출력 */
const getDiamond = (num) => {
  const loopCount = num - Math.ceil(num / 2);
  let spaceCount = 1;
  let startCount = Math.ceil(num) - 2;
  let result = [getIsoscelesTriangle(Math.ceil(num / 2), "", 1)];

  for (let i = 0; i < loopCount; i++) {
    result.push(`${getSpace(spaceCount)}${getStar(startCount)}`);
    startCount -= 2;
    spaceCount++;
  }

  return result.join("\n");
};

// 별 출력하기

/**별의 Body 생성 함수 */
const makeBodyOfStar = (num, n) => {
  let starCount = num;
  let spaceCount = 0;
  let isBodyTop = true;
  let result = [];

  for (let i = 0; i < (num - 1) / 2; i++) {
    if (isBodyTop) {
      result.push(
        `${getSpace(spaceCount)}${getStar(starCount)}${getSpace(
          spaceCount
        )}`.repeat(n)
      );
      spaceCount++;
      starCount -= 2;
    } else {
      result.push(
        `${getSpace(spaceCount)}${getStar(starCount)}${getSpace(
          spaceCount
        )}`.repeat(n)
      );
      spaceCount--;
      starCount += 2;
    }
    if (starCount === (num - 1) / 2 + 2) isBodyTop = false; // Turnning Point
  }

  return result.join("\n");
};

/**별의 Tail 생성 함수 */
const makeTailOfStar = (num, n) => {
  let startCount = (num - 1) / 2;
  let spaceCount = Math.ceil((num - 1) / 2 / 2);
  const result = [];

  for (let i = 0; i < Math.ceil((num - 1) / 2 / 2); i++) {
    result.push(
      `${getSpace(spaceCount)}${getStar(startCount)}${getSpace(
        spaceCount
      )}`.repeat(n)
    );
    startCount -= 2;
    spaceCount++;
  }
  return result.join("\n");
};

/**입력받은 숫자만큼의 크기의 별을 입력받은 숫자 만큼의 개수만큼 가로, 세로 출력 */
const getHexagram = (num, n, m) => {
  const star = [];
  const row = [];
  let result;

  // 별 만드는 부분
  // Head 만들기 규칙: num / 2의 결과에 반내림 후 2로 나눈 값을 반올림
  star.push(
    getIsoscelesTriangle(Math.ceil(Math.floor(num / 2) / 2), "star", n)
  ); // Head
  star.push(makeBodyOfStar(num, n)); // Body
  star.push(makeTailOfStar(num, n)); // Tail

  // 별 세로로 붙이는 부분
  if (m) {
    // m === Truthy
    for (let i = 0; i < m; i++) {
      row.push(star.join("\n"));
    }
    result = row;
  }

  return result.join("\n");
};

console.log(getHexagram(7, 3, 2));
console.log(getHexagram(11, 5, 4));

module.exports = {
  getStar,
  getTriangle,
  getInvertedTriangle,
  getIsoscelesTriangle,
  getDiamond,
  getHexagram,
};
