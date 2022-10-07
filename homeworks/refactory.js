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
  let result = "";

  for (let i = num; i > 1; i--) {
    result += `${getStar(i)}\n`;
  }
  result += `${getStar(1)}`;

  return result;
};

/**입력받은 숫자만큼 크기의 이등변 삼각형 출력 */
const getIsoscelesTriangle = (num) => {
  let result = "";
  let startCount = 1;

  for (let i = num - 1; i >= 0; i--) {
    result += `${getSpace(i)}${getStar(startCount)}`;
    if (i > 0) result += "\n"; // else문이 없어도 된다.
    startCount += 2;
  }

  return result;
};

/**다이아몬드 출력 */
const getDiamond = (num) => {
  const loopCount = num - Math.ceil(num / 2);
  let spaceCount = 1;
  let startCount = Math.ceil(num) - 2;
  let result = `${getIsoscelesTriangle(Math.ceil(num / 2))}\n`;

  for (let i = 0; i < loopCount; i++) {
    result += `${getSpace(spaceCount)}${getStar(startCount)}`;
    if (i < loopCount - 1) result += "\n";
    startCount -= 2;
    spaceCount++;
  }

  return result;
};

/**입력받은 숫자만큼의 크기의 별을 입력받은 숫자 만큼의 개수만큼 가로, 세로 출력 */
const getHexagram = (num, n) => {
  const tTurn = (num - 1) / 2; // 헤드, 테일 부분 전환 규칙
  const bTurn = (num - 1) / 2 + 2; // 바디 부분 전환 규칙
  let tSpaceCount = tTurn; // 헤드, 테일 공백 개수
  let triangleCount = 1; // 헤드, 테일 별 개수
  let bodyCount = num; // 바디 별 개수
  let bSpaceCount = 0; // 바디 공백 개수
  let triOrBody = 0; // 0 triangle, 1 body
  let bodyTurn = 0; // 0 bodyCount down, 1 bodyCount up
  let triangle = 0; // 0 head, 1 tail
  let result = "";

  for (let i = 0; i < num; i++) {
    if (triOrBody === 0 && triangle === 0) {
      // 헤드 첫 부분 부터 시작되는 부분
      result +=
        `${" ".repeat(tSpaceCount)}${"*".repeat(triangleCount)}${" ".repeat(
          tSpaceCount
        )}`.repeat(n) + "\n";
      tSpaceCount--;
      triangleCount += 2;
    } else if (triOrBody === 1 && triangle === 0) {
      // 바디 첫 부분 시작되는 부분
      if (bodyTurn === 0) {
        // 바디 상부, 하부 전환 여부 -> 상부
        result +=
          `${" ".repeat(bSpaceCount)}${"*".repeat(bodyCount)}${" ".repeat(
            bSpaceCount
          )}`.repeat(n) + "\n";
        bSpaceCount++;
        bodyCount -= 2;
      } else {
        // 바디 하부
        result +=
          `${" ".repeat(bSpaceCount)}${"*".repeat(bodyCount)}${" ".repeat(
            bSpaceCount
          )}`.repeat(n) + "\n";
        bSpaceCount--;
        bodyCount += 2;
      }
      if (bodyCount === bTurn) {
        // 바디 부분의 현재 별 개수가 바디 전환 규칙과 일치하는 경우 바디 하부로 전환하는 부분
        result +=
          `${" ".repeat(bSpaceCount)}${"*".repeat(bodyCount)}${" ".repeat(
            bSpaceCount
          )}`.repeat(n) + "\n";
        bodyTurn = 1;
        bSpaceCount--;
        bodyCount += 2;
      }
    }
    if (triOrBody === 0 && triangleCount === tTurn) {
      // 헤드 부분의 별 개수가 헤드 부분 전환 규칙과 일치하는 경우 바디로 전환하는 부분
      result +=
        `${" ".repeat(tSpaceCount)}${"*".repeat(triangleCount)}${" ".repeat(
          tSpaceCount
        )}`.repeat(n) + "\n";
      triOrBody = 1;
    }
    if (bodyTurn === 1 && bodyCount === num) {
      // 바디 하부 진행 중이고 바디 부분의 별 개수가 입력 값과 같은 경우 테일 부분으로 전환하는 부분
      result +=
        `${" ".repeat(bSpaceCount)}${"*".repeat(bodyCount)}${" ".repeat(
          bSpaceCount
        )}`.repeat(n) + "\n";
      triOrBody = 0;
      triangle = 1;
      bodyTurn = 0;
    }
    if (triangle === 1) {
      // 테일 작업하는 부분
      result +=
        `${" ".repeat(tSpaceCount)}${"*".repeat(triangleCount)}${" ".repeat(
          tSpaceCount
        )}`.repeat(n) + "\n";
      tSpaceCount++;
      triangleCount -= 2;
    }
    if (triangleCount < 0) break; // 마지막에 테일 부분에서 별 개수가 2씩 줄어들기 때문에 마지막에 -1이 되는 것 방지
  }
  const resultRow = result.slice(0, -1); // 마지막에 개행문자 제거하는 부분
  let resultCol = "";

  for (let j = 0; j < n; j++) {
    // 세로로 붙이는 부분
    resultCol += resultRow + "\n";
  }

  return resultCol;
};
console.log(getHexagram(7, 3));
console.log(getHexagram(11, 5));

module.exports = {
  getStar,
  getTriangle,
  getInvertedTriangle,
  getIsoscelesTriangle,
  getDiamond,
  getHexagram,
};
