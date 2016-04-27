var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var GymStore = new Store(AppDispatcher);

var _gym;

GymStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "CURRENT_GYM":
      GymStore.updateGym(payload.item);
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

GymStore.findIdOf = function(gymName){
  // var id;
  // Object.keys(_allHomeCities).forEach(function(cityId){
  //   if (_allHomeCities[cityId].name === cityName){
  //     id = parseInt(cityId) + 1;
  //   }
  // });
  // return id;
};

window.GymStore = GymStore;

module.exports = GymStore;
