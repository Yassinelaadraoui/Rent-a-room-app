function addFile(){
	var storage = firebase.storage();
	var storageRef = storage.ref();
	var dbRefRentImg = firebase.database().ref();
	var file = document.getElementById('rentImg');

	var fileUploded = storageRef.child("images/" + file.files[0].name).put(file.files[0]);
	
	// Listen for state changes, errors, and completion of the upload.
	fileUploded.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  	function(snapshot) {
    	// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    	var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    	console.log('Upload is ' + progress + '% done');
    	switch (snapshot.state) {
      		case firebase.storage.TaskState.PAUSED: // or 'paused'
        		console.log('Upload is paused');
        		break;
      		case firebase.storage.TaskState.RUNNING: // or 'running'
        		console.log('Upload is running');
        		break;
    	}
  	},function() {
  		// Upload completed successfully, now we can get the download URL
  		var downloadURL = fileUploded.snapshot.downloadURL;
  		var newKeyRent = dbRefRentImg.child('rent').push().key;
  		dbRefRentImg.child('rent/' + newKeyRent + '/pictures').set({
  			img1: downloadURL 
  		});
	});
}