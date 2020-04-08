import React, { useEffect } from "react";
import fire from "../../fire";
import { useObjectVal, useListVals } from "react-firebase-hooks/database";
import { Dropdown, Badge, Nav } from "react-bootstrap";
import SingleNotif from "./SingleNotif";
import UIfx from "uifx";
import sound from "../../audio/ding_high.wav";

const db = fire.database();
const Notifications = props => {
  const ding = new UIfx(sound, {
    volume: 0.1, // number between 0.0 ~ 1.0
    throttleMs: 50
  });
  const { uid } = props;
  const [notifs, loading, error] = useObjectVal(db.ref(`notifications/${uid}`));

  useEffect(() => {
    db.ref(`notifications/${uid}`).on("child_added", newNotfi => ding.play());
  }, []);

  if (loading)
    return (
      <Dropdown.Toggle as={Nav.Link}>
        Notifications <Badge variant="light">⋯</Badge>
      </Dropdown.Toggle>
    );
  if (error) return "ERROR";
  let notifKeys;
  if (notifs) {
    notifKeys = Object.keys(notifs);
  }

  return (
    <div>
      <Dropdown.Toggle as={Nav.Link}>
        Notifications{" "}
        <Badge variant="light">{notifs ? notifKeys.length : 0}</Badge>
        <span className="sr-only">Unread Notifications</span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="alert-info border border-dark">
        {notifs ? (
          notifKeys.map(notif => (
            <div key={notif} style={{ width: "350px" }}>
              <SingleNotif notif={notifs[notif]} id={notif} uid={uid} />
            </div>
          ))
        ) : (
          <p className="m-1 bg-light text-center">No notifications</p>
        )}
      </Dropdown.Menu>
    </div>
  );
};

export default Notifications;
