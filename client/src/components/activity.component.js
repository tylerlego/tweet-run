import React, { Component } from 'react';
import moment from 'moment';

export default class Activity extends Component {
    constructor(props) {
      super(props);
  
      this.metersToMiles = this.metersToMiles.bind(this);
    }
  
    metersToMiles(meters) {
      return (meters * 0.000621).toFixed(2);
    }
  
    render(props) {
      return (
        <div className="activity-div">
          <h3>{this.props.activity.name}</h3>
          <p>{moment(this.props.activity.start_date).format('MMMM Do YYYY, h:mm a')}</p>
          <p>Distance: {this.metersToMiles(this.props.activity.distance)} miles</p>
        </div>
      )
    }
  }
  