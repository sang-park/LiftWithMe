var React = require('react');
var UserActions = require('../actions/user_actions');
var UserStore = require('../stores/user_store');
var WorkoutIndex = require('../components/workout_index');



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
    var profileUrl = "https://www.drupal.org/files/profile_default.png";
    if (this.state.user.profile_image_url) {
      profileUrl = this.state.user.profile_image_url;
    }
    return (
      <div className="profile-show">
        <div className="profile-picture">
          <img src={profileUrl} />
        </div>
        <table className="profile-user-info">
          <tbody>
            <tr>
              <th>Name:</th>
              <td>{this.state.user.username}</td>
            </tr>
            <tr>
              <th>Age:</th>
              <td>{this.state.user.age}</td>
            </tr>
            <tr>
              <th>Weight:</th>
              <td>{this.state.user.weight}</td>
            </tr>
          </tbody>
        </table>
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
        <div className="profile-workout-index">
          <h4>{this.state.user.username + "'s Work Outs"}</h4>
          <WorkoutIndex
            workouts={workouts}
            view="true"
            gymName={this.state.user.username + "\'s Workouts"}
            />
        </div>
      );
    }
  },
  pairedWorkouts: function(){
    if (this.state.user.paired_workouts &&
        this.state.user.paired_workouts.length > 0){
      var workouts = this.state.user.paired_workouts.sort(function(a,b){
        if (a.date > b.date) {
          return 1;
        } else if (a.date < b.date) {
          return -1;
        } else {
          return 0;
        }
      });
      return (
        <div className="profile-workout-index">
          <h4>{this.state.user.username + "'s Paired Work Outs"}</h4>
          <WorkoutIndex
            workouts={workouts}
            view="true"
            gymName="Paired Workouts"
          />
        </div>
      );
    }
  },
  render: function() {
    return (
      <div>
        {this.profile()}
        {this.workouts()}
        {this.pairedWorkouts()}
      </div>
    );
  }

});

module.exports = UserShow;
