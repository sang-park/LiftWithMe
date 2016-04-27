var React = require('react');
var ClientActions = require('../actions/client_actions');
var WorkoutStore = require('../stores/gym_store');
var hashHistory = require('react-router').hashHistory;

var WorkoutShow = React.createClass({
  getInitialState: function() {
    return { exercises: [], name: ""};
  },
  componentDidMount: function() {
    this.listener = WorkoutStore.addListener(this.updateWorkout);
    var url = "/api/workouts/" + this.props.params.workout_id;
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
  handleClick: function(){
    console.log("CLICKING");
  },
  render: function() {
    return (
      <div>
        <h2>{this.state.name}</h2>
      </div>
    );
  }

});
// <WorkoutIndex gyms={this.state.gym.workouts}/>

module.exports = WorkoutShow;
