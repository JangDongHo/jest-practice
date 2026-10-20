const { verifyPassword } = require("../password-verifier0");

describe("verifyPassword", () => {
  describe("실패 규칙을 받을 경우", () => {
    test("에러를 반환한다.", () => {
      // 준비(arrange)
      const fakeRule = (input) => ({ passed: false, reason: "fake reason" });

      // 실행(act)
      const errors = verifyPassword("any value", [fakeRule]);

      // 검증(assert)
      expect(errors[0]).toMatch("fake reason");
    });
  });
});
