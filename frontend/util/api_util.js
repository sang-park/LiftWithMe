var ServerActions = require('../actions/server_actions');

var ApiUtil = {
  fetchAll: function(options){
    var url = options.url;
    var type = options.type;
    $.ajax({
      url: url,
      type: 'GET',
      success: function(index){
        ServerActions.receiveAll(index, type);
      },
      error: function(error){
        ServerActions.handleError(error);
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
      },
      error: function(error){
        ServerActions.handleError(error);
      }
    });
  },
  addWorkout: function(options){
    $.ajax({
      url: '/api/user/add_workout',
      type: "POST",
      data: options,
      success: function(gym){
        ServerActions.receiveOne(gym, "CURRENT_GYM");
      },
      error: function(error){
        ServerActions.handleError(error);
      }
    });
  }

};

module.exports = ApiUtil;
