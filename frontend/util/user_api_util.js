var AppDispatcher = require('../dispatcher/dispatcher');

var UserApiUtil = {
  signup: function(user, success, error){
    $.ajax({
      url: 'api/users',
      type: 'POST',
      data: {user: user},
      success: success,
      error: error
    });
  },
  login: function(user, success, error){
    $.ajax({
      url: 'api/session/',
      type: 'POST',
      data: {user: user},
      success: success,
      error: error
    });
  },
	logout: function(success, error){
		$.ajax({
			url: '/api/session',
			method: 'delete',
			success: success,
			error: error
		});
	},
	fetchCurrentUser: function(){
		$.ajax({
			url: '/api/session',
			method: 'get',
			success: function(){

      },
			error: function(){
        console.log("user api util get error");
      }
		});
	},
};

module.exports = UserApiUtil;
