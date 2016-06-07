var React = require("react");
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var UserActions = require("../actions/user_actions");
var LoginModal = require("./login_modal");
var CurrentUserState = require("../mixins/current_user_state");
var Modal = require('react-modal');
var UserStore = require('../stores/user_store');
var hashHistory = require('react-router').hashHistory;

var _logoURL = "http://res.cloudinary.com/dque3vywj/image/upload/v1462342954/logo_dit3rz.png";

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
    top                   : '40%',
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
  blankAttrs: { form: "Log In",
    modalIsOpen: false
  },
  getInitialState: function() {
    Modal.setAppElement(document.getElementById("root"));
    return this.blankAttrs;
  },
  openModal: function(){
    this.setState({modalIsOpen: true, form: "Log In"});
  },
  closeModal: function() {
    this.setState({modalIsOpen: false});
  },
  handleLogout: function(e){
    e.preventDefault();
    UserActions.logout();
    this.closeModal();
    hashHistory.push(location.hash.split("#")[1].split("?")[0]);
  },
  goToHomePage: function(e){
    e.preventDefault();
    hashHistory.push("/");
  },
  displayModal: function(){
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={_style}
      >
        <LoginModal/>
      </Modal>
    );
  },
  form: function(){
    if (this.state.currentUser) {
      return;
    } else {
      return (
        <li onClick={this.openModal} >
          Login
          {this.displayModal()}
        </li>
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
        <li className="dropdown drop-button">
          <span onClick={this.goToUser}>
            Hi, {this.state.currentUser.username}
          </span>
          <ul className="dropdown-content">
            <li onClick={this.goToUser}>Go to Profile</li>
            <li onClick={this.handleLogout}>Log Out</li>
          </ul>
        </li>
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
  redirectToGym: function(e){
    e.preventDefault();
    var gym = UserStore.currentUser().gym;
    if (gym){
      hashHistory.push('gyms/' + gym.id);
    } else {
      hashHistory.push('home_cities/');
    }
  },
  homeCities: function(){
    return (
      <li
        className="view-cities"
        onClick={this.redirectToHome}>
        Cities
      </li>
    );
  },
  myGym: function(){
    if (UserStore.currentUser()){
      return (
        <li
          className="my-gym"
          onClick={this.redirectToGym}>
          My Gym
        </li>
      );
    }
  },
  render: function() {
    return (
      <nav className="navbar">
        <div>
          <img src={_logoURL} id="logo" onClick={this.goToHomePage} />
        </div>
        <ul className="login-info">
          {this.homeCities()}
          {this.myGym()}
          {this.profile()}
          {this.form()}
        </ul>
      </nav>
    );
  }

});

module.exports = LoginForm ;
