const oneUpperCaseRule = (input) => {
  return {
    passed: input.toLowerCase() !== input,
    reason: "최소 한 개 이상의 대문자가 필요합니다.",
  };
};

module.exports = {
  oneUpperCaseRule,
};
