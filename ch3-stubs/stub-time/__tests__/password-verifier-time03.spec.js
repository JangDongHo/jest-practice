const { PasswordVerifier, SUNDAY, MONDAY } = require("../password-verifier-time03");

function FakeTimeProvider(fakeDay) {
  this.getDay = function () {
    return fakeDay;
  };
}

describe("refactored with consturctor", () => {
  test("class constructor: on weekends, throws exception", () => {
    const verifier = new PasswordVerifier([], new FakeTimeProvider(SUNDAY));
    expect(() => verifier.verify("anything")).toThrow("It's the weekend!");
  });
});
