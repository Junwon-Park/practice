const {
  getStar,
  getTriangle,
  getInvertedTriangle,
  getIsoscelesTriangle,
  getDiamond,
  getHexagram,
} = require("./refactory");
const input1 = Number(require("fs").readFileSync(__dirname + "/ex1.txt"));
const input2 = Number(require("fs").readFileSync(__dirname + "/ex2.txt"));
const input3 = Number(require("fs").readFileSync(__dirname + "/ex3.txt"));

describe("가로로 별 출력", () => {
  const start1 = `****`;

  test("예시 1", () => {
    expect(getStar(input1)).toBe(start1);
  });
});

describe("삼각형 출력", () => {
  const star1 = `*\n**\n***`;
  const star2 = `*\n**\n***\n****\n*****`;

  test("예시 1", () => {
    expect(getTriangle(input2)).toBe(star1);
  });

  test("예시 2", () => {
    expect(getTriangle(input3)).toBe(star2);
  });
});

describe("역삼각형 출력", () => {
  const star1 = `***\n**\n*`;
  const star2 = `*****\n****\n***\n**\n*`;

  test("예시 1", () => {
    expect(getInvertedTriangle(input2)).toBe(star1);
  });

  test("예시 2", () => {
    expect(getInvertedTriangle(input3)).toBe(star2);
  });
});

describe("이등변 삼각형 출력", () => {
  const star1 = `  *\n ***\n*****`;
  const star2 = `    *\n   ***\n  *****\n *******\n*********`;

  test("예시 1", () => {
    expect(getIsoscelesTriangle(input2)).toBe(star1);
  });

  test("예시 2", () => {
    expect(getIsoscelesTriangle(input3)).toBe(star2);
  });
});

describe("다이아몬드 출력", () => {
  const star1 = ` *\n***\n *`;
  const star2 = `  *\n ***\n*****\n ***\n  *`;

  test("예제 1", () => {
    expect(getDiamond(input2)).toBe(star1);
  });

  test("에제 2", () => {
    expect(getDiamond(input3)).toBe(star2);
  });
});

describe("별 출력", () => {
  const star1 = `   *\n  ***\n*******\n *****\n*******\n  ***\n   *`;
  const star2 = `     *\n    ***\n   *****\n***********\n *********\n  *******\n *********\n***********\n   *****\n    ***\n     *`;

  test("예제 1", () => {
    expect(getHexagram(7)).toBe(star1);
  });

  test("예제 2", () => {
    expect(getHexagram(11)).toBe(star2);
  });
});
