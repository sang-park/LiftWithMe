var React = require('react');
var ClientActions = require('../actions/client_actions');
var WorkoutStore = require('../stores/workout_store');
var ExerciseStore = require('../stores/exercise_store');
var hashHistory = require('react-router').hashHistory;
var LinkedStateMixin = require('react-addons-linked-state-mixin');


var WorkoutEditForm = React.createClass({
  mixins: [LinkedStateMixin],
  exercises: function(id){
    var options = [];
    var selectedVal;
    ExerciseStore.all().exercises.forEach(function(exercise){
      options.push(
        <option
          value={exercise.id}
          key={exercise.name}
        >{exercise.name}</option>
      );
    });
    return (
      <select id="exercise" defaultValue={id}>
        {options}
      </select>
    );
  },
  getInitialState: function() {
    this.key = 0;
    return { rows: [], name: "", time: "", date: ""};
  },
  componentDidMount: function() {
    this.listener = WorkoutStore.addListener(this.updateWorkout);
    this.updateWorkout();
    this.props.exercises.forEach(function(exercise){
      this.retrieveRow(exercise);
    }.bind(this));
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  updateWorkout: function(){
    var workout = this.props.workout;
    this.setState({
      time: workout.time.split("T")[1].split(".")[0],
      date: workout.date
    });
  },
  blankExercise: function(){
    return {exercise: "", sets: 0, reps: 0};
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
  retrieveRow: function(exercise){
    this.key++;
    this.rowKey = "exercise" + this.key;
    var setKey = "sets" + this.key;
    var repKey = "reps" + this.key;
    var idKey = "id" + this.key;
    var workoutExerciseId = "workoutExerciseId" + this.key;
    this.state[setKey] = exercise.sets;
    this.state[repKey] = exercise.reps;
    this.state[idKey] = exercise.id;
    this.state[workoutExerciseId] = exercise.workout_exercise_id;
    // valueLink={this.linkState('sets' + this.key)} />
    // valueLink={this.linkState(repKey)} />

    var rows = this.state.rows.concat(
      <tr key={this.rowKey} >
        <td>
          {this.exercises(exercise.id)}
        </td>
        <td>
          <input
            className="SETS"
            type="number"
            value={this.state[setKey]}
            onChange={this.update(setKey)} />
        </td>
        <td>
          <input
            type="number"
            value={this.state[repKey]}
            onChange={this.update(repKey)} />
        </td>
      </tr>
    );
    this.state.rows = rows;
  },
  update: function(key){
    return function(e){
      e.preventDefault();
      var updated = {};
      updated[key] = parseInt(e.target.value);
      this.state[key] = parseInt(e.target.value);
      this.forceUpdate();

    }.bind(this);
  },
  appendRow: function(){
    this.key++;
    var rows = this.state.rows.concat(this.row());
    this.setState({rows: rows});
  },
  form: function(){
    var form = (
      <form>
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
        <input type="submit" onClick={this.updateForm}></input>
      </form>
    );
    return form;
  },
  updateForm: function(){
    var workout = this.props.workout;
    var exercises = this.allExercises();
    var options = {
      // url: "api/workouts/" + this.props.workout.id,
      url: "api/user/update_workout",
      workout: workout,
      exercises: exercises
    };
    ClientActions.updateWorkout(options);
    this.props.closeModal();
  },
  allExercises: function(){
    var exes = [];
    var self = this;
    for (var i = 1; i <= self.key; i++) {
      var id = self.state["id" + i];
      var sets = self.state["sets" + i];
      var reps = self.state["reps" + i];
      var workoutExerciseId = self.state["workoutExerciseId" + i];
      exes.push({
        id: id,
        sets: sets,
        reps: reps,
        workoutExerciseId: workoutExerciseId
      });
    }
    return exes;
  },

  render: function() {
    return this.form();
  }

});


module.exports = WorkoutEditForm;
