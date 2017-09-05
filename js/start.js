var z = 0
function drawStart(){ //need to go back to this
	//console.log("yellow");
	colorTextLarge("In order to save the people of your mining community", 100,50,'white');
	
	
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