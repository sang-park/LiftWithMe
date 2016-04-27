var React = require('react');
var GymStore = require('../stores/home_city_store');
var hashHistory = require('react-router').hashHistory;

var WorkoutIndex = React.createClass({
  handleClick: function(e){
    e.preventDefault();
    console.log("clickling");
    var workoutName = e.target.textContent;
    // var id = HomeCityStore.findIdOf(cityName);
    // hashHistory.push('/home_cities/' + id);
  },
  workouts: function(){
    var workouts = [];
    var self = this;
    this.props.workouts.forEach(function(workout){
      workouts.push(
        <li key={workout.name}>
          <div onClick={self.handleClick}> {workout.name} <br /> </div>
          Date: {workout.date} <br />
          Time: {workout.time} <br /><br />
        </li>);
    });
    return (
      <ul>{workouts}</ul>
    );
  },
  render: function() {
    return (
      <div>
        {this.workouts()}
      </div>
    );
  }

});

module.exports = WorkoutIndex;
