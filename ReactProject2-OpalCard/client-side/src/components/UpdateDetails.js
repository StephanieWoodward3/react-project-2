import React, { useState, useEffect } from 'react';
import {Switch, Route, useParams, useRouteMatch} from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import {LinkContainer} from "react-router-bootstrap";

export default function UpdateDetails() {

    let {path, url} = useRouteMatch();
    let {id} = useParams();

    const[oneOpalCard, setOneOpalCard] = useState();
    const[balance, setBalance] = useState();
    const[firstName, setFirstName] = useState();
    const[lastName, setLastName] = useState();
    const[street, setStreet] = useState();
    const[suburb, setSuburb] = useState();
    const[addressState, setAddressState] = useState();
    const[postCode, setPostCode] = useState();

    //get the info from the server for the requested individual
    useEffect(() => {
        fetch(`http://localhost:4000/opal-cards/${id}`)
        .then(response => response.json())
        .then(data => setOneOpalCard(data))
    }, [oneOpalCard]);

    //change Name
    function changeName(){
        debugger;
        fetch(`http://localhost:4000/opal-cards/change-name/${id}`, {
            method:"PUT",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({firstName:firstName, lastName:lastName})
        })
        .then((response) => response.json())
        .then(json => {
            if(json.status ===200){
                setOneOpalCard(json);
            } else {
                alert("There was an error posting the Change of Name to the server");
            }
        })
    }

    //change address
    function changeAddress(){
        fetch(`http://localhost:4000/opal-cards/change-address/${id}`, {
            method:"PUT",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({street:street, suburb:suburb, addressState:addressState, postCode:postCode})
        })
        .then((response) => response.json())
        .then(json => {
            if(json.status ===200){
                setOneOpalCard(json);
            } else {
                alert("There was an error posting the Change of Name to the server");
            }
        })
    }

    //Process the Card Top Up
    function topUpBalance(){
        //send the updated info to the server
        fetch(`http://localhost:4000/opal-cards/top-up/${id}`,{
            method:"PUT",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({topUpAmt:balance})
        })
        .then((response)=> response.json())
        .then(json => {
            if(json.status === 200){
                setOneOpalCard(json);
            } else {
                alert("There was an error posting to the server");
            }
        })
    }
    
    //displays the current Tap status
    function tapStatus(){
        if(oneOpalCard.tappedOn){
            return <div>Current Tap Status: Tapped ON </div>
        } else {
            return <div>Current Tap Status: Tapped Off </div>
        }
    }

    //Deducts the money from the balance
    function tapButtonClicked(){
        //when the button is clicked. if status is tapped off call the alert
        if(oneOpalCard.tappedOn === false){
            let tbc = window.confirm("Are you sure you wish to tap, your account will be charged when you tap off");
            //if the user selects ok to the alert
            if(tbc){
                            //send the updated info to the server
                    fetch(`http://localhost:4000/opal-cards/process-tap/${id}`,{
                        method:"PUT",
                        headers: {"content-type": "application/json"},
                        body: JSON.stringify(oneOpalCard)
                    })
                    .then((response)=> response.json())
                    .then(json => {
                        if(json.status === 200){
                            setOneOpalCard(json);
                        } else {
                            alert("There was an error posting to the server");
                        }
                    })
            }
        } else {
            //send the updated info to the server
            fetch(`http://localhost:4000/opal-cards/process-tap/${id}`,{
                method:"PUT",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(oneOpalCard)
            })
            .then((response)=> response.json())
            .then(json => {
                if(json.status === 200){
                    setOneOpalCard(json);
                } else {
                    alert("There was an error posting to the server");
                }
            })
        }
    }


    return(
        <div>
            {oneOpalCard && 
            <div>
            <Jumbotron fluid>
                <h1> Update Details For {oneOpalCard.firstName} {oneOpalCard.lastName}</h1>
            </Jumbotron>
            <div>
                <h3>Current Name</h3>
                <p>First Name: {oneOpalCard.firstName}</p>
                <p>Last Name: {oneOpalCard.lastName}</p>
                <LinkContainer to={`${url}/change-name`} >
                    <Button variant ="primary">Change Name </Button>
                </LinkContainer>
            </div>
            <div>
                <Switch>
                    <Route path={`${path}/change-name`}>
                        <h3>Please enter correct Details</h3>
                        <input placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>
                        <input placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>
                        <button onClick={changeName}>Submit Change of Name</button>
                    </Route>
                </Switch>
            </div>
            
            <hr></hr>
            <div>
                <h3>Current Address</h3>
                <p>Street: {oneOpalCard.street}</p>
                <p>Suburb: {oneOpalCard.suburb}</p>
                <p>State: {oneOpalCard.addressState}</p>
                <p>Post Code: {oneOpalCard.postCode}</p>
                <LinkContainer to={`${url}/change-address`} >
                    <Button variant ="primary">Change Address </Button>
                </LinkContainer>
            </div>
            <div>
                <Switch>
                    <Route path={`${path}/change-address`}>
                        <h3>Please enter correct Address</h3>
                        <p><input placeholder="Street" onChange={(e) => setStreet(e.target.value)}/></p>
                        <p><input placeholder="Suburb" onChange={(e) => setSuburb(e.target.value)}/></p>
                        <p><input placeholder="State" onChange={(e) => setAddressState(e.target.value)}/></p>
                        <p><input placeholder="PostCode" onChange={(e) => setPostCode(e.target.value)}/></p>
                        <button onClick={changeAddress}>Submit Change of Address</button>
                    </Route>
                </Switch>
            </div>
            <hr></hr>
            <div>
                <h3> Balance</h3>
                <p>Current Balance: ${oneOpalCard.balance}</p>
                <LinkContainer to={`${url}/update-balance`} >
                    <Button variant ="primary">Update Balance </Button>
                </LinkContainer>
            </div>
            <div>
                <Switch>
                    <Route path={`${path}/update-balance`}>
                        <h3>Please enter the amount to top the card up with</h3>
                        $<input placeholder="Top Up Amount" onChange={(e) => setBalance(e.target.value)}/>.00
                        <button onClick={topUpBalance}>Submit</button>
                    </Route>
                </Switch>
            </div>
            <hr></hr>
            <div>
                <h3> Tap On/Off Status </h3>
                {tapStatus()}
                <LinkContainer to={`${url}/tap-on-off`} >
                    <Button onClick={tapButtonClicked} variant ="primary">Tap </Button>
                </LinkContainer>
            </div>
            <div>
                <Switch>
                    <Route path={`${path}/tap-on-off`}>
                    </Route>
                </Switch>
            </div>
            <hr></hr>
            
        </div>}
        </div>
    )}