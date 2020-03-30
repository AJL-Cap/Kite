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
  Loading
} from "./components";

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
          <Route path="/players" component={Players} />
          <Route
            path="/profile"
            render={props => <Profile userId={user.uid} {...props} />}
          />
          <Route
            exact
            path="/games"
            render={props => <GamePage userId={user.uid} {...props} />}
          />
          <Route
            exact
            path="/"
            render={props => <Home userId={user.uid} {...props} />}
          />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}
