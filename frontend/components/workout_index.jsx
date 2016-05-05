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
  "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"
];

var WorkoutIndex = React.createClass({
  getInitialState: function() {
    this.workout = [];
    this.createFormClicked = false;
    return {
      modalIsOpen: false
    };
  },
  componentDidMount: function() {
    ClientActions.fetchAll({ //fetch all the exercises
      url: '/api/exercises',
      type: "ALL_EXERCISES"
    });
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
    var hr = time.split("T")[1].slice(0,2);
    var min = time.split("T")[1].slice(3,5);
    if (parseInt(hr) < 12){
      return (hr + ":" + min + " AM");
    } else if (parseInt(hr) === 12){
      return (hr + ":" + min + " PM");
    } else {
      return ((parseInt(hr)-12) + ":" + min + " PM");
    }
  },
  workouts: function(){
    var workouts = [];
    var self = this;
    this.props.workouts.forEach(function(workout){
      if (this.props.view || !workout.buddy_id) {
        var date = new Date(workout.date.split("-").join("/"));
        var wday = WEEKDAYS[date.getDay()];
        var time = self.parseTime(workout.time);
        var myWorkout = " ";
        var username = workout.username;
        if ( UserStore.currentUser() &&
        UserStore.currentUser().id === workout.user_id) {
          myWorkout += "my-workout";
          username = "My Workout";
        }
        workouts.push(
          <tr
            className = {"workout-index-view" + myWorkout}
            key={workout.name + workout.time}
            onClick={self.handleClick(workout)}
            >
            <td className="workout-date">
              <span>{wday}</span>
              <span>{(date.getMonth()+1) + "/" + date.getDate()} </span>
            </td>
            <td>{time}</td>
            <td value={workout.id} >
              {workout.name}
            </td>
            <td>{username}</td>
          </tr>);
      }
    }.bind(this));

    return (
      <table className="workouts">
        <thead>
          <tr>
            <td>Date</td>
            <td>Time</td>
            <td>Workout Name</td>
            <td>Username</td>
          </tr>
        </thead>
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
