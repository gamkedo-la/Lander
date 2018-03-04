const WORLD_W = 64;
const WORLD_H = 64;
const WORLD_GAP = 2;
const WORLD_COLS = 13;
const WORLD_ROWS = 10;
var levelOne =  [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 
				 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 7, 0, 
				 8, 0, 0, 0, 0, 0, 6, 0, 0, 0, 1, 1, 1, 
				 1, 1, 0, 0, 5, 1, 1, 1, 0, 0, 1, 1, 1, 
				 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1,
				 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 
				 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
				 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 
				 1, 2, 4, 0, 1, 1, 0, 5, 1, 0, 0, 9, 0, 
				 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
				 ];
var worldGrid = [];

const TILE_SPACE = 0;
const TILE_ROCK = 1;
const TILE_PLAYERSTART = 2;
const TILE_FUEL = 3;
const TILE_BASE = 4;
const TILE_PART = 5;
const TILE_BASE_ONE = 6;
const TILE_o2_RIG = 7;
const TILE_FUEL_RIG = 8;
const TILE_ORE_RIG = 9;

function returnTileTypeAtColRow(col, row) {
	if(col >= 0 && col < WORLD_COLS &&
		row >= 0 && row < WORLD_ROWS) {
		 var worldIndexUnderCoord = rowColToArrayIndex(col, row);
		 return worldGrid[worldIndexUnderCoord];
	} else {
		return TILE_ROCK;
	}
}

function getTileIndexAtPixelCoord(atX, atY) {
	var shipWorldCol = Math.floor(atX / WORLD_W);
	var shipWorldRow = Math.floor(atY / WORLD_H);
	var worldIndexUnderShip = rowColToArrayIndex(shipWorldCol, shipWorldRow);

	if(shipWorldCol >= 0 && shipWorldCol < WORLD_COLS &&
		shipWorldRow >= 0 && shipWorldRow < WORLD_ROWS) {
		return worldIndexUnderShip;
	} // end of valid col and row

	return undefined;
} // end of shipWorldHandling func

function rowColToArrayIndex(col, row) {
	return col + WORLD_COLS * row;
}

function tileTypeHasTransparency(checkTileType) {
	return (checkTileType == TILE_FUEL ||
			checkTileType == TILE_BASE ||
			checkTileType == TILE_BASE_ONE ||
			checkTileType == TILE_PART ||
			checkTileType == TILE_o2_RIG ||
			checkTileType == TILE_FUEL_RIG ||
			checkTileType == TILE_ORE_RIG
			);
}

function drawWorld() {

	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	for(var eachRow=0;eachRow<WORLD_ROWS;eachRow++) {
		for(var eachCol=0;eachCol<WORLD_COLS;eachCol++) {

			var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
			var tileKindHere = worldGrid[arrayIndex];
			var useImg = worldPics[tileKindHere];

			if( tileTypeHasTransparency(tileKindHere) ) {//draw space first then images with transparency on top
				canvasContext.drawImage(worldPics[TILE_SPACE],drawTileX,drawTileY);
			}
			canvasContext.drawImage(useImg,drawTileX,drawTileY);
			drawTileX += WORLD_W;
			arrayIndex++;
		} // end of for each col
		drawTileY += WORLD_H;
		drawTileX = 0;
	} // end of for each row

} // end of drawWorld func