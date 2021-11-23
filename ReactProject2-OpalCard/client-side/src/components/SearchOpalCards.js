import React, { useState, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import {LinkContainer} from "react-router-bootstrap";

export default function SearchOpalCards() {


    const[ocNumber, setOcNumber] = useState(undefined);
    const[filteredOpalCards, setFilteredOpalCards] = useState();

    //gets the Data from the Server already filtered by Opal Card Number
    useEffect(() =>{
        fetch(`http://localhost:4000/opal-cards/${ocNumber}`)
        .then(response => response.json())
        .then(data => setFilteredOpalCards(data))
    }, [ocNumber]);


    function tapStatus(){
        if(filteredOpalCards.tappedOn){
            return <li>Tapped Status: Tapped ON </li>
        } else {
            return <li>Tapped Status: Tapped OFF </li>
        }
    }

    function displaySelectedOpalCards(){
        if(ocNumber == undefined){
            return (
                <div>
                </div>
            )
        } else {
            return (
                    <div>
                        <ul>
                            <h3> Opal Card </h3>
                            <li>Card Number: {filteredOpalCards.id}</li>
                            <li>Card Name: {filteredOpalCards.firstName} {filteredOpalCards.lastName}</li>
                            <li>Date Of Birth: {filteredOpalCards.dob}</li>
                            <li>Address: {filteredOpalCards.street} {filteredOpalCards.suburb} {filteredOpalCards.addressState} {filteredOpalCards.postCode}</li>
                            <li>Current Balance: ${filteredOpalCards.balance}</li>
                            {tapStatus()}

                            <LinkContainer to={`/update-details/${filteredOpalCards.id}`} >
                                <Button variant ="primary" className="m-2">Update Details Button for: {filteredOpalCards.firstName} {filteredOpalCards.lastName} </Button>
                            </LinkContainer>
                            <LinkContainer to={`/opal-cards/delete/${filteredOpalCards.id}`} >
                                <Button variant ="primary">Delete Opal Card for: {filteredOpalCards.firstName} {filteredOpalCards.lastName} </Button>
                            </LinkContainer>
                        </ul>
                    </div>
                )
            }
        }

    return (
        <div className="ml-5">
            <h1> Search for Opal Card</h1>

            <p> Please type in an Opal Card Number </p>
            <input type="text" placeholder="search by opal card number" value={ocNumber} onChange={e => setOcNumber(e.target.value)}></input>

            {displaySelectedOpalCards()}
        </div>
    )};