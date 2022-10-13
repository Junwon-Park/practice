/**가로로 별 출력 */
const getStar = (num) => {
  let result;

  result = "*".repeat(num);

  return result;
};

/**입력받은 숫자만큼 크기의 삼각형 출력 */
const getTriangle = (num) => {
  let result = "";

  for (let i = 0; i < num - 1; i++) {
    result += `${"*".repeat(i + 1)}\n`;
  }
  result += `${"*".repeat(num)}`;

  return result;
};

/**입력받은 숫자만큼 크기의 역삼각형 출력 */
const getInvertedTriangle = (num) => {
  let result = "";

  for (let i = num; i > 0; i--) {
    if (i > 1) result += `${"*".repeat(i)}\n`;
    else result += `${"*".repeat(i)}`;
  }

  return result;
};

/**입력받은 숫자만큼 크기의 이등변 삼각형 출력 */
const getIsoscelesTriangle = (num) => {
  let result = "";
  let startCount = 1;

  for (let i = num - 1; i >= 0; i--) {
    if (i > 0) {
      result += `${" ".repeat(i)}${"*".repeat(startCount)}\n`;
      startCount += 2;
    } else result += `${" ".repeat(i)}${"*".repeat(startCount)}`;
  }

  return result;
};

/**다이아몬드 출력 */
const getDiamond = (num) => {
  let result = "";
  let spaceCount = Math.floor(num / 2);
  let startCount = 1;
  let turn = 0;

  for (let i = 0; i < num; i++) {
    if (turn === 0) {
      result += `${" ".repeat(spaceCount)}${"*".repeat(startCount)}\n`;
      startCount += 2;
      spaceCount--;
    } else {
      if (i < num - 1) {
        result += `${" ".repeat(spaceCount)}${"*".repeat(startCount)}\n`;
        startCount -= 2;
        spaceCount++;
      } else result += `${" ".repeat(spaceCount)}${"*".repeat(startCount)}`;
    }
    if (startCount === num) turn = 1;
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

console.log(getHexagram(3, 3));
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
