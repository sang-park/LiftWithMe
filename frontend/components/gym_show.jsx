var React = require('react');
var ClientActions = require('../actions/client_actions');
var UserActions = require('../actions/user_actions');
var GymStore = require('../stores/gym_store');
var UserStore = require('../stores/user_store');
var hashHistory = require('react-router').hashHistory;
var WorkoutIndex = require('./workout_index');


var GymShow = React.createClass({
  getInitialState: function() {
    return {
      workouts: [],
      name: "",
      id: ""
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
    this.listener2 = UserStore.addListener(this.showTutorial);
  },
  showTutorial: function(){
    var self = this;
    if (UserStore.demo()){
      UserStore.toggleDemo();
      setTimeout(function(){
        self.props.addSteps([
          {
            title: 'All the Work Outs!',
            text: 'You can see the lists of all the work outs posted in this gym. Click on them to see more! Your workouts are colored pink!',
            selector: '.table-body',
            position: 'top',
            type: 'hover',
            style: {
              mainColor: '#C70062',
              beacon: {
                inner: '#000000',
                outer: '#000000'
              }
            }
          },
          {
            title: 'Create a New Workout!',
            text: 'Create your own workout by clicking here! Select the time and date of your workout, and choose the exercises you plan on doing.',
            selector: '.new-workout-button',
            position: 'top-left',
            style: {
              mainColor: '#C70062',
              beacon: {
                inner: '#000000',
                outer: '#000000'
              }
            }
          },
          {
            title: 'Change your gym!',
            text: 'Click here to view all the cities where LiftWithMe is Available. From there, you can choose your gym, and find your workout buddy!',
            selector: '.view-cities',
            position: 'bottom-right',
            style: {
              mainColor: '#C70062',
              beacon: {
                inner: '#000000',
                outer: '#000000'
              }
            }
          },
          {
            title: 'View your gym!',
            text: 'Click here on any page to return to this page!',
            selector: '.my-gym',
            position: 'bottom-right',
            style: {
              mainColor: '#C70062',
              beacon: {
                inner: '#000000',
                outer: '#000000'
              }
            }
          },
          {
            title: 'View your profile!',
            text: 'Hover here to see go to your profile, or to log out.',
            selector: '.dropdown',
            position: 'bottom-right',
            style: {
              mainColor: '#C70062',
              beacon: {
                inner: '#000000',
                outer: '#000000'
              }
            }
          }
        ]);
      }, 500);
    }
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
      name: GymStore.currentGym().name,
      id: GymStore.currentGym().id
    });
    UserActions.fetchCurrentUser();
  },
  handleClick: function(){
    var hcId = GymStore.currentGym().home_city.id;
    hashHistory.push('/home_cities/' + hcId);
  },
  returnButton: function(){
    if (GymStore.currentGym()) {
      return (
        <button
          className="return-button"
          onClick={this.handleClick}
          >
          Return to {GymStore.currentGym().home_city.name}
        </button>
      );
    }
  },
  chooseGym: function(){
    var params = {
      userId: UserStore.currentUser().id,
      gymId: GymStore.currentGym().id
    };
    ClientActions.chooseGym(params);
  },
  chooseButton: function(){
    var cUser = UserStore.currentUser();
    if (cUser && (!cUser.gym || cUser.gym.id !== this.state.id)) {
      return (
        <button
          className="choose-button"
          onClick={this.chooseGym}>
          Choose {this.state.name} as your gym!
        </button>
      );
    } else {
      return (<div key="choose-btn group"/>);
    }
  },
  render: function() {
    return (
      <div>
        <h2>{this.state.name}</h2>
        <div className="selector">
          {this.returnButton()}
          {this.chooseButton()}
        </div>
        <WorkoutIndex
          workouts={this.state.workouts}
          gymName={this.state.name}/>
      </div>
    );
  },
});

module.exports = GymShow;
