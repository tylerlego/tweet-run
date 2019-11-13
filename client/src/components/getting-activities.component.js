import React, { Component } from 'react';
import { Container, Jumbotron } from "react-bootstrap";

export default class GettingActivities extends Component {
    render(props) {
      return (
        <Container>
          <Jumbotron>        
            <h1 className="display-4">Getting Activities</h1>
          </Jumbotron>
        </Container> 
      )
    }
  }