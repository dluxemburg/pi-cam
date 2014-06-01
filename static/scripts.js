angular.module('PiCam',[])
.controller('PiCamCtrl', function($scope){
  $scope.data = {}
  window.socket = $scope.socket = io.connect()


  $scope.socket.on('capture', function (capture) {
    console.log('capture')
    console.log(capture)
    $scope.imageSrc = capture.name+"?t="+Date.now()
    $scope.$apply()
  })

  $scope.imageSrc = ''

})