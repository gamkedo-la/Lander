var canvas, canvasContext;

var blueShip = new shipClass();
var i=0;



window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	colorRect(0,0, canvas.width,canvas.height, 'black');
	/* //colorText("LOADING IMAGES", canvas.width/2, canvas.height/2, 'white'); */

	loadImages();
}

function imageLoadingDoneSoStartGame() {
	
	
	setupInput();
	loadLevel(levelOne, levelOneBaseState);
		
	//console.log("test4");
	/* var framesPerSecond = 30;
	
	var loadscreenInterval = setInterval(startAll, 1000/framesPerSecond); */
	
	
	var framesPerSecond = 30;

	setInterval(updateAll, 1000/framesPerSecond);
	
	
	
	
	function startLevel(){// need to go back to this
	
	
	var framesPerSecond = 30;

	setInterval(updateAll, 1000/framesPerSecond);

	

	
	}
	
	}
	

//// Had a go at setting up a loading screen but couldn't get my head around how the setInterval was being called and in particular how to stop once started
function loadLevel(whichLevel, levelBaseState) {
	//console.log("test4");
	worldGrid = whichLevel.slice();
	blueShip.reset(shipPic, "Transport ship ZV-798", shipFiringPic);
	baseState = levelBaseState.slice(); //.slice with no arguments () means it takes whole array
}

function updateAll() {
	
	//console.log("test");
	moveAll();
	drawAll();
	baseUpdate();
	
	
}

function startAll() {
	drawStart();	
}


function moveAll() {
	blueShip.move();
}

function drawAll() {
	drawWorld();
	blueShip.draw();
} 