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
	fetchCurrentUser: function(success, error){
		$.ajax({
			url: '/api/session',
			method: 'GET',
			success: success,
			error: error
		});
	},

};

module.exports = ApiUtil;
