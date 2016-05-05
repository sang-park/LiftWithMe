var ApiUtil = require('../util/api_util');

var ClientActions = {
  fetchAll: ApiUtil.fetchAll,
  fetchOne: ApiUtil.fetchOne,
  createWorkout: ApiUtil.addWorkout,
  deleteWorkout: ApiUtil.deleteWorkout,
  updateWorkout: ApiUtil.updateWorkout,
  pairUp: ApiUtil.pairUp,
  chooseGym: ApiUtil.chooseGym
};

module.exports = ClientActions;
