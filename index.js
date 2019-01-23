var express = require("express");
var app = express();
var bodyParser = require("body-parser")
var cors = require("cors");
const MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

const url = 'mongodb://localhost:27017';
const dbName = 'mu';


app.get("/",function(req,res){
	res.sendFile(__dirname+"/index.html");
});

app.get("/getstudents",function(req,res){
	MongoClient.connect(url, function(err, client) {
	  const db = client.db(dbName);
	  const collection = db.collection('student');
	  // Find some documents
	  collection.find({}).toArray(function(err, data) {
		  res.send(data);
		 client.close();
	  });	 
	});
});

app.post("/addstudent",function(req,res){
	MongoClient.connect(url, function(err, client) {
	  const db = client.db(dbName);
	  const collection = db.collection('student');
	  // Find some documents
	  collection.insert(req.body,function(err,data){console.log(data)})
	});
});

app.listen(4000,function(){console.log("server running on 4000")});