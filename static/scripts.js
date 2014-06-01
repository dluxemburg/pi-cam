angular.module('PiCam',[])
.controller('PiCamCtrl', function($scope){
  $scope.data = {}
  window.socket = $scope.socket = io.connect()


  $scope.socket.on('capture', function (capture) {
    $scope.imageSrc = capture.name+"?t="+Date.now()
  })

  $scope.imageSrc = ''

})