import React, { Component } from 'react';
import TweetRun from './tweet-run.component';

export default class ActivityList extends Component {
    constructor(props) {
      super(props);
    }

    renderTweetRun() {
      let elements = []; 
         
      for (let i = 0; i < this.props.data.activities.length; i++) {
        let activity = this.props.data.activities[i];
  
        elements.push(
          <div className="col-md-6 col-lg-4 activity-card" key={i} >
            <TweetRun data={activity}/>
          </div>
        );
      }
  
      return elements;
    }

    render() {
      console.log(this.props.data);
      return ( 
          <div className="container">
            <div className="jumbotron">        
              <h1 className="display-4">Recent Activities:</h1>
            </div>
            <div className="row">
              {this.renderTweetRun()}
            </div>
          </div> 
      )
    }
  }