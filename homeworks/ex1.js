const getStar = (num) => {
  let result;

  for (let i = 0; i < num; i++) {
    result = "*".repeat(num);
  }
  return result;
};

const getTriangle = (num) => {
  let result = "";

  for (let i = 0; i < num; i++) {
    if (i < num - 1) result += `${"*".repeat(i + 1)}\n`;
    else result += `${"*".repeat(i + 1)}`;
  }
  return result;
};

const getInvertedTriangle = (num) => {
  let result = "";

  for (let i = num; i > 0; i--) {
    if (i > 1) result += `${"*".repeat(i)}\n`;
    else result += `${"*".repeat(i)}`;
  }
  return result;
};

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

const getDiamond = (num) => {
  debugger;
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

const getHexagram = (num, n) => {
  const tTurn = (num - 1) / 2;
  const bTurn = (num - 1) / 2 + 2;
  let tSpaceCount = tTurn;
  let triangleCount = 1;
  let bodyCount = num;
  let bSpaceCount = 0;
  let triOrBody = 0; // 0 triangle, 1 body
  let bodyTurn = 0; // 0 bodyCount down, 1 bodyCount up
  let triangle = 0; // 0 head, 1 tail
  let result = "";

  for (let i = 0; i < num; i++) {
    if (triOrBody === 0 && triangle === 0) {
      result +=
        `${" ".repeat(tSpaceCount)}${"*".repeat(triangleCount)}${" ".repeat(
          tSpaceCount
        )}`.repeat(n) + "\n";
      tSpaceCount--;
      triangleCount += 2;
    } else if (triOrBody === 1 && triangle === 0) {
      if (bodyTurn === 0) {
        result +=
          `${" ".repeat(bSpaceCount)}${"*".repeat(bodyCount)}${" ".repeat(
            bSpaceCount
          )}`.repeat(n) + "\n";
        bSpaceCount++;
        bodyCount -= 2;
      } else {
        result +=
          `${" ".repeat(bSpaceCount)}${"*".repeat(bodyCount)}${" ".repeat(
            bSpaceCount
          )}`.repeat(n) + "\n";
        bSpaceCount--;
        bodyCount += 2;
      }
      if (bodyCount === bTurn) {
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
      result +=
        `${" ".repeat(tSpaceCount)}${"*".repeat(triangleCount)}${" ".repeat(
          tSpaceCount
        )}`.repeat(n) + "\n";
      triOrBody = 1;
    }
    if (bodyTurn === 1 && bodyCount === num) {
      result +=
        `${" ".repeat(bSpaceCount)}${"*".repeat(bodyCount)}${" ".repeat(
          bSpaceCount
        )}`.repeat(n) + "\n";
      triOrBody = 0;
      triangle = 1;
      bodyTurn = 0;
    }
    if (triangle === 1) {
      result +=
        `${" ".repeat(tSpaceCount)}${"*".repeat(triangleCount)}${" ".repeat(
          tSpaceCount
        )}`.repeat(n) + "\n";
      tSpaceCount++;
      triangleCount -= 2;
    }
    if (triangleCount < 0) break;
  }
  const resultRow = result.slice(0, -1);
  let resultCol = "";

  for (let j = 0; j < n; j++) {
    resultCol += resultRow + "\n";
  }
  return resultCol;
};
console.log(getHexagram(7, 5));
console.log(getHexagram(11, 5));

module.exports = {
  getStar,
  getTriangle,
  getInvertedTriangle,
  getIsoscelesTriangle,
  getDiamond,
  getHexagram,
};
