var express = require('express');
var app = express();

app.get('/api/search', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: 'password_secure',
        server: 'DESKTOP-5N8C2PF', 
        database: 'msk2' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select top(10) * from P ', function (err, recordset) {
            
            if (err) console.log(err)
            

            // send records as a response
            res.send(recordset.recordsets);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});