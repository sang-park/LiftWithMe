//React
var React = require('react');
var ReactDOM = require('react-dom');
//Router
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;
//Mixins
// var CurrentUserState = require('./mixins/current_user_state');
var UserSTore = require('./stores/user_store');

var App = React.createClass({
  render: function(){
    return (
      <div>
        <h2>ROOT</h2>
        {this.props.children}
      </div>
    );
  }
});

var router =  (
  <Router history={hashHistory}>
    <Route path="/" components={App} />
  </Router>
);

document.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render( router ,document.getElementById('root'));
});
