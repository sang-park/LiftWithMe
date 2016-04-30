var React = require('react');
var ClientActions = require('../actions/client_actions');
var WorkoutInfo = require('./workout_form_parts/workout_info');
var WorkoutTable = require('./workout_form_parts/workout_table');


var WorkoutForm = React.createClass({
  getInitialState: function() {
    if (this.props.editing){
      return this.props.workout;
    } else {
      return {
        name: "",
        date: "",
        time: "",
        exercises: [this.blankExercise()]
      };
    }
  },
  blankExercise: function(){
    return {
      exercise_id: 1,
      sets: 0,
      reps: 0
    };
  },
  handleSubmit: function(e){
    e.preventDefault();
    var workoutParams = {
      name: this.state.name,
      date: this.state.date,
      time: this.state.time,
    };
    var exercises = this.state.exercises;
    ClientActions.createWorkout({
      workout: workoutParams,
      exercises: exercises,
      success: this.props.closeModal
    });
  },
  updateWorkout: function(newState){
    this.setState(newState);
  },
  updateExercise: function(index,newState){
    var exercise = this.state.exercises;
    exercise[index] = newState;
    this.setState({exercise: exercise});
  },
  addExercise: function(){
    var exercises = this.state.exercises;
    exercises.push(this.blankExercise());
    this.setState({exercises: exercises});
  },
  render: function(){
    return (
      <form onSubmit={this.handleSubmit}>
        <WorkoutInfo
          info={this.state}
          updateWorkout={this.updateWorkout} />
        <WorkoutTable
          exercises={this.state.exercises}
          addExercise={this.addExercise}
          updateExercise={this.updateExercise}
          editing={this.props.editing}
          blankAttrs={this.blankExercise()}/>
        <input type="submit" />
      </form>
    );
  }
});





module.exports = WorkoutForm;
