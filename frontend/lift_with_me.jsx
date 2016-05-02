//React
var React = require('react');
var ReactDOM = require('react-dom');
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
  render: function(){
    return (
      <div>
        <LoginForm />
        {this.props.children}
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
