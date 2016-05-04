var React = require('react');
var UserActions = require("../actions/user_actions");
var hashHistory = require('react-router').hashHistory;

var LoginModal = React.createClass({
  blankAttrs: {
    status: "Log In",
    buttons: [],
    username: "",
    password: "",
    age: "",
    weight: "",
    profile_url: ""
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
      <div className="credentials">
        <label
          className="login-section">
          <span className="username-icon my-glyph"/>
          <input
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.updateUsername}
            />
        </label>
        <label
          className="login-section">
          <span className="password-icon my-glyph"/>
          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.updatePassword}
            />
        </label>
        {this.personalInfo()}
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
        <div className="auth-btns">
          <input
            type="button"
            value="Sign Up"
            className="auth-btn"
            onClick={this.handleSubmit} />
        </div>
      );
    }
  },
  handleSubmit: function(e){
    e.preventDefault();
    var user = {
      username: this.state.username,
      password: this.state.password,
      age: this.state.age,
      weight: this.state.weight,
      profile_url: this.state.profile_url
    };
    UserActions.signup(user);
    this.setState(this.blankAttrs);
    hashHistory.push(location.hash.split("#")[1].split("?")[0]);
    },
  handleSignupValueChange:  function(state){
    return function(e){
      e.preventDefault();
      var updateAttrs = {};
      updateAttrs[state] = e.target.value;
      this.setState(updateAttrs);
    }.bind(this);
  },
  personalInfo: function(){
    if (this.state.status === "Sign Up") {
      return (
        <div className="user-info">
          <label>
            <input
              type="number"
              value={this.state.age}
              placeholder="Age"
              onChange={this.handleSignupValueChange("age")}/>
          </label>
          <label>
            <input
              type="number"
              value={this.state.weight}
              placeholder="Weight"
              onChange={this.handleSignupValueChange("weight")}/>
            </label>
          <label>
            <input
              type="text"
              value={this.state.profile_url}
              placeholder="Profile Image URL (Optional)"
              className="longer"
              onChange={this.handleSignupValueChange("profile_url")}/>
            </label> <br />
        </div>
      );
    }
  },
  render: function() {
    return (
      <form className="login-form">
        {this.header()}
        {this.usernamePassword()}
        {this.buttons()}
      </form>
    );
  }

});

module.exports = LoginModal;
