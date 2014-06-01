var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    camera = require('./lib/camera').createCamera()

app.use(express.static(__dirname + '/static'))
app.use(express.static(__dirname + '/images'))

app.set('port', process.env.PORT || '8888')

server.listen(app.settings.port, function(){
  console.log('App server listening at http://localhost:'+app.settings.port)
})

var capture = function(){
  io.sockets.emit('capture', {name: 'image.jpg'})
  camera.capture({
    cwd: __dirname + '/static',
    out: 'image.jpg',
    width: 640
  })
}

camera.on('capture', capture)

capture()