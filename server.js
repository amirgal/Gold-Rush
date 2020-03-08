const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname,'dist')))
app.use(express.static(path.join(__dirname,'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const users = []
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('login', function(username){
        users.push(username)
        io.emit('login', users)
    })

    socket.on('disconnect', function() {
        users.pop()
        console.log('user disconnected');
    })

    socket.on('keypress', function(key) {
        io.emit('key press', key)
    })

    socket.on('game start' , function(board) {    
        io.emit('game start', board)
    })

    socket.on('chat message', function(msg, username){
        io.emit('chat message', msg, username)
    })
})

const port = 3000
http.listen(process.env.PORT || port, function() {
    console.log(('Running server on port '+port));
    
})

