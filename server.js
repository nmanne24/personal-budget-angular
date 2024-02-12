const express = require('express');
const app = express()
const port = 3000;

app.use('/', express.static('public'));



app.get('/hello',(req, res) =>{
    res.send('Hello World!');
});

app.get('/budget',(req, res) => {
    const budget_data =require('./budget.json');
    res.json(budget_data);
})

app.listen(port, () => {
    console.log('Example app listening at http://localhost:'+port);
});