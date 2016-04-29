var React = require('react');
var ClientActions = require('../actions/client_actions');
var HomeCityStore = require('../stores/home_city_store');
var hashHistory = require('react-router').hashHistory;
var img_URLs = {
  "San Francisco" : "http://res.cloudinary.com/dque3vywj/image/upload/v1461889491/San_Francisco_ebesqu.jpg",
  "New York" : "http://res.cloudinary.com/dque3vywj/image/upload/v1461889493/New_York_bd25nv.jpg",
  "Los Angeles" : "http://res.cloudinary.com/dque3vywj/image/upload/v1461889492/Los_Angeles_lo8tqs.jpg",
  "Boston" : "http://res.cloudinary.com/dque3vywj/image/upload/v1461889491/Boston_my2trf.jpg"
};

var HomeCityIndex = React.createClass({
  getInitialState: function() {
    return { homeCities: [] };
  },
  componentDidMount: function() {
    this.listener = HomeCityStore.addListener(this.updateHomeCities);
    ClientActions.fetchAll({
      url: "/api/home_cities",
      type: "ALL_CITITES"
    });
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  updateHomeCities: function(){
    this.setState({homeCities: HomeCityStore.all()});
  },
  handleClick: function(e){
    e.preventDefault();
    var cityName = e.target.textContent;
    if (cityName === ""){
      cityName = e.currentTarget.textContent;
    }
    var id = HomeCityStore.findIdOf(cityName);
    hashHistory.push('/home_cities/' + id);
  },
  render: function() {
    var cities = [];
    this.state.homeCities.forEach(function(city){
      cities.push(
        <li onClick={this.handleClick}
          key={city.name}
        >
          <img src={img_URLs[city.name]}/>
          <p>{city.name}</p>
        </li>);
    }.bind(this));

    return (
      <div>
        <h2>Pick Your City:</h2>
        <ul className="home-city-index">{cities}</ul>
      </div>
    );
  }

});

module.exports = HomeCityIndex;
