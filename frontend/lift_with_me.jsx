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


var App = React.createClass({
  getInitialState: function(){

  },
  render: function(){
    return (
      <div>
        <h2>ROOT</h2>
        <LoginForm />
        {this.props.children}
      </div>
    );
  }
});

var router =  (
  <Router history={browserHistory}>
    <Route path="/" components={App} />
  </Router>
);

document.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render( <LoginForm /> ,document.getElementById('root'));
});
