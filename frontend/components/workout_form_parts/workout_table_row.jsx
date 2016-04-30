var React = require('react');
var ExerciseList = require('./exercise_list');

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
  updateExerciseName: function(exerciseId){
    this.state.exercise_id = parseInt(exerciseId.selected);
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
            type="number"
            value={this.state.sets}
            onChange={this.handleChange("sets")}
          />
        </td>
        <td>
          <input
            type="number"
            value={this.state.reps}
            onChange={this.handleChange("reps")}
          /></td>
      </tr>
    );
  }
});

module.exports = WorkoutTableRow;
