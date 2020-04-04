import React, { useState, useEffect, useRef } from "react";
import Timer from "../Game/Timer";
import SignatureCanvas from "react-signature-canvas";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import fire from "../../fire";
import Buttons from "./Buttons";
import HandleResponses from "./HandleResponses";

const db = fire.database();

const SigCanvas = props => {
  const { session, uid, code } = props;
  const [color, setColor] = useState("#2D1E2F");
  const [submitted, setSubmitted] = useState(false);
  const sigCanvas = useRef({});
  let timeout;

  const saveCanvas = () => {
    const imageURL = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    //saving that in db
    db.ref(`gameSessions/${code}/players/${uid}`).update({
      drawing: imageURL
    });

    //for front end testing purpose (eventually backend will handle this):
    db.ref(`gameSessions/${code}`).update({
      status: "guessing",
      turn: uid,
      turnTimeStarted: Date.now()
    });
  };

  useEffect(() => {
    timeout = setTimeout(function() {
      console.log("setTimeout");
      saveCanvas();
      setSubmitted(true);
    }, 5000);
    //unsubscribing:
    return () => {
      console.log("unsubscribe");
      clearTimeout(timeout);
    };
  }, []);

  const handleClick = () => {
    console.log("handle click");
    clearTimeout(timeout);
    saveCanvas();
    setSubmitted(true);
  };

  if (submitted) {
    return <h4>Your response has been submitted</h4>;
  }
  return (
    <Container>
      <Row>
        <Col xs={6} md={4} /* how can we move the timer further left.. */>
          <Timer roundTime={session.turnTimeStarted} time={5} />
        </Col>
        <Col xs={12} md={8}>
          <Container>
            <Row>
              <h3>draw it ✎</h3>
            </Row>
            <Row>
              <SignatureCanvas
                penColor={color}
                canvasProps={{
                  width: 600,
                  height: 400,
                  className: "sigCanvas"
                }}
                backgroundColor="#FCFAE3"
                ref={sigCanvas}
              />
            </Row>
            <Row>
              <Buttons
                handleClick={handleClick}
                setColor={setColor}
                sigCanvas={sigCanvas}
              />
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default SigCanvas;