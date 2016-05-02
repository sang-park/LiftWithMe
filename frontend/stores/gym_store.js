var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var UserStore = require('./user_store');

var GymStore = new Store(AppDispatcher);

var _gym;

GymStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "CURRENT_GYM":
      GymStore.updateGym(payload.item);
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
