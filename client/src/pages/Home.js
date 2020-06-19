import React, { Fragment } from "react";
// bootstrap
import { Jumbotron, Button } from 'react-bootstrap';

export default function Home() {
      return (
            <Fragment>
                  <div className="hero-container">
                        <div className="hero">
                              <img src="blackboard.jpg" alt="blackboard.jpg" />
                              {/* <h1 className="hero-text">Gradebook</h1> */}
                        </div>
                  </div>

                  <Jumbotron className="jumbo">
                        <h1>Gradebook</h1>
                        <p>
                              A simplified web portal for educators and students to stay up to date.
                        </p>
                        <p>
                              <Button variant="primary">Learn more</Button>
                        </p>
                  </Jumbotron>
            </Fragment>
      );
}
