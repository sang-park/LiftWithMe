var React = require("react");
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var UserActions = require("../actions/user_actions");
var CurrentUserState = require("../mixins/current_user_state");
var Modal = require('react-modal');
var UserStore = require('../stores/user_store');

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
  form: function(){
    if (this.state.currentUser) {
      return (
        <button onClick={this.handleLogout}>logout</button>
      );
    } else {
      var header, button;
      if (this.state.form === "login") {
        header = "Log In";
        button = <button
          onClick={this.signUpPage}
          className="form-button">
            Sign Up
          </button>;
        this.action = UserActions.login;
      } else {
        header = "Sign Up";
        this.action = UserActions.signup;
      }
      return (
        <div>
          <button onClick={this.openModal}>login</button>
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
              </section>
            </form>
          </Modal>
        </div>
      );
    }
  },
  greet: function(){
    if (this.state.currentUser){
      return (
        <section>
          <h4>Hello, {this.state.currentUser.username} </h4>
        </section>
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

  render: function() {
    var button;
    if (this.state.currentUser) {
      this.state.modalIsOpen = false;
      button = "logout";
    } else {
      button = "login";
    }
    return (
      <div id="navbar">
        {this.greet()}
        {this.errors()}
        {this.form()}
      </div>
    );
  }

});

module.exports = LoginForm ;
