const {
  getStar,
  getTriangle,
  getInvertedTriangle,
  getIsoscelesTriangle,
  getDiamond,
  getHexagram,
} = require("./refactory");

// 가로로 별 출력 from, to: 별의 개수 시작과 끝, step: 별 증가 개수, type: 정렬 타입, space: 출력할 공백의 수, row: 헥사그램 가로 출력 개수
describe("가로로 별 출력", () => {
  const start1 = `****`;

  test("예시 1", () => {
    expect(getStar(1, 4, 1, "left", 0, 0)).toBe(start1);
  });
});

describe("삼각형 출력", () => {
  const star1 = `*\n**\n***`;
  const star2 = `*\n**\n***\n****\n*****`;

  test("예시 1", () => {
    expect(getTriangle(3)).toBe(star1);
  });

  test("예시 2", () => {
    expect(getTriangle(5)).toBe(star2);
  });
});

describe("역삼각형 출력", () => {
  const star1 = `***\n**\n*`;
  const star2 = `*****\n****\n***\n**\n*`;

  test("예시 1", () => {
    expect(getInvertedTriangle(3)).toBe(star1);
  });

  test("예시 2", () => {
    expect(getInvertedTriangle(5)).toBe(star2);
  });
});

describe("이등변 삼각형 출력", () => {
  const star1 = `  *\n ***\n*****`;
  const star2 = `    *\n   ***\n  *****\n *******\n*********`;

  test("예시 1", () => {
    expect(getIsoscelesTriangle(3, "", 1)).toBe(star1);
  });

  test("예시 2", () => {
    expect(getIsoscelesTriangle(5, "", 1)).toBe(star2);
  });
});

describe("다이아몬드 출력", () => {
  const star1 = ` *\n***\n *`;
  const star2 = `  *\n ***\n*****\n ***\n  *`;

  test("예제 1", () => {
    expect(getDiamond(3)).toBe(star1);
  });

  test("에제 2", () => {
    expect(getDiamond(5)).toBe(star2);
  });
});

describe("별 출력", () => {
  const star1 = `   *\n  ***\n*******\n *****\n*******\n  ***\n   *`;
  const star2 = `     *\n    ***\n   *****\n***********\n *********\n  *******\n *********\n***********\n   *****\n    ***\n     *`;

  test("예제 1", () => {
    expect(getHexagram(7, 1, 1)).toBe(star1);
  });

  test("예제 2", () => {
    expect(getHexagram(11, 1, 1)).toBe(star2);
  });
});
