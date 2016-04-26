var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var UserConstants = require('../constants/user_constants');

var UserStore = new Store(AppDispatcher);

var _currentUser, _errors;

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UserConstants.LOGIN:
      if (payload.user.errors !== null){
    	  UserStore.login(payload.user);
      }
      break;
    case UserConstants.LOGOUT:
    	UserStore.logout();
      break;
    case UserConstants.ERROR:
      UserStore.setErrors(payload.errors);
      break;
  }
  UserStore.__emitChange();
};

UserStore.login = function(user){
	_currentUser = user;
  _errors = null;
};

UserStore.logout = function(){
  _currentUser = null;
  _errors = null;
};

UserStore.currentUser = function(){
  if (_currentUser) {
  	return $.extend({}, _currentUser);
  }
};

UserStore.setErrors = function(errors){
  _errors = errors;
};

UserStore.errors = function(){
  if (_errors){
    return [].slice.call(_errors);
  }
};

window.UserStore = UserStore;
module.exports = UserStore;
