const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.listen(3000,() => {
    console.log("Listening...")
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname));
app.get('/',(req,res) => {
    res.sendFile(__dirname+'/index.html');
})
const ids = {
    1: 'Apple',
    2: 'Ball',
    3: 'Cat',
    4: 'Dog',
    5: 'Egg'
};
app.post('/id',(req,res)  => {
    res.json({id: req.body.id, name : ids[req.body.id]});
})