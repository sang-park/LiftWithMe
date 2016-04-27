var ApiUtil = require('../util/api_util');

var ClientActions = {
  fetchAll: function(options){
    ApiUtil.fetchAll(options);
  },
  fetchOne: function(options){
    ApiUtil.fetchOne(options);
  }
};

module.exports = ClientActions;
