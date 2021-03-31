var express = require('express');
var fs = require("fs");
var app = express();

//setting middleware
app.use(express.static(__dirname + 'public')); //Serves resources from public folder
app.get('/', (req, res) => {
    res.sendFile('./public/index.html', { root: __dirname });
});
app.use('/static', express.static('public')) //Serves static files

app.get('/getSectorDetails', function (req, res,next) {
    
      fs.readFile( __dirname + "/resource/" + "bankData.json", 'utf8', function (err, data) {

        if(err){
     next(err)
    }
    else{
        let resObj = JSON.parse(data);
        let sectorsData=[];
Object.keys(resObj).map(function(k){ 
//console.log("key with value: "+k +" = "+student[k])   
let sector ={};
sector.name=resObj[k].name;
sector.total_exposure=resObj[k].total_exposure;
sector.no_of_facilities=resObj[k].no_of_facilities;
sector.no_of_customers=resObj[k].no_of_customers;
sectorsData.push(sector);
})
var responsePayload=
{
    "status": "success",
    "data":sectorsData,
    "message": null /* Or optional success message */
  }
   res.status(200).json(responsePayload);
 }
    });

 })
var server = app.listen(5000);
console.log("Node Server Started......")
//Error Handler
app.use(function(err, req, res, next) {
    var responsePayload=
    {
        "status": "failed",
        "data":null,
        "message": "Sever error" /* Or optional success message */
      }
      res.status(500).json(responsePayload);
    //  res.json( responsePayload );// response to user with 403 error and details  // This is error handler
  });
  process.on('uncaughtException', function (err) {
    
    console.log(new Date()+" : Exception occured :"+err);
    
  });