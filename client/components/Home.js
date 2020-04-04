import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import { NavLink } from "react-router-dom";
import fire from "../fire";
import styled from "styled-components";

export default function Home({ userId }) {
  const [player, loading, error] = useObjectVal(
    fire.database().ref(`players/${userId}`)
  );

  if (loading) return "";
  if (error) return <p>Error!</p>;

  return player ? (
    <Main>
      <Text>
        <Title>Kite</Title>
        <Paragraph>near, far, wherever we are... 🪁</Paragraph>
        <br />
        <h3>Welcome {player.nickname}!</h3>
        <br />
        <Intro>
          <NavLink className="auth" to="/games">
            {" "}
            Host or join a game! 🎮
          </NavLink>
        </Intro>
      </Text>
    </Main>
  ) : (
    <Main>
      <Text>
        <Title>Kite</Title>
        <Paragraph>near, far, wherever we are... 🪁 </Paragraph>
        <br />
        <h3>Welcome!</h3>
        <br />
        <Intro>
          {" "}
          Please{" "}
          <NavLink className="auth" to="/login">
            log in{" "}
          </NavLink>{" "}
          or{" "}
          <NavLink className="auth" to="/signup">
            sign up{" "}
          </NavLink>{" "}
          to continue.
        </Intro>
      </Text>
    </Main>
  );
}

const Main = styled.div`
  background-image: url("https://png.pngtree.com/thumb_back/fw800/back_our/20190619/ourmid/pngtree-spring-kite-psd-layered-background-image_131321.jpg");
  // background: #FFFFA4;
  background-repeat: "no-repeat";
  background-size: "cover"
  background-attachment: "fixed";
  width: 100%;
  height: 1000px;
`;

const Text = styled.div`
  text-align: center;
  margin: 10px;
  color: #9d8189;
`;

const Title = styled.div`
  font-size: 70px;
  color: #ffa4a4;
`;

const Paragraph = styled.div`
  font-size: 40px;
  background: rgba(200, 200, 200, 0.15);
`;

const Intro = styled.div`
  font-size: 30px;
  color: #9d8189;
`;
