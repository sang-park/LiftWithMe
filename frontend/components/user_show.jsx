var React = require('react');
var UserActions = require('../actions/user_actions');
var UserStore = require('../stores/user_store');
var WorkoutIndex = require('../components/Workout_index');

var UserShow = React.createClass({
  getInitialState: function() {
    return {user: {}};
  },
  componentDidMount: function() {
    var id = this.props.params.user_id;
    this.listener = UserStore.addListener(this.updateUser);
    UserActions.fetchUser(id);
  },
  componentWillReceiveProps: function(newProps){
    var id = newProps.params.user_id;
    UserActions.fetchUser(id);
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  updateUser: function(){
    if (UserStore.user && !this.sent) {
      var id = this.props.params.user_id;
      UserActions.fetchUser(id);
      this.sent = true;
    } else if (UserStore.user && this.sent){
      this.sent = false;
      var user = UserStore.user();
      this.setState({user: user});
    }
  },
  profile: function(){
    return (
      <div className="profile-show">
        <div>
          <img src={this.state.user.profile_image_url} />
        </div>
        <div>
          <div>Name:{this.state.user.username}</div>
          <div>Age:{this.state.user.age}</div>
          <div>Weight:{this.state.user.weight}</div>
        </div>
      </div>
    );
  },
  workouts: function(){
    if (this.state.user.workouts){
      var workouts = this.state.user.workouts.sort(function(a,b){
        if (a.date > b.date) {
          return 1;
        } else if (a.date < b.date) {
          return -1;
        } else {
          return 0;
        }
      });
      return (
        <WorkoutIndex
          workouts={workouts}
          view="true"
        />
      );
    }
  },
  render: function() {
    return (
      <div>
        {this.profile()}
        {this.workouts()}
      </div>
    );
  }

});

module.exports = UserShow;
