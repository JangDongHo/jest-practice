const { oneUpperCaseRule } = require("../password-rules");

describe("v0 대문자 한개 테스트", () => {
  test("대문자가 한 개도 없을 경우, 실패한다.", () => {
    const result = oneUpperCaseRule("abc");
    expect(result.passed).toBe(false);
  });

  test("첫 문자가 대문자일 경우, 성공한다.", () => {
    const result = oneUpperCaseRule("Abc");
    expect(result.passed).toBe(true);
  });

  test("중간 문자가 대문자일 경우, 성공한다.", () => {
    const result = oneUpperCaseRule("aBc");
    expect(result.passed).toBe(true);
  });
});

describe("v1 대문자 한개 테스트", () => {
  test.each([
    ["Abc", true],
    ["aBc", true],
    ["abc", false],
  ])("given %s, %s", (input, expected) => {
    const result = oneUpperCaseRule(input);
    expect(result.passed).toBe(expected);
  });
});
