var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var file = __dirname + "/../data/data.db";

router.get('/', function(req, res, next) 
{    
  var db = new sqlite3.Database(file);
  db.all("select * from tb_Person", function(err, rows) {
        res.render('users/index.html', {rows: rows});
        db.close();
        console.log("close");
    });
});

router.get('/create', function(req, res, next) 
{  
  res.render('users/create.html', { });
});

router.post('/create', function(req, res) {
    var firstName = req.body.FirstName;
    var lastName = req.body.LastName;
    // ...
    var sqlite3 = require("sqlite3").verbose();
    var db = new sqlite3.Database(file);
    
    db.serialize(function() {
        db.run("begin transaction");
        var stmt = db.prepare("insert into tb_Person values(NULL,?,?);");
        stmt.run(firstName, lastName);
        stmt.finalize();
        db.run("commit");
    });
    
    db.close();
    res.redirect('/users');
});

module.exports = router;