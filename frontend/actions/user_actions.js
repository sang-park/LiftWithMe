var UserConstants = require('../constants/user_constants');
var UserApiUtil = require('../util/user_api_util');
var UserStore = require('../stores/user_store');
var AppDispatcher = require('../dispatcher/dispatcher');
var hashHistory = require('react-router').hashHistory;

var UserActions = {
  //clientactions
	fetchCurrentUser: function(){
		UserApiUtil.fetchCurrentUser(
			UserActions.receiveCurrentUser,
			UserActions.handleError
		);
	},
	fetchUser: function(id){
		UserApiUtil.fetchUser(
			id,
			UserActions.receiveUser,
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
	demoLogin: function(){
		UserApiUtil.login(
			{
				username: "Arnold.S",
				password: "123123"
	    },
			UserActions.receiveDemoUser,
			UserActions.handleError
		);
	},
  //serveractions
	receiveDemoUser: function(user){
		AppDispatcher.dispatch({
			actionType: UserConstants.LOGIN,
			user: user,
			demo: "true"
		});
	},
	receiveCurrentUser: function(user){
		AppDispatcher.dispatch({
			actionType: UserConstants.LOGIN,
			user: user
		});
	},
	receiveUser: function(user){
		AppDispatcher.dispatch({
			actionType: "RECEIVE_USER",
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
