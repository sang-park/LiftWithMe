//React
var React = require('react');
var ReactDOM = require('react-dom');
var Joyride = require('react-joyride');
//Router
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;
var browserHistory = ReactRouter.browserHistory;
//Mixins
var CurrentUserState = require('./mixins/current_user_state');
var UserStore = require('./stores/user_store');
//components
var LoginForm = require('./components/login_form');
var HomeCityIndex = require('./components/home_city_index');
var HomeCityShow = require('./components/home_city_show');
var GymShow = require('./components/gym_show');
var WorkoutShow = require('./components/workout_show');
var UserShow = require('./components/user_show');
var HomePage = require('./components/home_page');

var App = React.createClass({
  getInitialState: function() {
    return {
      joyrideOverlay: true,
      joyrideType: 'continuous',
      ready: false,
      steps: []
    };
  },
  addSteps: function (steps) {
    var joyride = this.refs.joyride;

    if (!Array.isArray(steps)) {
        steps = [steps];
    }

    if (!steps.length) {
        return false;
    }

    this.setState(function(currentState) {
      currentState.steps = currentState.steps.concat(joyride.parseSteps(steps));
      return currentState;
    });
  },
  componentDidMount: function(){
    setTimeout(function(){
      this.refs.joyride.start();
    }.bind(this)  , 1000);
  },
  render: function(){
    return (
      <div>
        <Joyride
          ref="joyride"
          debug={false}
          steps={this.state.steps}
          type={this.state.joyrideType}
          autorun={true}
          scrollToSteps={true}
          showSkipButton={true} />

        <LoginForm addSteps={this.addSteps}/>
        <div>
          {React.cloneElement(this.props.children, {
            addSteps: this.addSteps
          })}
        </div>
      </div>
    );
  }
});

var router =  (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="users/:user_id" component={UserShow} />
      <Route path="home_cities" component={HomeCityIndex} />
      <Route path="home_cities/:home_city_id" component={HomeCityShow} />
      <Route path="gyms/:gym_id" component={GymShow} />
      <Route path="workouts/:workout_id" component={WorkoutShow} />
    </Route>
  </Router>
);


document.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render( router ,document.getElementById('root'));
});
