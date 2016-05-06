var React = require('react');

var WorkoutInfo = React.createClass({
  parseTime: function(str){
    if (str.length > 3) {
      return (str.split("T")[1].slice(0,8));
    } else {
      return "12:00";
    }
  },
  parseDate: function(date){
    if (date) {
      return date;
    } else {
      var d = new Date();
      var yr = d.getYear() + 1900;
      var month = d.getMonth() + 1;
      var day = d.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      return ([yr,month,day].join("-"));
    }
  },
  getInitialState: function() {
    var time = this.parseTime(this.props.info.time);
    var date = this.parseDate(this.props.info.date);
    return {
      name: this.props.info.name,
      date: date,
      time: time
    };
  },
  handleChange: function(type){
    return function(e){
      var updateAttrs = {};
      updateAttrs[type] = e.target.value;
      this.setState(updateAttrs);
      this.props.updateWorkout(updateAttrs);
    }.bind(this);
  },
  render: function(){
    return (
      <table className="workout-info">
        <tbody>
          <tr>
            <td>
              Workout Name:
            </td>
            <td>
              <input
                type='text'
                value={this.state.name}
                onChange={this.handleChange("name")}/>
            </td>
          </tr>
          <tr>
            <td>
              Date:
            </td>
            <td>
              <input
               type='date'
               value={this.state.date}
               onChange={this.handleChange("date")}/>
            </td>
          </tr>
          <tr>
            <td>
              Time:
            </td>
            <td>
              <input
                type='time'
                placeholder="Time"
                value={this.state.time}
                onChange={this.handleChange("time")}/>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
});

module.exports = WorkoutInfo;
