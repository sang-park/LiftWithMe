var React = require('react');
var ClientActions = require('../actions/client_actions');
var GymStore = require('../stores/gym_store');
var hashHistory = require('react-router').hashHistory;
var WorkoutIndex = require('./workout_index');

var GymShow = React.createClass({
  getInitialState: function() {
    return {
      workouts: [],
      name: ""
    };
  },
  componentDidMount: function() {
    this.listener = GymStore.addListener(this.updateGym);
    var url = "/api/gyms/" + this.props.params.gym_id;
    ClientActions.fetchOne({
      url: url,
      type: "CURRENT_GYM"
    });
    ClientActions.fetchAll({ //fetch all the exercises
      url: '/api/exercises',
      type: "ALL_EXERCISES"
    });
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  updateGym: function(){
    var workouts = GymStore.currentGym().workouts.sort(function(a,b){
      if (a.date > b.date) {
        return 1;
      } else if (a.date < b.date) {
        return -1;
      } else {
        return 0;
      }
    });
    this.setState({
      workouts: workouts,
      name: GymStore.currentGym().name
    });
  },
  render: function() {
    return (
      <div>
        <WorkoutIndex workouts={this.state.workouts} gymName={this.state.name}/>
      </div>
    );
  }

});

module.exports = GymShow;
