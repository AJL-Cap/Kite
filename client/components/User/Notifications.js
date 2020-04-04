import React from "react";
import fire from "../../fire";
import { useObjectVal, useListVals } from "react-firebase-hooks/database";
import { Dropdown, Badge, Nav } from "react-bootstrap";
import SingleNotif from "./SingleNotif";

const db = fire.database();
const Notifications = props => {
  const { uid } = props;
  const [notifs, loading, error] = useObjectVal(db.ref(`notifications/${uid}`));
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
