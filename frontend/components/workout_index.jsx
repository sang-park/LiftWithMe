var React = require('react');
var GymStore = require('../stores/home_city_store');
var WorkoutShow = require('./workout_show');
var hashHistory = require('react-router').hashHistory;
var Modal = require('react-modal');
var WorkoutForm = require('./workout_form');

var _style = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    top                   : '30%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    transform             : 'translate(-50%, -50%)',
    padding: '0'
  }
};

var WEEKDAYS = [
  "MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"
];

var WorkoutIndex = React.createClass({
  getInitialState: function() {
    this.workout = [];
    this.formClicked = false;
    return {
      modalIsOpen: false
    };
  },
  openModal: function() {
    this.formClicked = false;
    this.setState({modalIsOpen: true, form: "login"});
  },
  closeModal: function() {
    this.workout = [];
    this.setState({modalIsOpen: false});
  },
  handleClick: function(id,name){
    return function(e){
      e.preventDefault();
      this.openModal();
      this.workout = <WorkoutShow workout_id={id} name={name}/>;
    }.bind(this);
  },
  parseTime: function(time){
    var tdate = new Date(time);
    var hr = tdate.getHours();
    var min = tdate.getMinutes();
    if (min < 10) {
      min = "0" + min;
    }
    if (hr < 12){
      return (hr + ":" + min + " AM");
    } else {
      return (hr + ":" + min + " PM");
    }
  },

  workouts: function(){
    var workouts = [];
    var self = this;
    this.props.workouts.forEach(function(workout){
      var date = new Date(workout.date);
      var wday = WEEKDAYS[date.getDay()];
      var time = self.parseTime(workout.time);
      workouts.push(
        <tr
          className = "workout-index-view"
          key={workout.name}
          onClick={self.handleClick(workout.id,workout.name)}
        >
          <td>{wday}</td>
          <td>{date.getMonth() + "/" + date.getDate()} </td>
          <td>{time}</td>
          <td value={workout.id} >
            {workout.name}
          </td>
      </tr>);
    });
    return (
      <table className="workouts">
        <caption>{this.props.gymName}</caption>
        <tbody>
          {workouts}
        </tbody>
      </table>
    );
  },
  workoutForm: function(){
    if (this.formClicked) {
      return (
        <WorkoutForm closeModal={this.closeModal}/>
      );
    } else {
      return;
    }
  },
  openForm: function(){
    this.openModal();
    this.formClicked = true;
  },
  render: function() {
    return (
      <div>
        {this.workouts()}
        <button onClick={this.openForm}>Create New Workout</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={_style}
        >
          {this.workoutForm()}
          {this.workout}
        </Modal>
      </div>
    );
  }

});

module.exports = WorkoutIndex;
