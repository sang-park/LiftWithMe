var React = require('react');
var ReactDOM = require('react-dom');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ClientActions = require('../actions/client_actions');
var GymStore = require('../stores/gym_store');
var ExerciseStore = require('../stores/exercise_store');

var WorkoutForm = React.createClass({
  getInitialState: function() {
    return {
      name: "",
      date: "",
      time: "",
      exercises: [this.blankExercise()]
    };
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
    debugger
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
          ref="info"
          updateWorkout={this.updateWorkout} />
        <WorkoutTable
          ref="table"
          addExercise={this.addExercise}
          updateExercise={this.updateExercise}
          blankAttrs={this.blankExercise()}/>
        <input type="submit" />
      </form>
    );
  }
});

var WorkoutInfo = React.createClass({
  getInitialState: function() {
    return {name: "", date: "", time: ""};
  },
  handleChange: function(type){
    return function(e){
      var updateAttrs = {};
      updateAttrs[type] = e.target.value;
      this.setState(updateAttrs);
      this.props.updateWorkout(updateAttrs);
    }.bind(this);
  },
  render: function(){
    return (
      <div className="workout-info">
        <label>
          Workout Name: <input
            ref="name"
            type='text'
            value={this.state.name}
            onChange={this.handleChange("name")}/>
        </label>
        <label>
          Date: <input
            ref="date"
            type='date'
            value={this.state.date}
            onChange={this.handleChange("date")}/>
        </label>
        <label>
          Time: <input
            ref="time"
            type='time'
            value={this.state.time}
            onChange={this.handleChange("time")}/>
        </label>
      </div>
    );
  }
});

var WorkoutTable = React.createClass({
  getInitialState: function() {
    this.row = 0;
    return {
      rows: [
        <WorkoutTableRow
          key={"workout-row-" + this.row}
          index={this.row}
          updateExercise={this.props.updateExercise}
          blankAttrs={this.props.blankAttrs}
        />
      ]};
  },
  appendRow: function(e){
    e.preventDefault();
    this.row++;
    var rows = this.state.rows;
    rows.push(
      <WorkoutTableRow
        key={"workout-row-" + this.row}
        index={this.row}
        updateExercise={this.props.updateExercise}
        blankAttrs={this.props.blankAttrs}
      />
    );
    this.setState({rows: rows});

    this.props.addExercise();
  },
  tableHead: function(){
    return (
      <thead>
        <tr>
          <th> Exercise </th>
          <th> Sets </th>
          <th> Reps </th>
        </tr>
      </thead>
    );
  },
  tableBody: function(){
    return(
      <tbody>
        {this.state.rows}
      </tbody>
    );
  },
  render: function(){
    return (
      <div>
        <table>
          {this.tableHead()}
          {this.tableBody()}
        </table>
        <input
          type="button"
          value="+"
          onClick={this.appendRow}
        />
      </div>
    );
  }
});

var WorkoutTableRow = React.createClass({
  getInitialState: function() {
    return this.props.blankAttrs;
  },
  handleChange: function(type){
    return function(e){
      var updateAttrs = {};
      this.state[type] = parseInt(e.target.value);
      this.props.updateExercise(this.props.index, this.state);
      this.forceUpdate();
    }.bind(this);
  },
  updateExerciseName: function(exercise_id){
    this.state.exercise_id = parseInt(exercise_id.selected);
    this.props.updateExercise(this.props.index, this.state);
    this.forceUpdate();
  },
  render: function(){
    return (
      <tr>
        <td>
          <ExerciseList
            selected={this.state.exercise_id}
            updateExerciseName={this.updateExerciseName}
          />
        </td>
        <td>
          <input
            ref="sets"
            type="number"
            value={this.state.sets}
            onChange={this.handleChange("sets")}
          />
        </td>
        <td>
          <input
            ref="reps"
            type="number"
            value={this.state.reps}
            onChange={this.handleChange("reps")}
          /></td>
      </tr>
    );
  }
});

var ExerciseList = React.createClass({
  getInitialState: function() {
    var exercises = ExerciseStore.all();
    return {selected: this.props.selected};
  },
  exercises: function(){
    var self = this;
    var options = [];
    ExerciseStore.all().exercises.forEach(function(exercise){
      options.push(
        <option
          value={exercise.id}
          key={exercise.name}
        > {exercise.name} </option>
      );
    });
    return options;
  },
  handleChange: function(e){
    this.state["selected"] = e.target.value;
    this.forceUpdate();
    this.props.updateExerciseName(this.state);
  },
  render: function(){
    return(
      <select
        value={this.state.selected}
        onChange={this.handleChange}
      >
        {this.exercises()}
      </select>
    );
  }
});

module.exports = WorkoutForm;
