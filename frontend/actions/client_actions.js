var ApiUtil = require('../util/api_util');

var ClientActions = {
  fetchAll: function(options){
    ApiUtil.fetchAll(options);
  }
};

module.exports = ClientActions;
