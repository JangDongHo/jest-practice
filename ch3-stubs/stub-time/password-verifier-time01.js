const SUNDAY = 0;
const MONDAY = 1;
const SATURDAY = 6;

class PasswordVerifier {
  constructor(rules, dayOfWeekFn) {
    this.rules = rules;
    this.dayOfWeekFn = dayOfWeekFn;
  }

  verify(input) {
    if ([SATURDAY, SUNDAY].includes(this.dayOfWeekFn())) {
      throw new Error("It's the weekend!");
    }
    const errors = [];
    return errors;
  }
}

module.exports = {
  PasswordVerifier,
  SUNDAY,
  SATURDAY,
};
