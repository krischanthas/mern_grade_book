import React, { Fragment } from "react";
// bootstrap
import { Jumbotron, Button, CardDeck, Card, Container } from 'react-bootstrap';

export default function Home() {
      return (
            <Fragment>
                  <div className="hero-container">
                        <div className="hero">
                              <img src="blackboard.jpg" alt="blackboard.jpg" />
                        </div>
                  </div>

                  <Jumbotron className="jumbo">
                        <div>
                              <h1>Gradebook</h1>
                              <p>A simplified web portal for educators and students to stay up to date.</p>
                              <Button variant="primary">Learn more</Button>
                        </div>
                  </Jumbotron>
                  <Container>
                        <CardDeck className="mt-4 mb-4">
                              <Card className="shadow p-3 mb-5 bg-white rounded">
                                    <Card.Img variant="top" src="carddeck-1.jpg" />
                                    <Card.Body>
                                          <Card.Title>Access on the go</Card.Title>
                                          <Card.Text>
                                                Sign in and view grades from any device.
                                    </Card.Text>
                                    </Card.Body>

                              </Card>
                              <Card className="shadow p-3 mb-5 bg-white rounded">
                                    <Card.Img variant="top" src="carddeck-2.jpg" />
                                    <Card.Body className="mt-5">
                                          <Card.Title>Stay in the loop</Card.Title>
                                          <Card.Text>
                                                Provide peace of mind with a simple portal to keep students up to date.
                                    </Card.Text>
                                    </Card.Body>
                              </Card>
                              <Card className="shadow p-3 mb-5 bg-white rounded">
                                    <Card.Img variant="top" src="carddeck-3.jpg" />
                                    <Card.Body>
                                          <Card.Title>Live Grades</Card.Title>
                                          <Card.Text>
                                                Post and update grades at the click of a button.
                                    </Card.Text>
                                    </Card.Body>
                              </Card>
                        </CardDeck>
                  </Container>
            </Fragment>
      );
}
