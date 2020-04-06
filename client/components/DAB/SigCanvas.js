import React, { useState, useRef, useEffect } from "react";
import Timer from "../Game/Timer";
import SignatureCanvas from "react-signature-canvas";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import fire from "../../fire";
import Buttons from "./Buttons";
import UIfx from "uifx";
import sound from "../../audio/turn.wav";
import sound2 from "../../audio/transition.wav";

const db = fire.database();

const SigCanvas = props => {
  const timeToDraw = new UIfx(sound, {
    volume: 0.5, // number between 0.0 ~ 1.0
    throttleMs: 50
  });
  const sent = new UIfx(sound2, {
    volume: 0.4, // number between 0.0 ~ 1.0
    throttleMs: 50
  });
  const { session, uid, code } = props;
  const [color, setColor] = useState("#2D1E2F");
  const [submitted, setSubmitted] = useState(false);
  const sigCanvas = useRef({});
  let timeout;
  useEffect(() => {
    timeToDraw.play();
    timeout = setTimeout(function() {
      sent.play();
      const imageURL = sigCanvas.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      //saving that in db
      db.ref(`gameSessions/${code}/players/${uid}`).update({
        drawing: imageURL
      });
    }, 45000);
    return function cleanup() {
      clearTimeout(timeout);
    };
  }, []);

  const handleClick = () => {
    sent.play();
    clearTimeout(timeout);
    //converting the drawing to url
    const imageURL = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    //saving that in db
    db.ref(`gameSessions/${code}/players/${uid}`).update({
      drawing: imageURL
    });
    setSubmitted(true);
  };
  if (submitted) {
    return <h4>Your response has been submitted</h4>;
  }
  return (
    <Container>
      <Row>
        <Col xs={6} md={4}>
          <Timer roundTime={session.turnTimeStarted} time={45} />
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
