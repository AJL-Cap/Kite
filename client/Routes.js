import React from "react";
import fire from "./fire";
import { Route, Switch } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Home,
  Login,
  SignUp,
  Players,
  Profile,
  GamePage,
  ActiveGame,
  NotFound,
  Loading,
  Form,
  FriendProfile,
  ViewGames
} from "./components";
import EditProfile from "./components/User/EditProfile";

export default function Routes() {
  const [user, initialising, error] = useAuthState(fire.auth());

  if (initialising) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <Switch>
      {user ? (
        <Switch>
          <Route
            path="/games/:code"
            render={props => <ActiveGame userId={user.uid} {...props} />}
          />
          <Route
            path="/profile/edit"
            render={props => <EditProfile userId={user.uid} {...props} />}
          />
          <Route exact path="/profile/:uid" component={FriendProfile} />
          <Route path="/players" component={Players} />
          <Route
            exact
            path="/profile"
            render={props => <Profile userId={user.uid} {...props} />}
          />
          <Route
            path="/games"
            render={props => <GamePage userId={user.uid} {...props} />}
          />
          <Route
            path="/form"
            render={props => <Form userId={user.uid} {...props} />}
          />
          <Route path="/:anythingElse" component={NotFound} />
          <Route
            exact
            path="/"
            render={props => <Home userId={user.uid} {...props} />}
          />
        </Switch>
      ) : (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/viewGames" component={ViewGames} />
          <Route path="/:anythingElse" component={NotFound} />
          <Route exact path="/" component={Home} />
        </Switch>
      )}
    </Switch>
  );
}
