var UserConstants = require('../constants/user_constants');
var UserApiUtil = require('../util/user_api_util');
var UserStore = require('../stores/user_store');
var AppDispatcher = require('../dispatcher/dispatcher');

var UserActions = {
  //clientactions
	fetchCurrentUser: function(){
		UserApiUtil.fetchCurrentUser(
			UserActions.receiveCurrentUser,
			UserActions.handleError
		);
	},
	signup: function(user){
		UserApiUtil.signup(
      user,
      UserActions.receiveCurrentUser,
			UserActions.handleError
		);
	},
	login: function(user){
		UserApiUtil.login(
      user,
      UserActions.receiveCurrentUser,
      UserActions.handleError
		);
	},
	logout: function(){
		UserApiUtil.logout(
      UserActions.removeCurrentUser,
      UserActions.handleError
    );
	},

  //serveractions
	receiveCurrentUser: function(user){
		AppDispatcher.dispatch({
			actionType: UserConstants.LOGIN,
			user: user
		});
	},
  removeCurrentUser: function(){
    AppDispatcher.dispatch({
      actionType: UserConstants.LOGOUT,
    });
  },
	handleError: function(error) {
		AppDispatcher.dispatch({
			actionType: UserConstants.ERROR,
			errors: error.responseJSON.errors
		});
	}
};

module.exports = UserActions;
