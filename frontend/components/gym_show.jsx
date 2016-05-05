var React = require('react');
var ClientActions = require('../actions/client_actions');
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
  chooseButton: function(){
    var cUser = UserStore.currentUser();
    if (cUser && (!cUser.gym || cUser.gym.id !== this.state.id)) {
      return (
        <button>
          Choose {this.state.name} as your gym!
        </button>
      );
    }
  },
  render: function() {
    return (
      <div>
        {this.returnButton()}
        {this.chooseButton()}
        <WorkoutIndex workouts={this.state.workouts} gymName={this.state.name}/>
      </div>
    );
  }

});

module.exports = GymShow;
