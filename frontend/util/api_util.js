var ServerActions = require('../actions/server_actions');
var UserActions = require('../actions/user_actions');
var hashHistory = require('react-router').hashHistory;

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
        options.success();
      },
      error: function(error){
        ServerActions.handleError(error);
      }
    });
  },
  deleteWorkout: function(options){
    var url = options.url;
    var type = options.type;
    $.ajax({
      url: url,
      type: "DELETE",
      success: function(gym){
        ServerActions.receiveOne(gym, type);
      },
      error: function(error){
        ServerActions.handleError(error);
      }
    });
  },
  updateWorkout: function(options){
    var url = options.url;
    $.ajax({
      url: 'api/user/update_workout',
      type: "PATCH",
      data: options,
      success: function(gym){
        ServerActions.receiveOne(gym, "CURRENT_GYM");
        options.success();
      },
      error: function(error){
        ServerActions.handleError(error);
      }
    });
  },
  pairUp: function(workoutId, userId) {
    $.ajax({
      url: 'api/workouts/' + workoutId,
      type: "PATCH",
      data: {user_id: userId},
      success: function(user){
        hashHistory.push('/users/' + user.id);
      },
      error: function(error){
        ServerActions.handleError(error);
      }
    });
  },
  chooseGym: function(params) {
    $.ajax({
      url: 'api/user/',
      type: "PATCH",
      data: params,
      success: function(user){
        UserActions.receiveCurrentUser(user);
      },
      error: function(error){
        ServerActions.handleError(error);
      }
    });
  },
};

module.exports = ApiUtil;
