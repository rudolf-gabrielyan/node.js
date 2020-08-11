
const ejs = require('ejs')
const bodyParser = require('body-parser')
const express = require('express')
var router = express.Router();
const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
const mysql = require('mysql');
const con = require('./database.js');
app.use(express.static(__dirname + '/public'));
const session = require('express-session');
var flash = require('connect-flash');
const SessionStore = require('express-mysql-session');
app.use(flash());
const path = require('path');
const fileUpload = require('express-fileupload')
app.use(fileUpload());
app.use(bodyParser.json());
const http = require('http') 
const io = require('socket.io')

server = http.createServer();
server.listen(8090);

app.use('/scripts', express.static(__dirname + '/node_modules/'));

// socket.io 
var socket = io.listen(server); 
socket.on('connection', function(client){ 
    // new client is here! 
    client.on('message', function(){ 
        console.log('message arrive');
        client.send('some message');
    });

    client.on('disconnect', function(){
        console.log('connection closed');
    });

});





app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 } }))
const port = 3000;


var index = require('./routes/index');
// var web = require('./routes/web');


app.use('/user', index);

// app.use('/user', web);


app.listen(port, () =>
	 console.log(`Example app listening on port ${port}!`)
);

module.exports = app;