import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import { Link } from "react-router-dom";
import fire from "../fire";
import styled from "styled-components";
import Alert from "react-bootstrap/Alert";

export default function Home({ userId }) {
  const [player, loading, error] = useObjectVal(
    fire.database().ref(`players/${userId}`)
  );

  if (loading) return "";
  if (error) return <p>Error!</p>;

  return (
    <Main className="d-flex align-items-start justify-content-center">
      <Alert variant="info" className="mt-5 p-5">
        <Alert.Heading>
          Welcome to Kite Games{player && `, ${player.nickname}`}.
        </Alert.Heading>
        <p>near, far, wherever we are...</p>
        <hr />
        {player ? (
          <Link to="/games" className="auth alert-link">
            Host or join a game with your friends!
          </Link>
        ) : (
          <p>
            Please{" "}
            <Link to="/login" className="auth alert-link">
              log in
            </Link>{" "}
            or{" "}
            <Link to="/signup" className="auth alert-link">
              sign up
            </Link>{" "}
            to continue.
          </p>
        )}
      </Alert>
    </Main>
  );
}

const Main = styled.div`
  background-image: url("https://png.pngtree.com/thumb_back/fw800/back_our/20190619/ourmid/pngtree-spring-kite-psd-layered-background-image_131321.jpg");
  // background: #FFFFA4;
  background-repeat: "no-repeat";
  background-size: "cover"
  background-attachment: "fixed";
  min-height: 100%;
  min-width: 1024px;
  width: 100%;
  height: auto;
  position: fixed;
  top: 50;
  left: 0;
`;
