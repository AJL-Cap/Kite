import React, { useState, useRef } from "react";
import Timer from "../Game/Timer";
import SignatureCanvas from "react-signature-canvas";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import fire from "../../fire";

const db = fire.database();

const SigCanvas = props => {
  const { session, uid, code } = props;
  const [submitted, setSubmitted] = useState(false);
  const sigCanvas = useRef({});

  const handleClick = () => {
    //converting the drawing to url
    const imageURL = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png");

    //saving that in db
    db.ref(`gameSessions/${code}/players/${uid}`).update({
      drawing: imageURL
    });
    setSubmitted(true);

    //setting the turn to oneself, resetting time & status to guessing: this is solely for front end testing (backend will eventually take care of assigning turns)
    db.ref(`gameSessions/${code}`).update({
      status: "guessing",
      turn: uid,
      turnTimeStarted: Date.now()
    });
  };

  if (submitted) {
    return <h4>Your response has been submitted</h4>;
  }
  return (
    <Container>
      <Row>
        <Col xs={6} md={4} /* how can we move the timer further left.. */>
          <Timer roundTime={session.turnTimeStarted} time={60} />
        </Col>
        <Col xs={12} md={8}>
          <h3>DAB it ✎</h3>
          <SignatureCanvas
            penColor="#2D1E2F"
            canvasProps={{ width: 600, height: 600, className: "sigCanvas" }}
            backgroundColor="#FCFAE3"
            ref={sigCanvas}
          />
        </Col>
      </Row>
      <button type="button" onClick={() => sigCanvas.current.clear()}>
        Reset Canvas
      </button>
      <button type="button" onClick={handleClick}>
        Submit your art!
      </button>
    </Container>
  );
};

export default SigCanvas;
