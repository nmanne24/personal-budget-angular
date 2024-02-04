const express = require('express');
const app = express()
const port = 3000;

app.use('/', express.static('public'));

const budget ={
    my_monthly_budget: [
    {
        title: 'Rent',
        budget: 465
    },
    {
        title: 'Groceries',
        budget: 100
    },
    {
        title: 'Dine out',
        budget: 50
    },
    {
        title: 'Shopping',
        budget: 50
    }
]};

app.get('/hello',(req, res) =>{
    res.send('Hello World!');
});

app.get('/budget',(req, res) => {
    res.json(budget);
})

app.listen(port, () => {
    console.log('Example app listening at http://localhost:'+port);
});