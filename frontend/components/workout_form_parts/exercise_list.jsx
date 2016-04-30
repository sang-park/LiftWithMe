var React = require('react');
var ExerciseStore = require('../../stores/exercise_store');

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

module.exports = ExerciseList;
