import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./redux/utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./redux/actions/authActions";
import { Provider } from "react-redux";
import store from "./redux/store";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/profile/Dashboard";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Main from "./components/search/Main";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds expierd
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // browser history window
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      //state provider from redux
      <Provider store={store}>
        <Router>
          <div>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route exact path="/" component={Main} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
