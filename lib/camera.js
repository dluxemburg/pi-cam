var events = require('events'),
    util = require('util'),
    child_process = require('child_process')

var Camera = exports.Camera = function(options){
  this.options = options
  events.EventEmitter.call(this)
}

util.inherits(Camera, events.EventEmitter)

exports.createCamera = function(options){
  return new Camera(options)
}

Camera.prototype.capture = function(options){
  options || (options = {})
  options.delay || (options.delay == 100)
  setTimeout((function(){
    this.takeRaspistill(options)
  }).bind(this), options.delay)
}

Camera.prototype.takeRaspistill = function(options){
  var self = this
  var childArgs = ['-o', options.out]
  var childOpts = {}
  if (options.width) {
    childArgs = childArgs.concat(['-w', options.width])
  }
  if (options.height) {
    childArgs = childArgs.concat(['-h', options.height])
  }
  if (options.cwd) {
    childOpts.cwd = options.cwd
  }
  var raspistill = child_process.spawn('raspistill', childArgs, childOpts)
  raspistill.on('exit', function(code, signal){
    self.emit('capture', {out: options.out})
  })
  raspistill.on('error', function(err){
    console.log('Camera Error: '+err.message)
    self.emit('error', err)
  })
}

// Lifx.prototype.stop = function(fn){
//   this.ruby.once('close', fn)
//   this.ruby.kill()
// }

// Lifx.prototype.handleOut = function(str){
//   var body, err
//   try {
//     body = JSON.parse(str.toString())
//     this.emit(body.event, body.data)
//   } catch(e) {
//     err = new Error('Failed to parse JSON output from Ruby LIFX process: '+e.message)
//     this.emit('error', err)
//   }
// }

// Lifx.prototype.handleErr = function(str){
//   var err = new Error('Error from Ruby LIFX process: '+str.toString())
//   this.emit('error', err)
// }

// Lifx.prototype.send = function(payload, fn){
//   return this.ruby.stdin.write(JSON.stringify(payload)+"\n", fn)
// }