const express = require('express');
const cors = require('cors');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

app.use(cors());
app.use(express.static('public'));

app.get("/api/quotes/random",(req,res,next)=>{

const randomQuote = getRandomElement(quotes);//fetch a random quote object.
//add the quote property to the object property
const object = {quote:randomQuote};

res.send(object);
});

app.get("/api/quotes",(req,res,next) =>{
 if(req.query.person){
const name = req.query.person;
const arrayToBeSend = [];
for(let i = 0; i < quotes.length; i++){
  let quote_object = quotes[i];
  if(quote_object.person === name){
    arrayToBeSend.push(quote_object);

  }
}
res.send({quotes:arrayToBeSend});



 }
 else{ 
res.send({quotes:quotes});
 }
});


app.post("/api/quotes",(req,res,next) =>{
const quote = req.query.quote;
const person = req.query.person;
if(quote && person){
  const object = {}
  object.quote = quote;
  object.person = person;
  quotes.push(object);
  res.send({quote:object})

}else{
  res.status(400).send();
}

});



// export app for use in main.js and for testing
module.exports = {
  app
};

