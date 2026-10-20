const { PasswordVerifier1 } = require("../password-verifier1");

describe("v7 verifyPassword", () => {
  let verifier;

  beforeEach(() => {
    verifier = new PasswordVerifier1(); // verifier 변수를 두어 하위의 모든 테스트에서 사용할 수 있도록 설정한다.
  });

  describe("실패 규칙을 받을 경우", () => {
    let fakeRule, errors;

    beforeEach(() => {
      fakeRule = () => ({ passed: false, reason: "fake reason" }); // describe 구역 내에서 사용 가능한 fakeRule() 함수를 설정한다.
      verifier.addRule(fakeRule);
      errors = verifier.verify("any value");
    });

    test("에러를 반환한다.", () => {
      expect(errors[0]).toMatch("fake reason");
    });

    test("하나의 에러만 존재한다.", () => {
      expect(errors.length).toBe(1); // 이 테스트에서는 오류 수만 검증한다.
    });
  });

  describe("성공 규칙을 받을 경우", () => {
    let fakeRule, errors;

    beforeEach(() => {
      fakeRule = () => ({ passed: true, reason: "" });
      verifier.addRule(fakeRule);
      errors = verifier.verify("any value");
    });

    test("에러가 존재하지 않는다.", () => {
      expect(errors.length).toBe(0);
    });
  });

  describe("성공 규칙과 실패 규칙이 섞여 있을 경우", () => {
    let fakeRulePass, fakeRuleFail, errors;

    beforeEach(() => {
      fakeRulePass = () => ({ passed: true, reason: "fake success" });
      fakeRuleFail = () => ({ passed: false, reason: "fake reason" });
      verifier.addRule(fakeRulePass);
      verifier.addRule(fakeRuleFail);
      errors = verifier.verify("any value");
    });

    test("하나의 에러만 존재한다.", () => {
      expect(errors.length).toBe(1);
    });

    test("에러를 반환한다.", () => {
      expect(errors[0]).toMatch("fake reason");
    });
  });
});

/*
==================================================================================================================================
*/

const makeVerifier = () => new PasswordVerifier1();
const passingRule = () => ({ passed: true, reason: "" });

const makeVerifierWithPassingRule = () => {
  const verifier = makeVerifier();
  verifier.addRule(passingRule);
  return verifier;
};

const makeVerifierWithFailedRule = (reason) => {
  const verifier = makeVerifier();
  const failingRule = () => ({ passed: false, reason });
  verifier.addRule(failingRule);
  return verifier;
};

describe("v8 verifyPassword", () => {
  describe("실패 규칙을 받을 경우", () => {
    test("에러를 반환한다.", () => {
      const verifier = makeVerifierWithFailedRule("fake reason");
      const errors = verifier.verify("any value");
      expect(errors[0]).toMatch("fake reason");
    });

    test("하나의 에러만 존재한다.", () => {
      const verifier = makeVerifierWithFailedRule("fake reason");
      const errors = verifier.verify("any value");
      expect(errors.length).toBe(1);
    });
  });

  describe("성공 규칙을 받을 경우", () => {
    test("에러가 존재하지 않는다.", () => {
      const verifier = makeVerifierWithPassingRule();
      const errors = verifier.verify("any value");
      expect(errors.length).toBe(0);
    });
  });

  describe("성공 규칙과 실패 규칙이 섞여 있을 경우", () => {
    test("하나의 에러만 존재한다.", () => {
      const verifier = makeVerifierWithFailedRule("fake reason");
      verifier.addRule(passingRule);
      const errors = verifier.verify("any value");
      expect(errors.length).toBe(1);
    });

    test("에러를 반환한다.", () => {
      const verifier = makeVerifierWithFailedRule("fake reason");
      verifier.addRule(passingRule);
      const errors = verifier.verify("any value");
      expect(errors[0]).toMatch("fake reason");
    });
  });
});
