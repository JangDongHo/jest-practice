const moment = require("moment");

const RealTimeProvider = () => {
  this.getDay = () => moment().day();
};

module.exports = {
  RealTimeProvider,
};
