var AppDispatcher = require('../dispatcher/dispatcher.js');
var hashHistory = require('react-router').hashHistory;
var Store = require('flux/utils').Store;
var UserConstants = require('../constants/user_constants');

var UserStore = new Store(AppDispatcher);

var _currentUser, _user = {}, _errors, _loaded = false;
var _demo = false;

UserStore.goToGym = function(){
  hashHistory.push('/gyms/' + _currentUser.gym.id);
};

var goBack = function(location){
  hashHistory.push(location);
};

UserStore.demo = function(){
  return _demo;
};

UserStore.toggleDemo = function(){
  _demo = false;
};

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UserConstants.LOGIN:
      if (payload.user.errors !== null){
    	  UserStore.login(payload.user);
        if (payload.demo === "true"){
          _demo = true;
          UserStore.goToGym();
        } else {
          goBack(location.hash.slice(1).split("?")[0]);
        }
        UserStore.__emitChange();
      } else {
        _errors = [];
      }
      break;
    case UserConstants.LOGOUT:
    	UserStore.logout();
      UserStore.__emitChange();
      goBack(location.hash.slice(1).split("?")[0]);
      break;
    case UserConstants.ERROR:
      UserStore.setErrors(payload.errors);
      UserStore.__emitChange();
      break;
    case "RECEIVE_USER":
      UserStore.setUser(payload.user);
      UserStore.__emitChange();
      break;
  }
};

UserStore.setUser = function(user){
  _user = user;
};

UserStore.user = function(){
  return _user;
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

UserStore.currentGymId = function(){
  if (_currentUser) {
    return _currentUser.gym.id;
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
