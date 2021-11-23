import React, { useState, useEffect } from 'react';
import {useRouteMatch} from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import {LinkContainer} from "react-router-bootstrap";

export default function ViewAllOpalCards() {

    const[opalCards, setOpalCards] = useState([]);

    let {path, url} = useRouteMatch();

    //getting the data from the server    
    useEffect(() => {
        fetch("http://localhost:4000/opal-cards")
        .then(response => response.json())
        .then(data => setOpalCards(data))
    }, []);


    function opalCardDetails(){

        return(
        opalCards.map(c => (
            <div>
               <ul>
                    <h3>Card Details</h3>
                    <li>Card Number: {c.id}</li>
                    <li>Card Name: {c.firstName} {c.lastName}</li>
                    <li>Current Balance: ${c.balance}</li>
                </ul> 
                <div>
                    <LinkContainer to={`/update-details/${c.id}`} >
                        <Button variant ="primary" className="m-2">Update Details Button for: {c.firstName} {c.lastName} </Button>
                    </LinkContainer>
                    <LinkContainer to={`/opal-cards/delete/${c.id}`} >
                        <Button variant ="primary">Delete Opal Card for: {c.firstName} {c.lastName} </Button>
                    </LinkContainer>
                </div>
                <hr />
            </div>
        ))
        )};

    return (
        <div>
            <Jumbotron fluid>
                <h1>View Opal Cards</h1>
            </Jumbotron>
            {opalCardDetails()}
            

        </div>
    )};