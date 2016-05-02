var React = require('react');
var UserStore = require('../stores/user_store');
var WorkoutShow = require('./workout_show');
var hashHistory = require('react-router').hashHistory;
var Modal = require('react-modal');
var WorkoutForm = require('./workout_form');
var ClientActions = require('../actions/client_actions');

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
    this.createFormClicked = false;
    return {
      modalIsOpen: false
    };
  },
  openModal: function() {
    this.createFormClicked = false;
    this.setState({modalIsOpen: true, form: "login"});
  },
  closeModal: function() {
    this.workout = [];
    this.setState({modalIsOpen: false});
  },

  handleClick: function(workout){
    return function(e){
      e.preventDefault();
      this.openModal();
      this.workout = <WorkoutShow
        view={this.props.view}
        workout={workout}
        closeModal={this.closeModal}
      />;
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
      return ((hr-12) + ":" + min + " PM");
    }
  },
  workouts: function(){
    var workouts = [];
    var self = this;
    this.props.workouts.forEach(function(workout){
      var date = new Date(workout.date);
      var wday = WEEKDAYS[date.getDay()];
      var time = self.parseTime(workout.time);
      var myWorkout = " ";
      if ( UserStore.currentUser() &&
        UserStore.currentUser().id === workout.user_id) {
        myWorkout += "my-workout";
      }
      workouts.push(
        <tr
          className = {"workout-index-view" + myWorkout}
          key={workout.name + workout.time}
          onClick={self.handleClick(workout)}
        >
          <td>{wday}</td>
          <td>{date.getMonth() + "/" + date.getDate()} </td>
          <td>{time}</td>
          <td value={workout.id} >
            {workout.name}
          </td>
          <td>{workout.username}</td>
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
    if (this.createFormClicked) {
      return (
        <WorkoutForm
          closeModal={this.closeModal}
          view={this.props.view}
        />
      );
    } else {
      return [];
    }
  },
  openCreateForm: function(){
    this.openModal();
    this.createFormClicked = true;
  },
  render: function() {
    var button = [];
    if (UserStore.currentUser() && !this.props.view){
      button = (
        <button onClick={this.openCreateForm}>Create New Workout</button>
      );
    }
    return (
      <div>
        {this.workouts()}
        {button}
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
