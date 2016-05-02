var React = require("react");
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var UserActions = require("../actions/user_actions");
var CurrentUserState = require("../mixins/current_user_state");
var Modal = require('react-modal');
var UserStore = require('../stores/user_store');
var hashHistory = require('react-router').hashHistory;

var _logoURL = "http://res.cloudinary.com/dque3vywj/image/upload/v1461889490/logo_ksdmj0.png";

var _style = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    top                   : '30%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    padding : '20px'
  }
};

var LoginForm = React.createClass({
	mixins: [LinkedStateMixin, CurrentUserState],
  blankAttrs: { form: "login",
    modalIsOpen: false,
    username: "",
    password: ""
  },
  getInitialState: function() {
    Modal.setAppElement(document.getElementById("root"));
    return this.blankAttrs;
  },
  openModal: function() {
    this.setState({modalIsOpen: true, form: "login"});
  },
  closeModal: function() {
    this.setState({modalIsOpen: false});
  },
  handleSubmit: function(e){
    e.preventDefault();
    var user = {
      username: this.state.username,
      password: this.state.password
    };
    this.action(user);
    this.setState(this.blankAttrs);
  },

  handleLogout: function(e){
    e.preventDefault();
    UserActions.logout();
  },

  signUpPage: function(e){
    e.preventDefault();
    this.setState({form: "sign up"});
  },
  goToHomePage: function(e){
    e.preventDefault();
    hashHistory.push("/");
  },
  demoLogin: function(e){
    e.preventDefault();
    var user = {
      username: "Arnold",
      password: "123123"
    };
    UserActions.login(user);
    this.setState(this.blankAttrs);
  },
  demoLoginButton: function(){
    return (
      <button
        onClick={this.demoLogin}
        className="form-button">Demo Log In</button>
    );
  },
  displayModal: function(button,header){
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={_style}
      >
        <form onSubmit={this.handleSubmit} className="login-form">
          <section> <h2>{header}!</h2>
            <label
              className="login-section">Username:
              <input type="text"
                valueLink={this.linkState("username")}
                className="login-section"
              />
            </label> <br />
            <label
              className="login-section">Password:
              <input type="password"
                valueLink={this.linkState("password")}
                className="login-section"
              />
            </label>
          </section>
          <section className="form-button">
            <input
              type="Submit"
              valueLink={this.linkState("form")}
            />
          {button}
          {this.demoLoginButton()}
          </section>
        </form>
      </Modal>
    );
  },
  form: function(){
    if (this.state.currentUser) {
      return (
        <button
          onClick={this.handleLogout}
          className="btn-0 group"
          >logout</button>
      ); //LOG OUT BUTTON HERE
    } else {
      var header, button;
      if (this.state.form === "login") {
        header = "Log In";
        button = <button
          onClick={this.signUpPage}
          className="top-right">
            Sign Up
          </button>;
        this.action = UserActions.login;
      } else {
        header = "Sign Up";
        this.action = UserActions.signup;
      }
      return (
        <div>
          <button
            onClick={this.openModal}
            className="btn-0 group"
          >login</button>
          {this.displayModal(button,header)}
        </div>
      );
    }
  },
  goToUser: function(e){
    e.preventDefault();
    hashHistory.push('/users/' + this.state.currentUser.id);
  },
  profile: function(){
    if (this.state.currentUser){
      return (
        <div
          onClick={this.goToUser}
        >
          <image
            className="profile-picture"
            src={this.state.currentUser.profile_image_url}
          />
        </div>
      );
    }
  },
  errors: function(){
    if (!this.state.userErrors){
      return;
    }
    var self = this;
    return (<ul>
    {
      Object.keys(this.state.userErrors).map(function(key, i){
        return (<li key={i}>{self.state.userErrors[key]}</li>);
      })
    }
    </ul>);
  },
  redirectToHome: function(e){
    e.preventDefault();
    hashHistory.push('/home_cities');
  },
  homeCities: function(){
    return (
      <button onClick={this.redirectToHome}>
        Cities
      </button>
    );
  },

  render: function() {
    return (
      <div id="navbar">
        <img src={_logoURL} id="logo" onClick={this.goToHomePage}/>
        <div id="login-info">
          {this.homeCities()}
          {this.profile()}
          {this.errors()}
          {this.form()}
        </div>
      </div>
    );
  }

});

module.exports = LoginForm ;
