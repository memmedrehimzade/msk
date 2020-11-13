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
    sql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
           var keyword = req.query.keyword;
        // query to the database and get the records
        request.query("select top(10) * from P where ad like N'%"+keyword+"%'" , function (err, recordset) {
            // send records as a response
            if (err) {
                res.send({error : err.originalError.info.message,data:[]});
             }
             else {
                 res.send({error:"", data:recordset.recordsets})
             }
        });
    });
});

var server = app.listen(5000, function () {
    console.clear();
    console.log('Server is running..');
});