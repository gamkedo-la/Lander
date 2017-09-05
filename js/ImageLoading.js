var shipPic = document.createElement("img");
var shipFiringPic = document.createElement("img");
var sideThrustLeft = document.createElement("img");
var sideThrustRight = document.createElement("img");
var worldPics = [];

var picsToLoad = 0; // set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	//console.log(picsToLoad);
	if(picsToLoad == 0) {
		imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "images/"+fileName;
}

function loadImageForWorldCode(worldCode, fileName) {
	worldPics[worldCode] = document.createElement("img");
	beginLoadingImage(worldPics[worldCode], fileName);
}

function loadImages() {
	var imageList = [
		{varName: shipPic, theFile: "ship.png"},
		{varName: shipFiringPic, theFile: "shipfiring.png"},
		{varName: sideThrustLeft, theFile: "sidethrustleft.png"},
		{varName: sideThrustRight, theFile: "sidethrustright.png"},

		{worldType: TILE_SPACE, theFile: "space.png"},
		{worldType: TILE_ROCK, theFile: "rock.png"},
		{worldType: TILE_FUEL, theFile: "fuel.png"},
		{worldType: TILE_BASE, theFile: "base.png"},
		{worldType: TILE_BASE_ONE, theFile: "base1.png"},
		{worldType: TILE_PART, theFile: "part.png"},
		{worldType: TILE_O2_RIG, theFile: "O2rig.png"},
		{worldType: TILE_FUEL_RIG, theFile: "fuelrig.png"},
		{worldType: TILE_ORE_RIG, theFile: "orerig.png"}
		];

	picsToLoad = imageList.length;

	for(var i=0;i<imageList.length;i++) {
		if(imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		} else {
			loadImageForWorldCode(imageList[i].worldType, imageList[i].theFile);
		}
	}
}