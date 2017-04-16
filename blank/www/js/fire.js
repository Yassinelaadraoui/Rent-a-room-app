// Initialize Firebase
var config = {
	apiKey: "AIzaSyDIKL6C8Y9Dzee-wSHul_Sh-oiyW2kSz5A",
	authDomain: "roomrentapp-4f6fc.firebaseapp.com",
	databaseURL: "https://roomrentapp-4f6fc.firebaseio.com",
	projectId: "roomrentapp-4f6fc",
	storageBucket: "roomrentapp-4f6fc.appspot.com",
	messagingSenderId: "471484839370"
};
firebase.initializeApp(config);

function init(){
	firebase.auth().onAuthStateChanged(function(user){
  		if(user){
        	console.log(user);
        	userinfo = user;
  		}
  		else{
  			window.location.href = "login.html";
  		}
	});
}

function user(){
	alert(userinfo.uid);
}

function addUser(){
	dbRefUser = firebase.database().ref().child('users');
	// get value
	name = document.getElementsByName('name')[0].value;
	email = document.getElementsByName('email')[0].value;
	pass = document.getElementsByName('passwd')[0].value;

	// get key for new user
	var newkey = firebase.database().ref().child('users').push().key;

	firebase.database().ref().child('users/' + newkey).set({
		name: name,
		email: email,
		passwd: pass
	});
}

function logout(){
	firebase.auth().signOut().then(function() {
  		// Sign-out successful.
  		window.location.href = "login.html";
	}).catch(function(error) {
  		// An error happened.
	});
}
