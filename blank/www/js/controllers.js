angular.module('app.controllers', ['ionic.rating'])

.controller('dashCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($http, $scope, $stateParams) {
  $scope.data = {
   show: false
 };
 $scope.hasFilters=false;
$scope.openFilters= function(hasFilters){
  $scope.hasFilters = !$scope.hasFilters;
}
$scope.searchedcity
firebase.database().ref('/posts/').once('value').then(function(snapshot) {
  console.log(snapshot.val());
  $scope.posts = snapshot.val();

  // ...
});

})
.controller('myMessagesCtrl', ['$scope','$state', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams) {
/*if( 1)
    $state.go('tabsController.login');
*/
}])

.controller('myProfileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
  $scope.rating = {};
  $scope.rating.rate = 5;
  $scope.rating.max = 5;
  $scope.readOnly = true;

}])

.controller('postCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
$scope.showingmessage=0;
  $scope.hide = 0;

$scope.hidecover = function(){
  //function hide the cover that contains the list of elements a host would give to the guest ex wifi
  if($scope.hide==0){
      $scope.hide=1;

  }else $scope.hide=0;

}
  $scope.rating = {};
  $scope.rating.rate = 3;
  $scope.rating.max = 5;



}])

.controller('addAPostCtrl', ['$scope', '$stateParams','$cordovaCamera', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,  $stateParams, $cordovaCamera) {

  $scope.choosePhoto = function() {


         //Gallery
         var options = {
             quality: 80,
             destinationType: Camera.DestinationType.DATA_URL,
             sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
             allowEdit: true,
             encodingType: Camera.EncodingType.JPEG,
             targetWidth: 500,
             targetHeight: 700,
             correctOrientation: true,
             saveToPhotoAlbum: true
         };

         $cordovaCamera.getPicture(options).then(function(photo){
             $rootScope.imgURI = "data:image/jpeg;base64,"+ photo;
             $scope.last ="data:image/jpeg;base64,"+ photo;




         })



     }
}])

.controller('editProfileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('userxCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {



}])
