import React, { useState, useEffect } from 'react';
import ViewAllOpalCards from "./ViewAllOpalCards"
import Button from "react-bootstrap/Button";
import {LinkContainer} from "react-router-bootstrap";


export default function RegisterNewOpalCard(){

    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[cardType, setCardType] = useState("")
    const[street, setStreet] = useState("");
    const[suburb, setSuburb] = useState("");
    const[addressState, setAddressState] = useState("");
    const[postCode, setPostCode] = useState("");
    const[dob, setDob] = useState();

    function registerNewOpalCard(e){
        e.preventDefault()

        let newOpalCard ={
            firstName,
            lastName,
            dob,
            cardType,
            street,
            suburb,
            addressState,
            postCode
        }

        //posting the data to the server    
        fetch("http://localhost:4000/opal-card", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(newOpalCard)
        })
        .then((response)=> response.json())

    }

    let currentYear = 2020;
    let states=["NSW", "ACT", "VIC", "SA", "WA", "NT", "QLD", "TAS"];

    function whatCardType(e){
        debugger;
        setDob(e.target.value);
        let dobYear= Number(e.target.value.substr(0,4));
        if(currentYear - dobYear < 16){
            setCardType("Child");
        } else if (currentYear - dobYear >= 60){
            setCardType("Senior");
        } else {
            setCardType("Adult");
        }
    }

return (
    <div>
        <h1> Register a New Opal Card </h1>
        <form>
            <div>Enter Dob: <input type="date" id="dob" name="dob" onBlur={ whatCardType}></input></div>
            <div>First Name: <input type="placeholder" onChange={(e) => setFirstName(e.target.value)}></input></div> 
            <div>Last Name: <input type="placeholder" onChange={(e) => setLastName(e.target.value)}></input></div>

            <div>Street: <input type="placeholder" onChange={(e) => setStreet(e.target.value)}></input></div>
            <div>Suburb: <input type="placeholder" onChange={(e) => setSuburb(e.target.value)}></input></div>
            State: <select id="state" name="state" onChange={(e) =>setAddressState(e.target.value)}>
                        <option value="default">State</option>
                        {states.map((s)=><option key={s} value={s}>{s}</option>)}
                    </select>
            <div>PostCode: <input type="placeholder" onChange={(e) => setPostCode(e.target.value)}></input></div>
        </form>
    <hr />
        <div>
            <h3>Confirmation of Details</h3>
            <br />
            <h5>Card Type: {cardType}</h5>
            <br />
            <div>Date of Birth: {dob}</div> 
            <div>First Name: {firstName} </div>
            <div>Last Name: {lastName} </div>
            <br />
            <div>Street: {street} </div>
            <div>Suburb: {suburb} </div>
            <div>State: {addressState} </div>
            <div>PostCode: {postCode} </div>
            <br />
            <div>Initial Card Balance: $100</div>
            <br />
            <LinkContainer to={"/view-all-opal-cards"} >
                <Button variant ="primary" onClick ={registerNewOpalCard}>I Confirm all details entered are true and correct</Button>
            </LinkContainer>
        </div>
    </div>
)};