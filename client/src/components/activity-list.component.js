import React, { Component } from 'react';
import axios from 'axios';
import querystring from 'querystring';
import Activity from './activity.component';
import Tweet from './tweet.component';
import TweetRun from './tweet-run.component';

export default class ActivityList extends Component {
  constructor(props) {
    super(props);
    
    this.getAuth = this.getAuth.bind(this);
    this.getAndSetActivities = this.getAndSetActivities.bind(this);
    this.getAndSetTweets = this.getAndSetTweets.bind(this);
    this.setTweetsInActivities = this.setTweetsInActivities.bind(this);
    this.inRange = this.inRange.bind(this);

    this.state = {
      activities: [],
      tweets: []
    };
  }

  componentDidMount() {
    let data = querystring.parse(window.location.search);
    let token = data['?t']; 

    if (!token) {
      this.getAuth();
    } else {
      this.getAndSetActivities(token);
      this.getAndSetTweets();
    }    
  }

  getAuth() {
    axios.get("/api/auth")
    .then(function(res) {
      console.log("no token");
      window.location = res.data; 
    });
  }
    
  getAndSetActivities(token) {
    axios.get('http://192.168.1.103:5000/api/activities', { 
      params: {
        't': token
      }
    })
    .then(response => {
      let activities = response.data;

      this.setState({
        activities: activities
      });
    })
    .catch(error => {
      console.log(error);
      //display message that token is bad, reload page
    });
  }

  getAndSetTweets(max_id = 0) {
    let url = "http://192.168.1.103:5000/api/tweets/";

    axios.get(url + max_id)
    .then(response => {
      let currentState = this.state.tweets;
      let tweets = currentState.concat(response.data);
      let activities = this.state.activities;

      this.setState({
        tweets: tweets
      });
      let oldest_act = activities[activities.length - 1];
      let oldest_tweet = tweets[tweets.length - 1];

      if (oldest_act.start_date < oldest_tweet.created_at) {
        this.getAndSetTweets(oldest_tweet.id);
      } else {
        console.log("Enough tweets loaded!");
        tweets = this.state.tweets;
        activities = this.state.activities;

        this.setTweetsInActivities(activities, tweets);
      }

    })
    .catch(error => {
      console.log("Cannot get tweets: " + error);
    });
  }

  inRange(tweet_created_at, activity) {
    // HANDLE TIMEZONES HERE
    if (tweet_created_at > activity.start_date && tweet_created_at < activity.end_date){
      return true;
    }
  }

  setTweetsInActivities(activities, tweets) {
    for (let i = 0; i < tweets.length; i++) {
      let created_at = tweets[i].created_at;
      for (let j = 0; j < activities.length; j++) {
        if (this.inRange(created_at, activities[j])) {
          activities[j].tweets.push(tweets[i]);
        }
      }
    }

    this.setState({
      activities: activities
    })
  }

  renderActivities() {
    const activities = this.state.activities;
    var elements = [];

    if (activities.length > 0) {
      for(var i = 0; i < 5; i++){
        elements.push(<Activity 
                        activity={activities[i]} 
                        key={i}/>
        );
      }
    }

    return elements;
  }

  renderTweets() {
    const tweets = this.state.tweets;
    var elements = [];

    if (tweets.length > 0) {
      for(var i = 0; i < 5; i++){
        elements.push(<Tweet 
                        tweet={tweets[i]} 
                        key={i}/>
        );
      }
    }

    return elements;
  }

  renderTweetRun() {
    let elements = []; 
      
      for (let i = 0; i < this.state.activities.length; i++) {
        let activity = this.state.activities[i];

        elements.push(
          <div className="col-md-6 col-lg-4 activity-card" key={i} >
            <TweetRun data={activity}/>
          </div>
        );
      }
      return elements;
    }
    

  render() {
    return ( 
      <div className="container">
        <div className="jumbotron">        
        <h1 className="display-4">Recent Activities:</h1>
        </div>
        <div className="row">
          {this.renderTweetRun()}
        </div>
        {/*this.renderActivities()*/}
        {/*this.renderTweets()*/}
      </div> 
    )
  }
}


