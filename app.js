var express = require('express');
var sql = require("mssql");
var app = express();
   // config for your database
var config = {
    user: 'sa',
    password: 'password_secure',
    server: 'DESKTOP-5N8C2PF', 
    database: 'msk2' 
};


app.get('/api/search', function (req, res) {
    //console.log(req.query.keyword)
    // connect to your database
    console.clear();
    sql.connect(config, function (connectionError) {
        if (connectionError){
            res.send({error:"bazaya qoşula bilmədi",data:[],errorDetail:connectionError})
            return
        } 
        // create Request object
        var request = new sql.Request();
           var keyword = req.query.keyword;
        // query to the database and get the records
        var query = "select top(10) * from P where ad = N'"+keyword+"' or soyad = N'"+keyword+"' or ataadi = N'"+keyword+"'";
        console.log(query);
        request.query(query, function (err, recordset) {
            // send records as a response
            if (err) { 
                
                if( err.originalError && err.originalError.info && err.originalError.info.message)
                {
                    res.send({error : err.originalError.info.message,data:[] ,errorDetail:err});
                } 
                else 
                if(err.originalError && err.originalError.message)
                {
                    res.send({error:err.originalError.message,data:[],errorDetail:err})
                }   
                else
                {
                    res.send({error : err,data:[],errorDetail:err});
                }
            }
             else {
                 res.send({error:"", data:recordset.recordsets,errorDetail:{}})
             }
        });
    });
});

var server = app.listen(8080, function () {
    console.clear();
    console.log('Server is running..');
});