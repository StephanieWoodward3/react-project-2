const express = require('express'); 
const cors = require('cors');
const storage = require('node-persist'); 
const {v4:uuidv4} = require('uuid'); 
const bodyParser = require('body-parser');
 
(async()=>{
 
    await storage.init({dir:'./data'}); 
 
    const server = express(); 
    server.use(cors()); 
    server.use(express.json()); 
    server.use(bodyParser.json()); 

    //gets all data from the server
    //http://localhost:4000/view-all-opal-cards
    server.get('/opal-cards',async(request,response)=>{
        let opalCard = await storage.valuesWithKeyMatch(/opal-card-/); //searching with the key value
        response.json(opalCard);
    }); 


    //gets only the card number you specified from the server
    //id is the key for the file(this is what we search for) and will return the entire object/value for the file
    //when declaring the web address use the :, however do not include it in postman or in chrome
    //http://localhost:4000/opal-cards/8cd47072-8ccc-4c9e-90c9-32b6df85bce7
    server.get('/opal-cards/:id',async(request,response)=>{
        let requestedOpalCard = await storage.getItem(`opal-card-${request.params.id}`); //stores the entire JSON object in requestedOpalCard
        if(requestedOpalCard == undefined){
            response.json({status:400,message:"Invalid Opal Card Number provided"}); 
        }
        else{
            response.json(requestedOpalCard); 
        }
    }); 

    //saves a new person
    //http://localhost:4000/opal-cards
    server.post("/opal-card", async(request, response)=>{

        let newOpalCustomer = {
            id: uuidv4(),
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            dob: request.body.dob,
            cardType: request.body.cardType,
            street: request.body.street,
            suburb: request.body.suburb,
            addressState: request.body.addressState,
            postCode: request.body.postCode,
            balance: 100,
            tappedOn: false
        };

        await storage.setItem(`opal-card-${newOpalCustomer.id}`,newOpalCustomer); 
        response.json(newOpalCustomer)
    });

    server.put("/opal-cards/change-name/:id", async(request, response)=>{
        let card = await storage.getItem(`opal-card-${request.params.id}`)
        card.firstName = request.body.firstName;
        card.lastName = request.body.lastName;

        await storage.updateItem(`opal-card-${request.params.id}`, card);
        response.json({status:200, card});
    })

    server.put("/opal-cards/change-address/:id", async(request, response) =>{
        let card = await storage.getItem(`opal-card-${request.params.id}`)
        card.street = request.body.street;
        card.suburb = request.body.suburb;
        card.addressState = request.body.addressState;
        card.postCode = request.body.postCode;

        await storage.updateItem(`opal-card-${request.params.id}`, card);
        response.json({status:200, card});
    })

    //update card balance due to top up
    server.put("/opal-cards/top-up/:id", async(request, response)=>{
        let card = await storage.getItem(`opal-card-${request.params.id}`);
        let topUpAmt = request.body.topUpAmt;

        card.balance = card.balance + Number(topUpAmt);

        await storage.updateItem(`opal-card-${request.params.id}`, card);
        response.json({status:200, card});
    })

    

    //update card balance due to tap
    //when declaring the web address use the :, however do not include it in postman or in chrome
    server.put("/opal-cards/process-tap/:id", async(request, response)=>{
        let card = await storage.getItem(`opal-card-${request.params.id}`);
        if(card == undefined){
            response.json({status:400,message:"Invalid Opal Card Number provided"}); 
            return;
        }

        if(card.tappedOn){ //if the card is already tapped on, then change the status to false and deduct the fare
            card.tappedOn = false;
            card.balance = card.balance - 1;  
        } else {
            //do a balance check
            if(card.balance <= 1){
                //if balance less than 1 send response insufficient funds
                response.json({status:400,message:"Insufficient Funds on Opal Card to complete Trip"}); 
                return;
            }
            card.tappedOn = true;
        }

        await storage.updateItem(`opal-card-${request.params.id}`, card);
        response.json({status:200, card});

    })

    //delete an opal card
    server.delete("/opal-cards/delete/:id", async(request, response) => {
        //let cardToBeDeleted = await storage.getItem(`opal-card-${request.params.id}`);

        await storage.removeItem(`opal-card-${request.params.id}`)
        response.json({status: 200})
    })
 
 
    server.listen(4000,()=>{
        console.log("http://localhost:4000 is up and running, yay..."); 
    })
 
})();