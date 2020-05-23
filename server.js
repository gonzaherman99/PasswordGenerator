const express = require('express');
const bodyParser = require('body-parser');
const session = require("express-session");
var cors = require('cors');
var engines = require('consolidate');
const { Client } = require('pg');
const connectionString = 'postgres://postgres:12345@localhost:5433/test';
const cookieParser = require("cookie-parser");
const bcrypt = require('bcrypt');

const client = new Client({
    connectionString: connectionString
});

client.connect();

const app = express();
 app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser("[mysecrethere]"));
app.use(session({
    secret: "Dog",
    resave: true,
    saveUninitialized: true,
}));



app.get('/ping', function (req, res) {
 res.send('pong');
});

app.get('/', function (req, res) {
    res.send("Hello");

       
});

app.post('/login', function(req, res)  {
    var username = req.body.first;
    var password = req.body.second;
    
   client.query("SELECT * FROM users WHERE email_address=$1", [`${username}`], function (err, result) {
       var hash = result.rows[0].password;
        console.log(hash);
         bcrypt.compare(password, hash).then(function(result) {
            console.log(result);
         });
       }); 
    
  client.query("SELECT * FROM users WHERE email_address=$1 AND password=$2", [`${username}`, `${password}`], function (err, result) {
	      if (result) {
		  	  res.status(200).json({
                data: "User already exists"
               });
		  }
    });
});

app.post("/register", function(req, res) {  
    
    var username = req.body.first;
    var password = req.body.second;
    var password2 = req.body.third;
    
    bcrypt.hash(password, 10, function(err, hash) {
       console.log(hash);  
    });

    if (username === undefined) {
        console.log("No user");
    } else if (password !== password2) {
        
        res.status(200).json({
                data: "User already exists"
            });
        
    } else {
    
    client.query("SELECT * FROM users WHERE email_address=$1", [`${username}`], function(err, result) {
        if (err) {
            console.log(err);
        } 
        
        if (result.rows < 1 === true) {
            
          bcrypt.hash(password, 10, function(err, hash) { 
             
               client.query("INSERT INTO users(email_address, password) VALUES($1, $2)", [`${username}`, `${hash}`], function (err, result) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Added");
                }
               }); 
        
          });    
                
        } else {
            
            res.status(202).json({
                data: "User already exists"
            });
            
        }
        
    });
    
    }
    
});


app.get('/pass/:id', function(req, res) {
    console.log("aaaaa");
});

app.listen(8080, function() {
    console.log("Port listening on 8080");
});