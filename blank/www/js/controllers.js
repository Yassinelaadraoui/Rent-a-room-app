angular.module('app.controllers', ['ionic.rating'])
.run(function($rootScope) {
    $rootScope.clickedpost =  [];
})
.controller('dashCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($http, $scope, $stateParams,$rootScope ) {
  $scope.data = {
   show: false
 };
 $scope.hasFilters=false;
$scope.openFilters= function(hasFilters){
  $scope.hasFilters = !$scope.hasFilters;
}

$scope.searchedcity={search:""};
$scope.conditions = 1;

$scope.show=  function($index)  {

        if($scope.searchedcity.search == "")
                    return 1;



        if($scope.posts[$index].location["city"] == $scope.searchedcity.search){


          return 1;

        }else {
          $scope.conditions= 0;
          return 0;
        }
        console.log("over");

}
$scope.posts = [];
firebase.database().ref('/posts/').once('value').then(function(snapshot) {
  snapshot.forEach(function(childsnap){
    $scope.childkey = childsnap.key;
    $scope.childdata = childsnap.val();
    console.log($scope.childdata);
    $scope.childdata.idrent = $scope.childkey;

    $scope.posts.push($scope.childdata);



  // ..
})
console.log($scope.posts[0].pictures["img1"]);
});
$scope.readmore= function($index){
  $rootScope.clickedpost = $scope.posts[$index];
  console.log($scope.posts[$index]);
  console.log($rootScope.clickedpost);
}
})
.controller('myMessagesCtrl', ['$scope','$state', '$stateParams','$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams, $rootScope) {
  $scope.conv = [];

  $scope.clickmessage = function($index){

    $rootScope.clickedmessage = $scope.conv[$index];
    console.log($scope.conv[$index]);
  }
  $scope.loadMessage= function(){

    //get ref database
    var dbrefMessage = firebase.database().ref().child('messages');
    $scope.conv = [];
  console.log('user1');
    dbrefMessage.once('value', function(snap){
      snap.forEach(function(childsnap){
        if (childsnap.val().users.user1 == "X9dfosjoz2fdFDsfdfs24D34" || childsnap.val().users.user2 =="X9dfosjoz2fdFDsfdfs24D34" ) {

          var childdata = childsnap.val();
          childdata.idmessage = childsnap.key;
          $scope.conv.push(childdata);
        }

      });
      console.log($scope.conv);

    });
  }
}])

.controller('myProfileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope) {
  $scope.rating = {};
  $scope.rating.rate = 5;
  $scope.rating.max = 5;
  $scope.readOnly = true;

}])

.controller('postCtrl', ['$scope', '$stateParams',"$rootScope", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope) {
$scope.showingmessage=0;
  $scope.hide = 0;
console.log( $rootScope.clickedpost);
$scope.hidecover = function(){
  //function hide the cover that contains the list of elements a host would give to the guest ex wifi
  if($scope.hide==0){
      $scope.hide=1;

  }else $scope.hide=0;

}
  $scope.rating = {};
  $scope.rating.rate = 3;
  $scope.rating.max = 5;
$scope.rent = [];


  $scope.messaging = function(){

    console.log($scope.rent.message);
    var refMessage = firebase.database().ref();
    var newKeyMessage = refMessage.child('messages').push().key;
    refMessage.child('messages/' + newKeyMessage).set({
      subject: "rent offer"
    });

    refMessage.child('messages/' + newKeyMessage + '/users/').set({
      user1: "X9dfosjoz2fdFDsfdfs24D34",
      user2: $rootScope.clickedpost.iduser
    });

    refMessage.child('messages/' + newKeyMessage + '/conversation/0/').set({
      sender: "Yassine",
      body: $scope.rent.message
    });

  }









}])

.controller('addAPostCtrl', ['$scope', '$stateParams','$cordovaCamera', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,  $stateParams, $cordovaCamera) {
  $scope.info = [];

  $scope.print = function(){
      console.log($scope.info);
  }
  var storage = firebase.storage();
  var storageRef = storage.ref();
  function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], {type: mimeString});
  return blob;

  // Old code
  // var bb = new BlobBuilder();
  // bb.append(ab);
  // return bb.getBlob(mimeString);
}
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
            console.log("done");
             $scope.last ="data:image/jpeg;base64,"+ photo;

             var fileUploded = storageRef.child("images/" + "image").put(  dataURItoBlob($scope.last));

             // Listen for state changes, errors, and completion of the upload.
             fileUploded.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
               function(snapshot) {
                 // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded


               },function(error){
                   switch (error.code) {
                     case 'storage/unauthorized':
                       // User doesn't have permission to access the object
                       break;

                     case 'storage/canceled':
                       // User canceled the upload
                       break;
                   }
               },function() {
                 // Upload completed successfully, now we can get the download URL
                 var downloadURL = fileUploded.snapshot.downloadURL;
                 urlfile.push(downloadURL);
                 //console.log(urlfile);

               });








         })



     }
       var dbRefRent = firebase.database().ref();
       var newKeyRent = dbRefRent.child('posts').push().key;
$scope.submit = function(){
$scope.image="https://firebasestorage.googleapis.com/v0/b/test-firebase-d97ae.appspot.com/o/images%2Fhouse1.jpg?alt=media&token=47744dcb-460e-4c51-b064-96ee29a90571";

dbRefRent.child('posts/' + newKeyRent + '/pictures').set({
  img1: $scope.image,
  img2: $scope.image,
  img3: $scope.image
});
console.log("userinfo");
dbRefRent.child('posts/' + newKeyRent).update({
description: $scope.info.description,
user: "Yassine",
iduser: "X9dfosjoz2fdFDsfdfs24D34",
price: $scope.info.price
});
dbRefRent.child('posts/' + newKeyRent + '/location').update({
city: $scope.info.location['city'],
street: $scope.info.location['street'],
postalcode: $scope.info.location['postalcode']
});

}
}])

.controller('editProfileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('userxCtrl', ['$scope', '$stateParams','$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$rootScope) {

  $scope.send = [];
  $scope.messages = $rootScope.clickedmessage.conversation;

  $scope.sendnewMessage = function(){
   //get id message

   console.log($rootScope.clickedmessage.idmessage);
   //ref database
   var dbrefMessage = firebase.database().ref().child('messages/' + $rootScope.clickedmessage.idmessage);

   dbrefMessage.once('value', function(snap){
     dbrefMessage.child('conversation/' + snap.val().conversation.length ).set({
       body: $scope.send.message,
       sender: "Yassine"
     });
    window.location.reload();
   });

 }



}])
