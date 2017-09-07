var z = 0
function drawStart(){ //need to go back to this
	//console.log("yellow");
	colorTextLarge("In order to save the people of your mining community", 100,50,'white');
	//// Thought was that start this function, show text, look for key press, on keypress terminate this update loop, start main game update loop.
	//// Thought was that start this function, show text, look for key press, on keypress terminate this update loop, start main game update loop.
	
	//// when called key presses not detected, so input not initialised correctly? Also only looped through when one console log statement not two for some odd reason.
		if(z > 100) {
			console.log("key detected");
			startLevel ();
		}
		z++;
	
	console.log("blue");
}

function startLevel(){
	
	
	var framesPerSecond = 30;

	setInterval(updateAll, 1000/framesPerSecond);

	

	
	}