var ServerActions = require('../actions/server_actions');

var ApiUtil = {
  fetchAll: function(options){
    var url = options.url;
    var type = options.type;
    $.ajax({
      url: url,
      type: 'get',
      success: function(index){
        ServerActions.receiveAll(index, type);
      }
    });
  },
  fetchOne: function(options){
    var url = options.url;
    var type = options.type;
    $.ajax({
      url: url,
      type: 'GET',
      success: function(item){
        ServerActions.receiveOne(item, type);
      }
    });
  }

};

module.exports = ApiUtil;
