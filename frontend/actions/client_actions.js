var ApiUtil = require('../util/api_util');

var ClientActions = {
  fetchAll: ApiUtil.fetchAll,
  fetchOne: ApiUtil.fetchOne,
  createWorkout: ApiUtil.addWorkout,
  deleteWorkout: ApiUtil.deleteWorkout

};

module.exports = ClientActions;
