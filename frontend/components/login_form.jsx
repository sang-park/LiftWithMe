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
  },
  goToHomePage: function(e){
    e.preventDefault();
    hashHistory.push("/");
  },
  displayModal: function(button,header){
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={_style}
      >
        <LoginModal button={button} header={header}/>
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
          Hi, {this.state.currentUser.username}
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
    var gymId = UserStore.currentGymId();
    hashHistory.push('gyms/' + gymId);
  },
  homeCities: function(){
    return (
      <li onClick={this.redirectToHome}>
        Cities
      </li>
    );
  },
  myGym: function(){
    if (UserStore.currentUser()){
      return (
        <li onClick={this.redirectToGym}>
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
          {this.errors()}
          {this.form()}
        </ul>
      </nav>
    );
  }

});

module.exports = LoginForm ;
