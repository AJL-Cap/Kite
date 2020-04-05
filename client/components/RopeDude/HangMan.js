import React from "react";
import images from "../../images/images";
import Card from "react-bootstrap/Card";

const HangMan = props => {
  const { session } = props;
  const points = session.points;

  return (
    <Card style={{ width: "100px", padding: "10px" }} border="dark">
      <Card.Img src={images[points / 20]} alt="Card image" />
    </Card>
  );
};

export default HangMan;
