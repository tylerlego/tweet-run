import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Card, Button, Modal } from 'react-bootstrap';
import moment from 'moment';

export default class TweetModal extends Component {
  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);
  }
 
  renderTweetInfo() {
    let tweetInfo = [];


    for (let tweet of this.props.tweets.reverse()) {
      let tweet_link;
      let tweet_date = moment(tweet.created_at).format('MMMM Do YYYY');
      let tweet_time = moment(tweet.created_at).format('h:mm:ss a');

      if (tweet.urls[0]) {
        let url = {
          pathname: tweet.urls[0].expanded_url
        }

        tweet_link = url.pathname;
      } 

      tweetInfo.push(
        <Card key={tweet.id}>
          <Card.Body>
            <Card.Title>{ tweet_date }</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{ tweet_time }</Card.Subtitle>
            <Card.Text>
              { tweet.text }
            </Card.Text>
            <Card.Link className="btn btn-small btn-success" href={tweet_link} target="_blank">View Tweet</Card.Link>
          </Card.Body>
        </Card>
      )
    }

    return tweetInfo;
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="md"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Tweets For Activity:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="tweet-modal-body">
          { this.renderTweetInfo() }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => { this.props.onHide() }}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


