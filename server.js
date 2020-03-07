const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const api = require('./server/routes/api')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname,'dist')))
app.use(express.static(path.join(__dirname,'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
// app.use('/', api)

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function() {
        console.log('user disconnected');
    })

    socket.on('keypress', function(key) {
        // console.log('user pressed: '+key);
        io.emit('key press', key)
    })

    socket.on('game start' , function())
})

const port = 3000
http.listen(port, function() {
    console.log(('Running server on port '+port));
    
})
// app.listen(port, function () {
//     console.log(`Running server on port ${port}`)
// })
