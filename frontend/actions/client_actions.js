var ApiUtil = require('../util/api_util');

var ClientActions = {
  fetchAll: ApiUtil.fetchAll,
  fetchOne: ApiUtil.fetchOne,
  createWorkout: ApiUtil.addWorkout
};

module.exports = ClientActions;
