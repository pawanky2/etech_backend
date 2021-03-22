const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// const app = express();
// app.use(express.json());


var fs = require('fs');



router.get('/products',(req, res) =>{

var blob = fs.readFileSync('data.json');
var data = JSON.parse(blob);
res.send(data);
});


router.get('/product/:id',(req, res)=>{
    console.log(req.params.id);
    var blob = fs.readFileSync('data.json');   
    var data = JSON.parse(blob);
    const product = data.find(c => c.id === parseInt(req.params.id));
    if(!product) res.status(404).send("could not found the product with given id");
    res.send(product);

});
router.post('/product',(req,res) => {

    var blob = fs.readFileSync('data.json');   
    var data = JSON.parse(blob);
    
    const product = {
        id : req.body.id,
        itemname : req.body.itemname,
        price : req.body.price,
        imgurl : req.body.imgurl
    };
    console.log(req.body);

    data.push(product);
    fs.writeFile("data.json", JSON.stringify(data),function(err, result){
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    });



    // console.log(product);
    // console.log(data);
    res.send(product);
    res.end();   

});

router.delete('/product' , (req, res) =>{
    var blob = fs.readFileSync('data.json');   
    var data = JSON.parse(blob);
    let val2 = {
        id : req.body.id,
        
    }
      data = data.filter(obj => obj.id !== val2.id);
      fs.writeFile("data.json", JSON.stringify(data),function(err, result){
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
        }
    });
    // console.log(data);

});

module.exports = router;