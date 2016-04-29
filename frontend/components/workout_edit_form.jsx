var React = require('react');
var ClientActions = require('../actions/client_actions');
var WorkoutStore = require('../stores/workout_store');
var hashHistory = require('react-router').hashHistory;
var LinkedStateMixin = require('react-addons-linked-state-mixin');


var WorkoutEditForm = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    return { exercises: [], name: "", time: "", date: ""};
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
    var workout = WorkoutStore.currentWorkout();
    this.setState({
      exercises: workout.exercises,
      name: workout.name,
      time: workout.time.split("T")[1].split(".")[0],
      date: workout.date
    });
  },
  blankExercise: function(){
    return {exercise: "", sets: 0, reps: 0};
  },
  form: function(){
    var form = (
      <form>
        Workout Name:<input
          type='text'
          valueLink={this.linkState('name')} /> <br />
        Date:<input type='date' valueLink={this.linkState('date')}/> <br />
        Time:<input type='time' valueLink={this.linkState('time')}/> <br />
        <table index="ASDF">
          <thead>
            <tr>
              <td>Exercise</td>
              <td>Sets</td>
              <td>Reps</td>
            </tr>
          </thead>
          <tbody>
            {this.state.rows}
          </tbody>
        </table>
        <button onClick={this.appendRow}>+</button>
        <input type="submit" onClick={this.submitForm}></input>
      </form>
    );
    return form;
  },
  render: function() {
    return this.form();
  }

});


module.exports = WorkoutEditForm;
