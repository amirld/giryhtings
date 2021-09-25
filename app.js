const express = require('express');
const app = express();

const { items } = require('./item');
const { users } = require('./user');
const cors = require("cors")
const Mongoose = require('mongoose');


// app.use(cors());
app.use(express.json());       
app.use(express.urlencoded( {extended: false}));


const PORT = process.env.PORT || 5000;

Mongoose.connect("mongodb+srv://amir:amir.556655@cluster0.4ur0v.mongodb.net/gt-db?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{app.listen(PORT, ()=> {console.log("lestenning http");})})
.catch((err)=>{
	console.log(err);
	}
)


//  public api's 

// home page api
app.get('/home/:limit/:page', (req, res)=>{
    const limit = Number(req.params.limit)
    const skip = (Number(req.params.page) - 1) * limit
    
    Items.find().sort({ Price: -1 })
    .limit(limit).skip(skip)
        .then((result)=>{
            res.status(200).send(result);
        })
        .catch((err)=>{console.log(err);})
    

})


// single item api 
app.get('/item/:id', (req, res)=>{
    Items.findById(req.params.id)
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch((err)=>{res.status(404).send(err);})
})

// search by category
app.get('/category/:category/:limit/:page', (req, res)=>{
    const limit = Number(req.params.limit)
    const skip = (Number(req.params.page) - 1) * limit
    
    Items.find( { category: req.params.category }).sort({ Price: -1 }).limit(limit).skip(skip)
    .then((result)=>{
        res.status(200).json(result) 
    })

})

//Sign up
app.post('/user/signup',(req, res)=>{
    const {name,lname,email,password} = req.body
    Users.find({Email: email}).then((result)=>{
        if(result.length === 0){
            new Users({
                Name: name,
                Last_name: lname,
                Email: email,
                Password: password,    
            }).save().then(()=>{
                res.status(200).send(true)
            }).catch((err)=>{
                console.log(err)
            })
        }      
        else{
            res.status(404).send(false)
        }
   });

    
    
        
})

// log in 
app.post('/user/login', (req, res)=>{
    const { email, password } = req.body
    email
    users.findOne({Email: email}).then((result)=>{
        if (result.Password === password){
            res.status(200).json(result)
        }
        else(
            res.status(404).send(false)
        )
    })

})

// ADD like item
app.get('/user/likeitem/:userid/:itemid', (req, res)=>{
    Items.findById(req.params.itemid).then((result)=>{
        const {Title, Images, Price, Category} = result
        const item = {
            _id: req.params.itemid, 
            Title: Title,
            Images: Images,
            Price: Price,
            Category: Category,
        }
        users.findOneAndUpdate(
            { _id: req.params.userid }, 
            { $push: { Liked_items: item  } },
           function (error) {
                 if (error) {
                    res.status(404).send(false)
                    console.log(error);
                 } else {
                    res.status(200).send(true)
                 }
             });
    })
    

})

// delete like item
app.delete("/user/delete/likeitem/:userid/:itemid", async (req, res) => {
    // const itemid = req.params.itemid;
    users.findOneAndUpdate(
        { _id: req.params.userid }, 
        { $pull: { Liked_items: {_id : req.params.itemid}  }},function(err){
            if (err) {
                res.status(404).send(false);
                res.send(err)
            }
            else {
                res.status(200).send(true)
            }
        }

    )
    })

// ADD cart item
app.get('/user/cartitem/:userid/:itemid', (req, res)=>{
    Items.findById(req.params.itemid).then((result)=>{
        const {Title, Images, Price, Category} = result
        const item = {
            _id: req.params.itemid, 
            Title: Title,
            Images: Images,
            Price: Price,
            Category: Category,
        }
        users.findOneAndUpdate(
            { _id: req.params.userid }, 
            { $push: { Cart_items: item  } },
           function (error) {
                if (error) {
                    res.status(404).send(false)
                    console.log(error);
                } else {
                    res.status(200).send(true);
                }
            });
    })
    

})

// delete cart item
app.delete("/user/delete/cartitem/:userid/:itemid", async (req, res) => {
    // const itemid = req.params.itemid;
    users.findOneAndUpdate(
        { _id: req.params.userid }, 
        { $pull: { Cart_items: {_id : req.params.itemid}  }},function(err){
            if (err) {
                res.status(200).send(false)
                console.log(err);
            }
            else {
                res.status(200).send(true)
            }
        }

    )
})

// search by title 
app.get('/search/:Svalue/:limit/:page', (req, res)=>{
    const limit = Number(req.params.limit)
    const skip = (Number(req.params.page) - 1) * limit
    const Svalue = new RegExp(req.params.Svalue, "i") 
    items.find({Title: Svalue}).sort({ Price: -1 }).limit(limit).skip(skip).then((result)=>{
        res.status(200).json(result)
    })
})

// private api's 
// build it later   


