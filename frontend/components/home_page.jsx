var React = require('react');
var UserStore = require('../stores/user_store');
var hashHistory = require('react-router').hashHistory;
var LoginModal = require('./login_modal');

var HomePage = React.createClass({
  openModal: function(){
    this.setState({modalIsOpen: true, form: "Log In"});
  },
  closeModal: function() {
    this.setState({modalIsOpen: false});
  },
  handleClick: function(e){
    e.preventDefault();
    $(".login-info li:nth-child(2)")[0].click();

  },

  render: function() {
    return (
      <div className="splash">
        <div className="workout-splash">
          <div className="gray-overlay">
            <h1>WORKOUT</h1>
            <p>Never workout without a spotter again</p>
            <div className="button-cover">
              <button onClick={this.handleClick}>Find Your Gym Buddy</button>
            </div>
          </div>
        </div>

        <div className="info">
          <div>
            <span>We do this!</span>
            <p>like so</p>
          </div>
          <div>
            <span>Also this</span>
            <p>wow</p>
          </div>
          <div>
            <span>Much Style</span>
            <p>such website</p>
          </div>
        </div>
      </div>

    );
  }

});

module.exports = HomePage;
