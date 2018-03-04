const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

const KEY_R = 82;
const KEY_F = 70;

const KEY_T = 84;
const KEY_G = 71;

var mouseX = 0;
var mouseY = 0;

function setupInput() {
	canvas.addEventListener('mousemove', updateMousePos);

	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

	blueShip.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_W, KEY_A, KEY_S, KEY_D, KEY_R, KEY_F, KEY_T, KEY_G);
} 

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

}

function keySet(keyEvent, setTo) {
	if(keyEvent.keyCode == blueShip.controlKeyLeft) {
		blueShip.keyHeld_West = setTo;
	}
	if(keyEvent.keyCode == blueShip.controlKeyRight) {
		blueShip.keyHeld_East = setTo;
	}
	if(keyEvent.keyCode == blueShip.controlKeyUp) {
		blueShip.keyHeld_North = setTo;
	}
	if(keyEvent.keyCode == blueShip.controlKeyDown) {
		blueShip.keyHeld_South = setTo;
	}
	if(keyEvent.keyCode == blueShip.controlGiveFuel) {
		blueShip.keyHeld_Givefuel = setTo;
	}
	if(keyEvent.keyCode == blueShip.controlTakeFuel) {
		blueShip.keyHeld_Takefuel = setTo;
	}
	if(keyEvent.keyCode == blueShip.controlGivePeople) {
		blueShip.keyHeld_Givepeople = setTo;
	}
	if(keyEvent.keyCode == blueShip.controlTakePeople) {
		blueShip.keyHeld_Takepeople = setTo;
	}
	
	if(keyEvent.keyCode == blueShip.controlGiveOxygen) {
		blueShip.keyHeld_Giveoxygen = setTo;
	}
	
	if(keyEvent.keyCode == blueShip.controlTakeOxygen) {
		blueShip.keyHeld_Takeoxygen = setTo;
	}
	
	if(keyEvent.keyCode == blueShip.controlTakeOre) {
		blueShip.keyHeld_Takeore = setTo;
	}
	
	if(keyEvent.keyCode == blueShip.controlGiveOre) {
		blueShip.keyHeld_Giveore = setTo;
	}
		
}

function keyPressed(evt) { // uncomment to get keycodes for other keys to add as const
	 //console.log("Key pressed: "+evt.keyCode); 
	keySet(evt, true);

	evt.preventDefault();
}

function keyReleased(evt) {
	// console.log("Key pressed: "+evt.keyCode);
	keySet(evt, false);
}