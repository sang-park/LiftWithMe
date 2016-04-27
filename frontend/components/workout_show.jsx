var React = require('react');
var ClientActions = require('../actions/client_actions');
var WorkoutStore = require('../stores/workout_store');
var hashHistory = require('react-router').hashHistory;

var WorkoutShow = React.createClass({
  getInitialState: function() {
    return { exercises: [], name: ""};
  },
  componentDidMount: function() {
    this.listener = WorkoutStore.addListener(this.updateWorkout);
    var url = "/api/workouts/" + this.props.workout_id;
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
        </tbody>
      </table>
    );
  },
  render: function() {
    var workoutTitle = <span className="workout-title">{this.props.name}</span>;
    return (
      <div className="workout-modal">
        {workoutTitle}
        {this.exercises()}
      </div>
    );
  }

});

module.exports = WorkoutShow;
