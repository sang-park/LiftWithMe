var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var WorkoutStore = new Store(AppDispatcher);

var _workout;

WorkoutStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "CURRENT_WORKOUT":
      WorkoutStore.updateWorkout(payload.item);
  }
};

WorkoutStore.updateWorkout = function(workout){
  _workout = workout;
  WorkoutStore.__emitChange();
};

WorkoutStore.currentWorkout = function(){
  if (_workout) {
  	return $.extend({}, _workout);
  }
};

window.WorkoutStore = WorkoutStore;

module.exports = WorkoutStore;
