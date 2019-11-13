const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const app = express();
const cors = require("cors");
const knex = require("knex");

//controllers
const signIn = require("./controllers/signIn");
const register = require("./controllers/register");
const image = require("./controllers/image");

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'shano',
      database : 'smart-brain'
    }
  });



app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(cors());



app.get("/", (req,res) => {
    
})

app.post("/signin", (req,res) => signIn.handleSignIn(req,res,db,bcrypt))

app.post("/register" ,(req,res) => register.handleRegister(req,res,db,bcrypt))

app.get("/profile/:id", (req,res) =>{
    const {id} = req.params;
    db.select("*").from("users").where({id}).then(user => {
        if(user.length){
            res.json(user[0]);
        } else {
            res.status(400).json("Not Found!");
        }
    })
    .catch(err => res.status(400).json("Error Getting User!"));
})

app.put("/image", (req,res) =>image.handleImage(req,res,db));

app.post("/image", (req,res) => image.APIcall(req,res));

/*
bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});
 */

app.listen(3000, ()=> {
    console.log("app is running on port 3000!")
})


/*
/ --> res =this is working
/singin --> Post = success/fail
/register --> Post = user
/profile/:userID --> Get = user
/image --> Put --> user

 */