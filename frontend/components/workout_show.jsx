var React = require('react');
var ClientActions = require('../actions/client_actions');
var WorkoutStore = require('../stores/workout_store');
var WorkoutEditForm = require('../components/workout_edit_form');
var hashHistory = require('react-router').hashHistory;
var UserStore = require('../stores/user_store');


var WorkoutShow = React.createClass({
  getInitialState: function() {
    return { exercises: [], name: "", editing: false};
  },
  componentDidMount: function() {
    this.listener = WorkoutStore.addListener(this.updateWorkout);
    var url = "/api/workouts/" + this.props.workout.id;
    ClientActions.fetchOne({
      url: url,
      type: "CURRENT_WORKOUT"
    });
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  updateWorkout: function(){
    this.setState({exercises: WorkoutStore.currentWorkout().exercises});
  },
  exercises: function(){
    var exercises = [];
    this.state.exercises.forEach(function(ex){
      exercises.push(
        <tr key={ex.name}>
          <td>{ex.name}</td>
          <td>{ex.sets}</td>
          <td>{ex.reps}</td>
        </tr>
      );
    });
    return (
      <table className="workout-table">
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Sets</th>
            <th>Reps</th>
          </tr>
        </thead>
        <tbody>
          {exercises}
          {this.editAndDelete()}
        </tbody>

      </table>
    );
  },

  editAndDelete: function(workout){
    if  ( UserStore.currentUser() &&
      UserStore.currentUser().id === this.props.workout.user_id){
      return (
        <tr>
          <td>
            <button
              onClick={this.openEditForm(this.props.workout)}
              value={this.props.workout.id}>
              Edit 
            </button>
            <button
              onClick={this.delete}
              value={this.props.workout.id}>
              Delete
            </button>
          </td>
        </tr>
      );
    } else {
      return;
    }
  },
  openEditForm: function(workout){
    return function(){
      this.setState({editing: true});
    }.bind(this);
  },

  edit: function(e){
    e.preventDefault();

  },
  delete: function(e){
    e.preventDefault();
    var options = {
      url: 'api/workouts/' + e.target.value,
      type: "CURRENT_GYM"
    };
    ClientActions.deleteWorkout(options);
    this.setState({modalIsOpen: false});
    this.props.closeModal();
  },


  render: function() {
    var workoutTitle = (
      <span className="workout-title">
        {this.props.workout.name}
      </span>
    );
    var display;
    if (this.state.editing) {
      display = <WorkoutEditForm
        workout={this.props.workout}
        exercises={this.state.exercises}
        closeModal={this.props.closeModal}
      />;
    } else {
      display = this.exercises();
    }
    return (
      <div className="workout-modal">
        {workoutTitle}
        {display}
      </div>
    );
  }

});

module.exports = WorkoutShow;
