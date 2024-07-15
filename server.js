const express = require('express');

const app = express();

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

const getRandomNum = (max) =>  { 

    return Math.floor(Math.random()* max);
};

app.get('/greetings/:name', (req, res) => {
    res.send(`What a delight it is to see you once more, ${req.params.name}`)
    
});

app.get('/roll/:number', (req, res) => {

    const num = req.params.number;
    if(!isNaN(num)){
        res.send(`You rolled a ${getRandomNum(num)}`)
    }
    else{
        res.send("You must specify a number.");
    }

});

app.get('/collectibles/:index', (req, res) => {
    
    const idx = req.params.index;
    const element = collectibles[idx];
    if(element){
        res.send(`So, you want the ${element.name}? For ${element.price}, it can be yours!`);
    }
    else{
        res.send("This item is not yet in stock. Check back soon!");
    }

    
});

app.get('/shoes', (req, res) => {

    const min = req.query.min;
    const max = req.query.max;
    const type = req.query.type;

    let setShoes = shoes;


    if(min){
        setShoes = setShoes.filter(shoes => shoes.price <=  min);
    }
    else if(max){
        setShoes = setShoes.filter(shoes => shoes.price >=  max);
    }
    else if(type){
        setShoes = setShoes.filter(shoes => shoes.type ===  type);
    }

    res.send(setShoes);

});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});