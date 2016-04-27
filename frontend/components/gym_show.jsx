var React = require('react');
var ClientActions = require('../actions/client_actions');
var GymStore = require('../stores/gym_store');
var hashHistory = require('react-router').hashHistory;
var WorkoutIndex = require('./workout_index');

var GymShow = React.createClass({
  getInitialState: function() {
    return { workouts: [], name: ""};
  },
  componentDidMount: function() {
    this.listener = GymStore.addListener(this.updateGym);
    var url = "/api/gyms/" + this.props.params.gym_id;
    ClientActions.fetchOne({
      url: url,
      type: "CURRENT_GYM"
    });
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  updateGym: function(){
    this.setState({workouts: GymStore.currentGym().workouts});
  },
  handleClick: function(){
    console.log("CLICKING");
  },

  render: function() {
    return (
      <div>
        <h2>{this.state.name}</h2>
        <WorkoutIndex workouts={this.state.workouts}/>
      </div>
    );
  }

});
// <WorkoutIndex gyms={this.state.gym.workouts}/>

module.exports = GymShow;
