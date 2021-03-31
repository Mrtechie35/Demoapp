var express = require('express');
var fs = require("fs");
var app = express();

//setting middleware

app.use(express.static(__dirname + 'public')); //Serves resources from public folder
app.get('/', (req, res) => {
    res.sendFile('./public/index1.html', { root: __dirname });
});
app.use('/static', express.static('public'))

app.get('/getSectorDetails', function (req, res,next) {
    
  
    fs.readFile( __dirname + "/resource/" + "bankData.json", 'utf8', function (err, data) {

        if(err)
 {
     next(err)
 }
 else{
        let student = JSON.parse(data);

        let final=[];
  
Object.keys(student).map(function(k){ 
//console.log("key with value: "+k +" = "+student[k])   
var person ={};
person.name=student[k].name;
person.total_exposure=student[k].total_exposure;
person.no_of_facilities=student[k].no_of_facilities;
person.no_of_customers=student[k].no_of_customers;

final.push(person);
})

var responsePayload=
{
    "status": "success",
    "data":final,
    "message": null /* Or optional success message */
  }
   res.status(200).json(responsePayload);
 }
    });

 })
var server = app.listen(5000);
console.log("Node Server Started......")

app.use(function(err, req, res, next) {
    var responsePayload=
    {
        "status": "failed",
        "data":null,
        "message": null /* Or optional success message */
      }
      res.status(500).json(responsePayload);
    //  res.json( responsePayload );// response to user with 403 error and details  // This is error handler
  });
  process.on('uncaughtException', function (err) {
    // /console.error(err);
    console.log(new Date()+" : Exception occured :"+err);
    
  });