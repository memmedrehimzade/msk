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
function getErrorMessage(e){
    if(!e){
        return ""
    }
    if( e.originalError && e.originalError.info && e.originalError.info.message)
    {
      return  e.originalError.info.message;
    } 
    else 
    if(e.originalError && e.originalError.message)
    {
        return e.originalError.message ;
    }   
    else
    {
      return e;
    }

}

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
                var errorMessage =getErrorMessage(err)   
                res.send({error : errorMessage,data:[],errorDetail:err});
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