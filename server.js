const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const api = require('./server/routes/api')
const app = express()

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname,'dist')))
app.use(express.static(path.join(__dirname,'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/', api)

const port = 3000
// app.listen(port, function () {
//     console.log(`Running server on port ${port}`)
// })
server.listen(port, function () {
        console.log(`Running server on port ${port}`)
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
    
io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});