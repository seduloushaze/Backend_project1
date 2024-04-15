const express = require('express')
const mongoose = require('mongoose');
const Productmodel = require('./models/product.model.js');
const Product = require('./models/product.model.js');

const dbUrl = "mongodb+srv://vaishnavirajput4601:8QHNAXfJyoEbjFQz@backenddb.kos7niz.mongodb.net/NodeAPI?retryWrites=true&w=majority&appName=BackendDB"
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.get('/' , (req ,res)=>{
    res.send("hello from Node API server updated")
});

app.get('/api/products' , async (req , res)=>{
    try{
        const products = await Productmodel.find({});
        res.status(200).json(products);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
});

app.get('/api/products/:id' , async (req,res)=>{
    try{
        const{id} =req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
});



app.post('/api/products' ,async (req,res)=>{
    try{
        const newProduct= await Productmodel.create(req.body);
        res.status(200).json(newProduct);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

mongoose.connect(dbUrl)
.then(()=>{
    console.info("connected to database");
    app.listen(3000 , () => {
        console.log('server is running on port 3000')
    })
})
.catch((e)=>{
    console.log("error:", e);
});
