var React = require('react');
var UserActions = require("../actions/user_actions");
var hashHistory = require('react-router').hashHistory;

var LoginModal = React.createClass({
  blankAttrs: {
    status: "Log In",
    buttons: [],
    username: "",
    password: ""
  },
  getInitialState: function() {
    return this.blankAttrs;
  },
  handleLogin: function(e){
    e.preventDefault();
    var user = {
      username: this.state.username,
      password: this.state.password
    };
    UserActions.login(user);
    this.state = this.blankAttrs;
  },
  handleSignUp: function(e){
    e.preventDefault();
    var user = {
      username: this.state.username,
      password: this.state.password
    };
    UserActions.signup(user);
    this.setState(this.blankAttrs);
    hashHistory.push(location.hash.split("#")[1].split("?")[0]);
  },
  demoLogin: function(e){
    e.preventDefault();
    var user = {
      username: "Arnold.S",
      password: "123123"
    };
    UserActions.login(user);
    this.setState(this.blankAttrs);
    hashHistory.push(location.hash.split("#")[1].split("?")[0]);

  },
  changeToLogin: function(){
    this.setState({status: "Log In"});
  },
  changeToSignup: function(){
    this.setState({status: "Sign Up"});
  },
  header: function(){
    var loginClass="", signupClass="";
    if (this.state.status === "Log In"){
      loginClass = "selected";
    } else {
      signupClass = "selected";
    }
    return (
      <ul className="auth-toggle">
        <li
          className={loginClass}
          onClick={this.changeToLogin}>Log In!</li>
        <li
          className={signupClass}
          onClick={this.changeToSignup}>Sign Up!</li>
      </ul>
    );
  },
  updateUsername: function(e){
    e.preventDefault();
    this.setState({username: e.target.value});
  },
  updatePassword: function(e){
    e.preventDefault();
    this.setState({password: e.target.value});
  },
  usernamePassword : function(){
    return (
      <div>
        <label
          className="login-section">
          Username:
          <br />
          <input
            type="text"
            placeholder=" Username"
            value={this.state.username}
            onChange={this.updateUsername}
            className="login-section"
            />
        </label><br/>
        <label
          className="login-section">
          Password:
          <br />
          <input
            type="password"
            placeholder=" Password"
            value={this.state.password}
            onChange={this.updatePassword}
            className="login-section"
            />
        </label>
      </div>
    );
  },
  buttons: function(){
    if (this.state.status === "Log In"){
      return (
        <div className="auth-btns">
          <input
            type="button"
            value="Log In"
            className="auth-btn"
            onClick={this.handleLogin} />
          <input
            type="button"
            value="Demo Log In"
            className="auth-btn"
            onClick={this.demoLogin} />
        </div>
      );
    } else {
      return (
        <div>
          <input
            type="button"
            value="Sign Up"
            className="auth-btn"
            onClick={this.handleSignup} />
        </div>
      );
    }
  },
  render: function() {
    return (
      <form className="login-form">
        <section className="credentials">
          {this.header()}
          {this.usernamePassword()}
          {this.buttons()}
        </section>
      </form>
    );
  }

});

module.exports = LoginModal;











// </section>
// <section className="form-button">
//   <input
//     type="Submit"
//     valueLink={this.linkState("form")}
//     />
//   {this.state.buttons}
//   {this.demoLoginButton()}
