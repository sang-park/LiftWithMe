var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var UserStore = require('./user_store');
var hashHistory = require('react-router').hashHistory;

var GymStore = new Store(AppDispatcher);

var _gym;

var goBack = function(location){
  hashHistory.push(location);
};

GymStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "CURRENT_GYM":
      GymStore.updateGym(payload.item);
      goBack(location.hash.slice(1).split("?")[0]);
      UserStore.__emitChange();
  }
};

GymStore.updateGym = function(gym){
  _gym = gym;
  GymStore.__emitChange();
};

GymStore.currentGym = function(){
  if (_gym) {
  	return $.extend({}, _gym);
  }
};

window.GymStore = GymStore;

module.exports = GymStore;
