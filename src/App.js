import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/register/Login";
import Header from "./components/main/Header";
import Admin from "./components/admin/Admin";
// import Profile from "./components/profile/Profile";
import ViewRides from "./components/view/viewRides";
import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <div className="main">
          
          <div className="contents">
            <Switch>
              <Route path="/register" exact={true}>
                <Register/>
              </Route>

              <Route path="/login" exact={true}>
                <Login/>
              </Route>

              <Route path="/admin" exact={true}>
                <Header/>
                <Admin/>
              </Route>
              
              <Route path="/view" exact={true}>
                <Header/>
                <ViewRides/>
              </Route>

              {/* <Route path="/profile/:id" exact={true}>
                <Header/>
                <Profile/>
              </Route> */}

              <Route path="/" exact={true}>
                <Redirect to="/login"/> 
              </Route>

              <Route path="*">
                <Header/>
                No Match Found
              </Route>

              
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
