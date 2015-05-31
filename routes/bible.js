var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  //res.writeHead(200, {'Content-Type': 'text/plain'});
  //res.end('Hello World\n');
  //res.send('respond with a resource');
  fs.readFile(__dirname + '/../public/files/kjv.txt', 'utf8', function (err,data) {
    if (err) 
    {
      return console.log(err);
    }
    //console.log("pouring");
    res.send(data);
  });
});

module.exports = router;
