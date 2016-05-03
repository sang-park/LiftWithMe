var React = require('react');
var UserActions = require("../actions/user_actions");

var LoginModal = React.createClass({
  getInitialState: function() {
    return {
      username: "",
      password: ""
    };
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
  demoLogin: function(e){
    e.preventDefault();
    var user = {
      username: "Arnold",
      password: "123123"
    };
    UserActions.login(user);
    this.setState(this.blankAttrs);
  },

  render: function() {
    var header = this.props.header;
    var button = this.props.button;
    return (
      <form onSubmit={this.handleSubmit} className="login-form">
        <section className="credentials">
          <h2>{header}!</h2>
          <label
            className="login-section">Username:
            <input type="text"
              placeholder=" username"
              valueLink={this.linkState("username")}
              className="login-section"
            />
          </label> <br />
          <label
            className="login-section">Password:
            <input type="password"
              placeholder=" password"
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
    );
  }

});

module.exports = LoginModal;
