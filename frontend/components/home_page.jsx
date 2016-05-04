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
            <h1>Need a Spot?</h1>
            <p>Never work out without a spotter again</p>
            <div className="button-cover">
              <button
                onClick={this.handleClick}>Let's workout</button>
            </div>
          </div>
        </div>
        
        <div className="info">
          <div>
            <span>Push your limits</span>
            <p>No need to worry about getting a spotter</p>
          </div>
          <div>
            <span>Sign up for a workout!</span>
            <p>You get to pick which workout you want to join</p>
          </div>
          <div>
            <span>Such gains</span>
            <p>Much swole</p>
          </div>
        </div>

        <div className="why">

          <p className="but-why">Why use LiftWithMe?</p>

          <div className="reasons">
            <img src="http://res.cloudinary.com/dque3vywj/image/upload/v1462340683/lift_and_fall_navdyo.png" />
            <div className="filler" />
            <div>
              <span>It's Dangerous to Work Out Alone</span>
              <p>
                With LiftWithMe, you'll always have a spotter. No need to be
                awkward, and ask around for a spotter. Always be able to max
                out on your workout
              </p>
            </div>
          </div>

          <div className="reasons">

            <div>
              <span>Motivate One Another</span>
              <p>
                It's so easy to drop a rep, or even a set, when you're working
                out by yourself. Having someone there means you won't be takeing
                any shortcuts!</p>
            </div>
            <div className="filler" />
            <img src="http://res.cloudinary.com/dque3vywj/image/upload/v1462316702/motivation_etahk1.png" />
          </div>

          <div className="reasons">
            <img src="http://res.cloudinary.com/dque3vywj/image/upload/v1462341001/friends_xkgqim.png" />
              <div className="filler" />
            <div>
              <span>Make New Friends!</span>
              <p>
                Meet and connect with people you won't meet otherwise. If you're
                new to the city, it'd be a great way to get yourself out there
                and make new friends who share mutual goals.
              </p>
            </div>
          </div>

        </div>

        <div className="button-cover">
          <button
            onClick={this.handleClick}>Sign Up Now!</button>
        </div>

      </div>

    );
  }

});

module.exports = HomePage;
