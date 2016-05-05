var React = require('react');
var ReactDOM = require('react-dom');
var hashHistory = require('react-router').hashHistory;
var geocoder = new google.maps.Geocoder();

function _getCoordsObj(latLng) {
  return {
    lat: latLng.lat(),
    lng: latLng.lng()
  };
}

var mapOptions = {
  "San Francisco" : {
    center: {lat: 37.783972, lng: -122.405297}, //San Francisco
    zoom: 14
  },
  "New York" : {
    center: {lat: 40.7478201, lng: -73.9894112},
    zoom: 13
  },
  "Los Angeles" : {
    center: {lat: 34.0165323, lng: -118.4581099}, //San Francisco
    zoom: 12
  },
  "Boston" : {
    center: {lat: 42.3539036, lng: -71.060599}, //San Francisco
    zoom: 14
  }

};

var NotMap = React.createClass({
  componentDidMount: function(){
    var map = ReactDOM.findDOMNode(this.refs.map);
    this.map = new google.maps.Map(map, mapOptions[this.props.cityName]);
    this.registerListeners();
    this.markers = [];
    this.eachGym(this.createMarkerFromGym);
  },
  componentWillReceiveProps: function(nextProps) {
    var map = ReactDOM.findDOMNode(this.refs.map);
    this.map = new google.maps.Map(map, mapOptions[nextProps.cityName]);
    this.registerListeners();
    this.markers = [];
    this.eachGym(this.createMarkerFromGym);
  },
  eachGym: function(callback){
    var gyms = this.props.gyms;
    var keys = Object.keys(gyms);
    keys.forEach(function(key){
      callback(gyms[key]);
    });
  },

  componentDidUpdate: function () {
    this._onChange();
  },

  _onChange: function(){
    var gymsToAdd = [];
    var markersToRemove = [];
    //Collect markers to remove
    this.markers.forEach(function(marker){
      if (!this.props.gyms.hasOwnProperty(marker.gymId)){
        markersToRemove.push(marker);
      }
    }.bind(this));
    // Collect gyms to add
    var currentGymIds = this.markers.map(function(marker){
      return marker.id;
    });
    this.eachGym(function(gym){
      if (!currentGymIds.includes(gym.id)){
        gymsToAdd.push(gym);
      }
    });
    //Do the adding / removing
    gymsToAdd.forEach(this.createMarkerFromGym);
    markersToRemove.forEach(this.removeMarker);
  },
  registerListeners: function(){
    var that = this;
    google.maps.event.addListener(this.map, 'idle', function() {
      var bounds = that.map.getBounds();
      var northEast = _getCoordsObj(bounds.getNorthEast());
      var southWest = _getCoordsObj(bounds.getSouthWest());
      //actually issue the request
      bounds = {
        northEast: northEast,
        southWest: southWest
      };
    });
    // google.maps.event.addListener(this.map, 'mouseover', function(event) {
    //   var coords = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    //   // that._handleClick(coords);
    //   debugger
    // });
  },
  createMarkerFromGym: function (gym) {
    var lat, lng;
    var self = this;
    geocoder.geocode( { 'address': gym.address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();
        var pos = new google.maps.LatLng(lat, lng);
        var marker = new google.maps.Marker({
          position: pos,
          map: self.map,
          gymId: gym.id,
          icon: {
            url: gym.logo_url,
            scaledSize:  new google.maps.Size(50,50)
          }
        });
        marker.addListener('click', function () {
          hashHistory.push("gyms/" + gym.id );
        });
        marker.addListener('mouseover', function(){

        })
        self.markers.push(marker);
      }
    });
  },
  render: function(){
    return ( <div className="half" ref="map">Map</div>);
  }
});

module.exports = NotMap;
