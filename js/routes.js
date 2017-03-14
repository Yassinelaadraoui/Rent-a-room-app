angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.dash', {
    url: '/dash',
    views: {
      'tab1': {
        templateUrl: 'templates/dash.html',
        controller: 'dashCtrl'
      }
    }
  })

  .state('tabsController.myMessages', {
    url: '/messages',
    views: {
      'tab2': {
        templateUrl: 'templates/myMessages.html',
        controller: 'myMessagesCtrl'
      }
    }
  })

  .state('tabsController.myProfile', {
    url: '/profile',
    views: {
      'tab3': {
        templateUrl: 'templates/myProfile.html',
        controller: 'myProfileCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.post', {
    url: '/post',
    views: {
      'tab1': {
        templateUrl: 'templates/post.html',
        controller: 'postCtrl'
      }
    }
  })

  .state('tabsController.addAPost', {
    url: '/addpost',
    views: {
      'tab1': {
        templateUrl: 'templates/addAPost.html',
        controller: 'addAPostCtrl'
      }
    }
  })

  .state('tabsController.editProfile', {
    url: '/editprofil',
    views: {
      'tab3': {
        templateUrl: 'templates/editProfile.html',
        controller: 'editProfileCtrl'
      }
    }
  })

  .state('tabsController.userx', {
    url: '/page8',
    views: {
      'tab2': {
        templateUrl: 'templates/userx.html',
        controller: 'userxCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page1/dash')

  

});