var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ClientActions = require('../actions/client_actions');
var GymStore = require('../stores/gym_store');
var ExerciseStore = require('../stores/exercise_store');

var WorkoutForm = React.createClass({
  mixins: [LinkedStateMixin],
  exercises: function(){
    var options = [];
    ExerciseStore.all().exercises.forEach(function(exercise){
      options.push(
        <option value={exercise.id} key={exercise.name}>{exercise.name}</option>
      );
    });
    return (
      <select id="exercise">
        {options}
      </select>
    );
  },
  row: function(){
    this.rowKey = "exercise" + this.key;
    return (
      <tr key={this.rowKey} >
        <td>
          {this.exercises()}
        </td>
        <td>
          <input
            type="number"
            valueLink={this.linkState('sets' + this.key)} />
        </td>
        <td>
          <input
            type="number"
            valueLink={this.linkState('reps' + this.key)} />
        </td>
      </tr>
    );
  },
  blankExercise: function(){
    return {exercise: "", sets: 0, reps: 0};
  },
  getInitialState: function() {
    this.key = 0;
    return { rows: []};
  },
  componentDidMount: function() {
    this.appendRow();
  },
  appendRow: function(){
    this.key++;
    var rows = this.state.rows.concat(this.row());
    this.setState({rows: rows});
  },
  submitForm: function(e){
    e.preventDefault();
    var workoutParams = {
      name: this.state.name,
      date: this.state.date,
      time: this.state.time,
    };
    var exercises = this.allExercises();
    ClientActions.createWorkout({workout: workoutParams, exercises: exercises});
    this.props.closeModal();
  },
  allExercises: function(){
    var exes = [];
    var self = this;
    for (var i = 1; i <= self.key; i++) {
      var id = document.getElementById("exercise").value;
      var sets = self.state["sets" + i];
      var reps = self.state["reps" + i];
      exes.push({id: id, sets: sets, reps: reps});
    }
    return exes;
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

module.exports = WorkoutForm;
