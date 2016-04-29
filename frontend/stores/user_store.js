var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var UserConstants = require('../constants/user_constants');

var UserStore = new Store(AppDispatcher);

var _currentUser, _errors, _loaded = false;

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UserConstants.LOGIN:
      if (payload.user.errors !== null){
    	  UserStore.login(payload.user);
        UserStore.__emitChange();
      }
      break;
    case UserConstants.LOGOUT:
    	UserStore.logout();
      UserStore.__emitChange();
      break;
    case UserConstants.ERROR:
      UserStore.setErrors(payload.errors);
      UserStore.__emitChange();
      break;
  }
};

UserStore.notLoaded = function(){
  return !_loaded;
};

UserStore.toggleLoaded = function(){
  _loaded = !_loaded;
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
