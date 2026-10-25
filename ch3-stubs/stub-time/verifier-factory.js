const { PasswordVerifier } = require("./password-verifier-time03");
const { RealTimePovider } = require("./time-provider");

const passwordVerifierFactory = (rules) => {
  return new PasswordVerifier(new RealTimePovider());
};
