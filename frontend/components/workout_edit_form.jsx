var React = require('react');
var ClientActions = require('../actions/client_actions');
var WorkoutStore = require('../stores/workout_store');
var hashHistory = require('react-router').hashHistory;
var WorkoutForm = require('./workout_form');

var WorkoutEditForm = React.createClass({
  getInitialState: function() {
    return { workout: WorkoutStore.currentWorkout() };
  },
  render: function(){

    return (
      <WorkoutForm
        editing="true"
        workout={this.state.workout}
      />

    );
  }

});


module.exports = WorkoutEditForm;
