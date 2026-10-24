const moment = require("moment");
const { verifyPassword, verifyPassword2, verifyPassword3 } = require("../00-parameterspassword-verifier-time00");

const SUNDAY = 0;
const SATURDAY = 6;
const MONDAY = 2;

describe("verifier", () => {
  const TODAY = moment().day();

  // 이 테스트는 항상 실행되지만, 아무것도 수행하지 않을 수 있다.
  test("on weekends, throws exceptions", () => {
    if ([SATURDAY, SUNDAY].includes(TODAY)) {
      expect(() => verifyPassword("anything", []).toThrowError("It's the weekend!"));
    }
  });

  // 이 테스트는 주말에만 실행된다.
  if ([SATURDAY, SUNDAY].includes(TODAY)) {
    test("on weekends, throws exceptions", () => {
      expect(() => verifyPassword("anything", []).toThrowError("It's the weekend!"));
    });
  }
});

describe("verifier2 - dummy object", () => {
  test("on weekends, throws exceptions", () => {
    expect(() => verifyPassword2("anything", [], SUNDAY).toThrow("It's the weekend!"));
  });
});

describe("verifier3 - dummy function", () => {
  const alwaysSunday = () => SUNDAY;
  test("on weekends, throws exceptions", () => {
    expect(() => verifyPassword3("anything", [], alwaysSunday).toThrow("It's the weekend!"));
  });
});
