import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import RegisterNewOpalCard from './RegisterNewOpalCard';
import ViewAllOpalCards from "./ViewAllOpalCards";
import SearchOpalCards from "./SearchOpalCards";
import UpdateDetails from "./UpdateDetails";
import DeleteOpalCard from "./DeleteOpalCard";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <Router>
      <Jumbotron fluid>
        <Container>
        <h1> What would you like to do today? </h1>
        <ul>
          <li><Link to="/register-new-opal-card">Register New Opal Card</Link></li>
          <li><Link to="/view-all-opal-cards">View All Opal Cards</Link></li>
          <li><Link to="/search-for-opal-card">Search for a specific Opal Card</Link></li>
          <li><Link to="/delete-opal-card">Delete Opal Card</Link></li>
        </ul>
        </Container>
        </Jumbotron>
        <hr />
        <Switch>
          <Route path="/register-new-opal-card">
            <RegisterNewOpalCard />
          </Route>
          <Route path="/view-all-opal-cards">
            <ViewAllOpalCards />
          </Route>
          <Route path="/search-for-opal-card">
            <SearchOpalCards />
          </Route>
          <Route path={"/update-details/:id"}>
              <UpdateDetails />
          </Route>
          <Route path={"/opal-cards/delete/:id"}>
            <DeleteOpalCard />
          </Route>
        </Switch>
    </Router>
  );
}
