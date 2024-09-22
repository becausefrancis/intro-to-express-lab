const express =require('express');

const app = express();

// 1. Be Polite, Greet the User
app.get('/greetings/:name', (req, res) => {
    res.send(`Hello there, ${req.params.name}!`);
});

// 2. Rolling the Dice
app.get('/roll/:number', (req, res) => {
    const number = Number(req.params.number);
    if (isNaN(number) || number <= 0) {
        res.send('You must specify a number.');
    } else {
        res.send(`You rolled a ${req.params.number}.`);
    }
});

// 3. I Want THAT One!
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req, res) => {
    const index = Number(req.params.index);
    if (isNaN(index) || index < 0 || index >= collectibles.length) {
        res.send('This item is not yet in stock. Check back soon!');
    } 

    const collectible = collectibles[index];
    res.send(`So, you want the ${collectible.name}? For $${collectible.price}, it can be yours!`);
});

// 4. Filter Shoes by Query Parameters
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    const minPrice = req.query.minprice;
    const maxPrice = req.query.maxprice;
    const type = req.query.type;

    let shoesByMinPrice = [];
    shoesByMinPrice = shoes.filter((shoe) => {
        return shoe.price >= minPrice;
    });

    let shoesByMaxPrice = [];
    shoesByMaxPrice = shoes.filter((shoe) => {
        return shoe.price <= maxPrice;
    });

    let shoesByType = [];
    shoesByType = shoes.filter((shoe) => {
        return shoe.type === type;
    });

    if (minPrice) {
        res.send(shoesByMinPrice);
    } else if (maxPrice) {
        res.send(shoesByMaxPrice);
    } else if (type) {
        res.send(shoesByType);
    } else {
        res.send(shoes);
    }
});

app.listen(3000, () => {
    console.log(`Server is running at http://localhost:3000`);
});