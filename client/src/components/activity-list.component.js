import React, { Component } from 'react';
import { Container, Row, Col, Button, Card, CardGroup } from 'react-bootstrap';
import moment from 'moment';
import TweetModal from './tweet-modal.component';

export default class ActivityList extends Component {
    constructor(props) {
      super(props);

      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);

      this.state = {
        show: false,
        activity_tweets: []
      };
    }

    handleClose() {
      this.setState({ 
        show: false,
        activity_tweets: []
      });
    }

    handleShow(index) {
      this.setState({ 
        show: true, 
        activity_tweets: this.props.data.activities[index].tweets
      });
    }

    renderCardGroup() {
      let elements = []; 
         
      for (let i = 0; i < this.props.data.activities.length; i++) {
        let activity = this.props.data.activities[i];
  
        let numTimesString = '';
        if (activity.tweets) {
          let times = activity.tweets.length  
          numTimesString = 'Donald Trump tweeted ' + times + ' times!';
        }

        elements.push(
          <Col lg={4} key={i} >
            <Card className="strava-card">
              <Card.Header className="strava-card-header">{activity.name}</Card.Header>
              <Card.Body className="strva-card-body">
                <Card.Title className="strava-card-title">{moment(activity.start_date).format('MMMM Do YYYY')}</Card.Title>
                <Card.Text className="strava-card-text">
                  {moment(activity.start_date).format('h:mm a')} - {moment(activity.end_date).format('h:mm a')}
                  <br />
                  {numTimesString}
                </Card.Text>
                <Button variant="warning" onClick={() => { this.handleShow(i) }}>View Tweets</Button>  
              </Card.Body>
            </Card>
          </Col>
        );
      }
  
      return elements;
    }

    render() {
      return ( 
          <Container>
            <Row>
              <CardGroup>
                {this.renderCardGroup()}  
              </CardGroup>
              <TweetModal 
                show={this.state.show} 
                onHide={this.handleClose}
                tweets={this.state.activity_tweets}
              />
                {/* props should contain data for selected card. add selected card to list state */}
            </Row>
          </Container> 
      )
    }
  }
