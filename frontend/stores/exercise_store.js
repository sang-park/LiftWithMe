var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var ExerciseStore = new Store(AppDispatcher);

var _exercises;

ExerciseStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "ALL_EXERCISES":
      ExerciseStore.updateExercises(payload.index);
  }
};

ExerciseStore.updateExercises = function(exercises){
  _exercises = exercises;
};

ExerciseStore.all = function(){
  if (_exercises) {
  	return $.extend({}, _exercises);
  }
};

window.ExerciseStore = ExerciseStore;

module.exports = ExerciseStore;
