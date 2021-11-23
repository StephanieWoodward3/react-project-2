import React, { useState, useEffect } from 'react';
import {Switch, Route, useParams, useRouteMatch} from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import {LinkContainer} from "react-router-bootstrap";

export default function DeleteOpalCard() {

    let {path, url} = useRouteMatch();
    let {id} = useParams();

    const[oneOpalCard, setOneOpalCard] = useState();

    debugger;
    //get the info from the server for the requested individual
    useEffect(() => {
        fetch(`http://localhost:4000/opal-cards/${id}`)
        .then(response => response.json())
        .then(data => setOneOpalCard(data))
    }, [oneOpalCard]);

    function deleteOc(){
        fetch(`http://localhost:4000/opal-cards/delete/${id}`, {
            method:"DELETE",
            headers: {"content-type": "application/json"},
            // body: JSON.stringify(oneOpalCard.id)
        })
        .then((response) => response.json())
        .then(json => {
            if(json.status ===200){
                alert("Opal Card has been deleted")
            } else {
                alert("There was an error posting the Change of Name to the server");
            }
        })
    }

    return(
        <div>
            {oneOpalCard &&
                <div>
                    <Jumbotron fluid>
                        <h1> Delete Opal Card For {oneOpalCard.firstName} {oneOpalCard.lastName}</h1>
                    </Jumbotron>
                    
                    <div> Are you sure you wish to delete this opal card?</div>
                    <LinkContainer to="/view-all-opal-cards">
                        <Button variant="danger" className="m-2" onClick={deleteOc}>YES</Button>
                    </LinkContainer>
                    <LinkContainer to="/view-all-opal-cards">
                        <Button variant ="primary">NO</Button>
                    </LinkContainer>
                </div>}
        </div>
    )
}