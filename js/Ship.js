const PLAYER_MOVE_SPEED = 3.0;
//const PLAYER_THRUST_Y = 0.2; // made var when made damage system, BUT should this be kept then referenced when setting variable? also make const for player damaged thrust so can tweak more easily
//const PLAYER_THRUST_X = 0.2; // made var and split when made damage system, BUT should this be kept then referenced when setting variable? also make const for player damaged thrust so can tweak more easily
const GRAVITY = 0.1;
const AIR_RESISTANCE = 0.97;
const MAXIMUM_FALL_SPEED = 5;
const MINIMUM_X_SPEED = 0.05;
const DAMAGE_SPEED = 3;
const MINIMUM_DAMAGE = 10; // Thrust affected after this point
const MAXIMUM_DAMAGE = 4; // Ship destroyed after this point
const BOUNCE_X = 0.1
const FUEL_DEPLETION = 0.002;



function shipClass() {
	this.x = 75;
	this.y = 75;
	this.speedY = 0;
	this.speedX = 0;
	this.playerThrustY = 0.2;
	this.playerThrustXLeft = 0.2;
	this.playerThrustXRight = 0.2;
	this.myShipPic; // which picture to use
	this.myShipFiringPic;
	this.sideThrustLeft = sideThrustLeft;
	this.sideThrustRight = sideThrustRight;
	this.name = "Transport Ship";
	this.fuel = 5;
	this.partCarried = 0;
	this.engineer = 0;
	this.shipDamage = 0;
	this.shipDamageLeft = 0;
	this.shipDamageRight = 0;
	this.basepart = 0; // need to transfer these to base array
	this.baseonepart = 0; // need to transfer these to base array
	this.flying = 0 
	this.peoplecarried = 0;
	this.orecarried = 0;
	this.shipdestroyed = 0;
	
	
	this.keyHeld_North = false;// movement controls
	this.keyHeld_South = false;// Repair at base key
	this.keyHeld_West = false;// movement controls
	this.keyHeld_East = false;// movement controls
	
	this.controlKeyUp;
	this.controlKeyRight;
	this.controlKeyDown;
	this.controlKeyLeft;
	
	this.keyHeld_Givefuel = false;// transfer items controls
	this.keyHeld_Takefuel = false;
	this.keyHeld_Givepeople = false;
	this.keyHeld_Takepeople = false;
	this.keyHeld_Giveoxygen = false;
	this.keyHeld_Takeoxygen = false;

	this.controlGiveFuel;
	this.controlTakeFuel;
	this.controlGivePeople;
	this.controlTakePeople;
	this.controlGiveOxygen;
	this.controlTakeOxygen;

	this.setupInput = function(upKey, rightKey, downKey, leftKey, giveFuel, takePeople, takeFuel, givePeople, giveOxygen, takeOxygen, giveOre, takeOre) {
		this.controlKeyUp = upKey;
		this.controlKeyRight = rightKey;
		this.controlKeyDown = downKey;
		this.controlKeyLeft = leftKey;
		this.controlGiveFuel = giveFuel;
		this.controlTakeFuel = takeFuel;
		this.controlGivePeople = givePeople;
		this.controlTakePeople = takePeople;
		this.controlGiveOxygen = giveOxygen;
		this.controlTakeOxygen = takeOxygen;
		this.controlTakeOre = takeOre;
		this.controlGiveOre = giveOre;
	}

	this.reset = function(whichImage, shipName, firingImage) { // need to capture all values to be reset once added
		this.name = shipName;
		this.myShipPic = whichImage;// this is where link to image loaded is made in main, from what set in image loading
		this.myShipFiringPic = firingImage;
		this.fuel = 5;
		this.partCarried = 0;
		this.oxygenCarried = 6;
		this.oreCarried = 0;
		//this.fuelCarried = 0; not needed as just have one fuel pool for ship
		//this.engineer = 0; not used
		this.shipDamage = 0;
		this.shipDamageLeft = 0;
		this.shipDamageRight = 0;
		this.playerThrustXLeft = 0.2;
		this.playerThrustXRight = 0.2;
		this.playerThrustY = 0.2;
		this.peoplecarried = 0;
		this.shipdestroyed = 0;
		/* this.updateReadout(); *///debug text

		for(var eachRow=0;eachRow<WORLD_ROWS;eachRow++) { // for adding ship to world then removing player start
			for(var eachCol=0;eachCol<WORLD_COLS;eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
				if(worldGrid[arrayIndex] == TILE_PLAYERSTART) {
					worldGrid[arrayIndex] = TILE_SPACE;
					this.x = eachCol * WORLD_W + WORLD_W/2;
					this.y = eachRow * WORLD_H + WORLD_H/2;
					return;
				} // end of player start if
			} // end of col for
		} // end of row for
		console.log("NO PLAYER START FOUND!");
	} // end of shipReset func

	/* this.updateReadout = function() { // debug text
		document.getElementById("debugText").innerHTML = "Fuel: " + this.fuel;
		document.getElementById("debugText1").innerHTML = "Part: " + this.partCarried;
		document.getElementById("debugText2").innerHTML = "People: " + this.peoplecarried;
	document.getElementById("debugText3").innerHTML = "Damage: " + this.shipDamage;
	document.getElementById("debugText4").innerHTML = "Base Parts: " + this.basepart;
	document.getElementById("debugText5").innerHTML = "Base One Parts: " + this.baseonepart;
	} */

	this.move = function() {
		var nextX = this.x;
		var nextY = this.y;
		var nextSpeedY = this.speedY;
		var nextSpeedX = this.speedX;
		//var nextFuel = this.fuel;
		//this.updateReadout()//so troubleshooting readouts update!
		
		// added else statements so will reset thrust when damaged repaired
		if(this.shipDamage > MINIMUM_DAMAGE) {
		this.playerThrustY = 0.105; // take these out into constants so easier to adjust
		} else {
			this.playerThrustY = 0.2;
		}
		
		if(this.shipDamageLeft > MINIMUM_DAMAGE) {
		this.playerThrustXLeft = 0.07;
		} else {
		       this.playerThrustXLeft = 0.2;
		}
		
		if(this.shipDamageRight > MINIMUM_DAMAGE) {
		this.playerThrustXRight = 0.07;
		} else {
			this.playerThrustXRight = 0.2;
		}
		
		if (this.shipdestroyed >0){
		this.playerThrustY = 0.0;
		this.playerThrustXRight = 0.0;
		this.playerThrustXLeft = 0.0;
		}
		
		

		if(this.keyHeld_North) {
			if(this.fuel > 0){
			nextSpeedY = nextSpeedY - this.playerThrustY  ;
			this.fuel = this.fuel - FUEL_DEPLETION;
			
			}
		}
		/*if(this.keyHeld_South) {
			nextY += PLAYER_MOVE_SPEED;
		}*/
		if(this.keyHeld_East) {
			nextSpeedX = nextSpeedX + this.playerThrustXLeft ;
								
		}
		
		
		if(this.keyHeld_West) {
			nextSpeedX = nextSpeedX - this.playerThrustXRight ;
		}
		
		/*  if(this.keyHeld_Givefuel) {//test that new keycodes set up correctly
			console.log("Give fuel")
		}  */
		
		
		if(this.flying == 0){ // code to stop gliding in x when landed
			nextSpeedX = 0;
			}
		
		nextX = nextX + nextSpeedX ;
		nextY = nextY + nextSpeedY ;
		this.speedY = nextSpeedY + GRAVITY;
		this.speedX = nextSpeedX * AIR_RESISTANCE;
		
		
		if (this.speedY > MAXIMUM_FALL_SPEED) {  // put maximum limit on speed due to gravity
		 this.speedY = MAXIMUM_FALL_SPEED;
		}
		if (Math.abs(this.speedX) < MINIMUM_X_SPEED) {  // clamp speedX to zero when sufficently small
		 this.speedX = 0;
		}
		
		//console.log("SpeedY"+ nextSpeedY);
		//console.log("SpeedX"+ nextSpeedX);
		
		var walkIntoTileIndexBottom = getTileIndexAtPixelCoord(nextX, nextY+32);// sets point of detection to bottom center of sprite, still need to do proper multipoint detection
		var walkIntoTileIndexTop = getTileIndexAtPixelCoord(nextX, nextY-32);
		var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY); // center position
		var walkIntoTileIndexLeft = getTileIndexAtPixelCoord(this.x-32, nextY);
		var walkIntoTileIndexRight = getTileIndexAtPixelCoord(nextX+32, nextY);
		var walkIntoLeftAdjacentTileIndex = getTileIndexAtPixelCoord(nextX+WORLD_W, nextY);
		var walkIntoRightAdjacentTileIndex = getTileIndexAtPixelCoord(nextX-WORLD_W, nextY);
		
		var walkIntoTileType = TILE_ROCK;
		var walkIntoTileTypeBottom = TILE_ROCK;
		var walkIntoTileTypeTop = TILE_ROCK;
		var walkIntoTileTypeLeft = TILE_ROCK;
		var walkIntoTileTypeRight = TILE_ROCK;
		
		var walkIntoLeftAdjacentTileType = TILE_ROCK;
		var walkIntoRightAdjacentTileType = TILE_ROCK;
		
		if(walkIntoTileIndex != undefined) {
			walkIntoTileType = worldGrid[walkIntoTileIndex];
		}
		if(walkIntoLeftAdjacentTileIndex != undefined) {
			walkIntoLeftAdjacentTileType = worldGrid[walkIntoLeftAdjacentTileIndex];
		}
		if(walkIntoRightAdjacentTileIndex != undefined) {
			walkIntoRightAdjacentTileType = worldGrid[walkIntoRightAdjacentTileIndex];
		}
		
		if(walkIntoTileIndexBottom  != undefined) {
			walkIntoTileTypeBottom = worldGrid[walkIntoTileIndexBottom];
		}
		
		if(walkIntoTileIndexTop  != undefined) {
			walkIntoTileTypeTop = worldGrid[walkIntoTileIndexTop];
		}
		
		if(walkIntoTileIndexLeft  != undefined) {
			walkIntoTileTypeLeft = worldGrid[walkIntoTileIndexLeft];
		}
		
		if(walkIntoTileIndexRight  != undefined) {
			walkIntoTileTypeRight = worldGrid[walkIntoTileIndexRight];
		}
		
		
		switch(walkIntoLeftAdjacentTileType){
			case TILE_BASE:
			if(this.partCarried >0 && this.flying <1 )  { 
				
				this.partCarried --; // one less part
				baseState[0].partLevel += 1; // inturn increment base amount
				
				}
				
			if(this.keyHeld_South && baseState[0].partLevel >0 && this.flying <1 )  { 
				
				this.shipDamage = 0;
				this.shipDamageLeft = 0;
				this.shipDamageRight = 0;
				baseState[0].partLevel -= 1; // inturn increment base amount
				
				}
			
			if(this.fuel >0.4  && this.keyHeld_Givefuel && this.flying <1) { //donate fuel to base, need to convert to constants 
				this.fuel = this.fuel - 0.02;
				baseState[0].fuelLevel += 0.02;
				
			}
			
			if(baseState[0].fuelLevel >2 && this.keyHeld_Takefuel && this.flying <1) { //take fuel from base
			
				this.fuel = this.fuel + 0.02;
				baseState[0].fuelLevel -= 0.02;
				
			}
			
			// ready to go once have added key
			if(this.oxygenCarried >0  && this.keyHeld_Giveoxygen && this.flying <1) { //donate oxygen to base, need to convert to constants 
			console.log("O2 given");
				this.oxygenCarried = this.oxygenCarried - 0.02;
				baseState[0].oxygenLevel += 0.02;
				
			}
			
			if(baseState[0].oxygenLevel >2 && this.keyHeld_Takeoxygen && this.flying <1) { //take oxygen from base
			console.log("O2 taken");
				this.oxygenCarried = this.oxygenCarried + 0.02;
				baseState[0].oxygenLevel -= 0.02;
				
			}
			
			
			if(this.peoplecarried <5 && baseState[0].personnelLevel >0 && this.keyHeld_Takepeople && this.flying <1) { //take on people from base
				
				this.peoplecarried = this.peoplecarried + 1;
				baseState[0].personnelLevel -= 1;
				
			}
			
			if(this.peoplecarried >0 && this.keyHeld_Givepeople && this.flying <1) { //offload people to base
				
				this.peoplecarried = this.peoplecarried - 1;
				baseState[0].personnelLevel += 1;
				
			}
			
			if(this.oreCarried >0 && this.keyHeld_Giveore && this.flying <1) { //offload people to base
				
				this.oreCarried = this.oreCarried - 0.02;
				baseState[0].oreLevel += 0.02;
				
			}
			
			break;
				
			case TILE_BASE_ONE:
			if(this.partCarried >0 && this.flying <1 )  { 
				
				this.partCarried --; // one less part
				baseState[1].partLevel += 1; // inturn increment base amount
				
				}
				
			if(this.keyHeld_South && baseState[1].partLevel >0 && this.flying <1 )  { 
				
				this.shipDamage = 0;
				this.shipDamageLeft = 0;
				this.shipDamageRight = 0;
				baseState[1].partLevel -= 1; // inturn increment base amount
				
				}
			
			if(this.fuel >0.4  && this.keyHeld_Givefuel && this.flying <1) { //donate fuel to base, need to convert to constants 
				this.fuel = this.fuel - 0.02;
				baseState[1].fuelLevel += 0.02;
				
			}
			
			if(baseState[1].fuelLevel >2 && this.keyHeld_Takefuel && this.flying <1) { //take fuel from base
			
				this.fuel = this.fuel + 0.02;
				baseState[1].fuelLevel -= 0.02;
				
			}
			
			// ready to go once have added key
			if(this.oxygenCarried >0  && this.keyHeld_Giveoxygen && this.flying <1) { //donate oxygen to base, need to convert to constants 
			console.log("O2 given");
				this.oxygenCarried = this.oxygenCarried - 0.02;
				baseState[1].oxygenLevel += 0.02;
				
			}
			
			if(baseState[1].oxygenLevel >2 && this.keyHeld_Takeoxygen && this.flying <1) { //take oxygen from base
			console.log("O2 taken");
				this.oxygenCarried = this.oxygenCarried + 0.02;
				baseState[1].oxygenLevel -= 0.02;
				
			}
			
			
			if(this.peoplecarried <5 && baseState[1].personnelLevel >0 && this.keyHeld_Takepeople && this.flying <1) { //take on people from base
				
				this.peoplecarried = this.peoplecarried + 1;
				baseState[1].personnelLevel -= 1;
				
			}
			
			if(this.peoplecarried >0 && this.keyHeld_Givepeople && this.flying <1) { //offload people to base
				
				this.peoplecarried = this.peoplecarried - 1;
				baseState[1].personnelLevel += 1;
				
			}
			
			break;
			
			case TILE_O2_RIG:	
						
			if(baseState[2].oxygenLevel >0 && this.keyHeld_Takeoxygen && this.flying <1) { //take oxygen from O2 rig
			console.log("O2 taken");
				this.oxygenCarried = this.oxygenCarried + 0.02;
				baseState[2].oxygenLevel -= 0.02;
				
			}
					
			break;
			
			case TILE_FUEL_RIG:	
						
			if(baseState[3].fuelLevel >2 && this.keyHeld_Takefuel && this.flying <1) { //take fuel from base
			
				this.fuel = this.fuel + 0.02;
				baseState[3].fuelLevel -= 0.02;
				
			}
					
			break;
			
			case TILE_ORE_RIG:	
						
			if(baseState[4].oreLevel >0 && this.keyHeld_Takeore && this.flying <1) { //take ore from base
			//console.log("Ore taken");
				this.oreCarried += 0.02;
				baseState[4].oreLevel -= 0.02;
				
			}
					
			break;
			
			default:
				break;
		}
		
		switch(walkIntoRightAdjacentTileType){
			case TILE_BASE:
			if(this.partCarried >0 && this.flying <1 )  { 
				
				this.partCarried --; // one less part
				baseState[0].partLevel += 1; // inturn increment base amount
				
				}
				
			if(this.keyHeld_South && baseState[0].partLevel >0 && this.flying <1 )  { 
				
				this.shipDamage = 0;
				this.shipDamageLeft = 0;
				this.shipDamageRight = 0;
				baseState[0].partLevel -= 1; // inturn increment base amount
				
				}
			
			if(this.fuel >0.4  && this.keyHeld_Givefuel && this.flying <1) { //donate fuel to base, need to convert to constants 
				this.fuel = this.fuel - 0.02;
				baseState[0].fuelLevel += 0.02;
				
			}
			
			if(baseState[0].fuelLevel >2 && this.keyHeld_Takefuel && this.flying <1) { //take fuel from base
			
				this.fuel = this.fuel + 0.02;
				baseState[0].fuelLevel -= 0.02;
				
			}
			
			// ready to go once have added key
			if(this.oxygenCarried >0  && this.keyHeld_Giveoxygen && this.flying <1) { //donate oxygen to base, need to convert to constants 
			console.log("O2 given");
				this.oxygenCarried = this.oxygenCarried - 0.02;
				baseState[0].oxygenLevel += 0.02;
				
			}
			
			if(baseState[0].oxygenLevel >2 && this.keyHeld_Takeoxygen && this.flying <1) { //take oxygen from base
			console.log("O2 taken");
				this.oxygenCarried = this.oxygenCarried + 0.02;
				baseState[0].oxygenLevel -= 0.02;
				
			}
			
			
			if(this.peoplecarried <5 && baseState[0].personnelLevel >0 && this.keyHeld_Takepeople && this.flying <1) { //take on people from base
				
				this.peoplecarried = this.peoplecarried + 1;
				baseState[0].personnelLevel -= 1;
				
			}
			
			if(this.peoplecarried >0 && this.keyHeld_Givepeople && this.flying <1) { //offload people to base
				
				this.peoplecarried = this.peoplecarried - 1;
				baseState[0].personnelLevel += 1;
				
			}
			
			if(this.oreCarried >0 && this.keyHeld_Giveore && this.flying <1) { //offload people to base
				
				this.oreCarried = this.oreCarried - 0.02;
				baseState[0].oreLevel += 0.02;
				
			}
			
			break;
				
			case TILE_BASE_ONE:
			if(this.partCarried >0 && this.flying <1 )  { 
				
				this.partCarried --; // one less part
				baseState[1].partLevel += 1; // inturn increment base amount
				
				}
				
			if(this.keyHeld_South && baseState[1].partLevel >0 && this.flying <1 )  { 
				
				this.shipDamage = 0;
				this.shipDamageLeft = 0;
				this.shipDamageRight = 0;
				baseState[1].partLevel -= 1; // inturn increment base amount
				
				}
			
			if(this.fuel >0.4  && this.keyHeld_Givefuel && this.flying <1) { //donate fuel to base, need to convert to constants 
				this.fuel = this.fuel - 0.02;
				baseState[1].fuelLevel += 0.02;
				
			}
			
			if(baseState[1].fuelLevel >2 && this.keyHeld_Takefuel && this.flying <1) { //take fuel from base
			
				this.fuel = this.fuel + 0.02;
				baseState[1].fuelLevel -= 0.02;
				
			}
			
			// ready to go once have added key
			if(this.oxygenCarried >0  && this.keyHeld_Giveoxygen && this.flying <1) { //donate oxygen to base, need to convert to constants 
			console.log("O2 given");
				this.oxygenCarried = this.oxygenCarried - 0.02;
				baseState[1].oxygenLevel += 0.02;
				
			}
			
			if(baseState[1].oxygenLevel >2 && this.keyHeld_Takeoxygen && this.flying <1) { //take oxygen from base
			console.log("O2 taken");
				this.oxygenCarried = this.oxygenCarried + 0.02;
				baseState[1].oxygenLevel -= 0.02;
				
			}
			
			
			if(this.peoplecarried <5 && baseState[1].personnelLevel >0 && this.keyHeld_Takepeople && this.flying <1) { //take on people from base
				
				this.peoplecarried = this.peoplecarried + 1;
				baseState[1].personnelLevel -= 1;
				
			}
			
			if(this.peoplecarried >0 && this.keyHeld_Givepeople && this.flying <1) { //offload people to base
				
				this.peoplecarried = this.peoplecarried - 1;
				baseState[1].personnelLevel += 1;
				
			}
			
			break;
			
			case TILE_O2_RIG:	
						
			if(baseState[2].oxygenLevel >0 && this.keyHeld_Takeoxygen && this.flying <1) { //take oxygen from O2 rig
			//console.log("O2 taken");
				this.oxygenCarried = this.oxygenCarried + 0.02;
				baseState[2].oxygenLevel -= 0.02;
				
			}
					
			break;
			
			case TILE_FUEL_RIG:	
						
			if(baseState[3].fuelLevel >0 && this.keyHeld_Takefuel && this.flying <1) { //take fuel from base
			
				this.fuel = this.fuel + 0.02;
				baseState[3].fuelLevel -= 0.02;
				
			}
					
			break;
			
			case TILE_ORE_RIG:	
						
			if(baseState[4].oreLevel >0 && this.keyHeld_Takeore && this.flying <1) { //take ore from base
			//console.log("Ore taken");
				this.oreCarried += 0.02;
				baseState[4].oreLevel -= 0.02;
				
			}
					
			break;
			
			default:
				break;
		}

		switch(walkIntoTileType) {
			case TILE_SPACE:
				this.x = nextX;
				this.y = nextY;
				break;
			case TILE_FUEL:  //  pick up style
				this.fuel++; // one more fuel
				//this.updateReadout();
				worldGrid[walkIntoTileIndex] = TILE_SPACE;
				break;
			case TILE_PART:
				this.partCarried++; // one more part
				//this.updateReadout();
				worldGrid[walkIntoTileIndex] = TILE_SPACE;
				break;
			/*case TILE_BASE:
				this.keysHeld++; // one more key
				//this.updateReadout();
				worldGrid[walkIntoTileIndex] = TILE_SPACE;
				break;*/
					default:
				break;
		}
				
			/*	
			case TILE_ROCK: // currently causes damage for both components need and/or to just be one?
				if(Math.abs(this.speedY) > DAMAGE_SPEED) {
					this.shipDamage ++; // increase level of ship damage
					//this.updateReadout();
					}
				if(Math.abs(this.speedX) > DAMAGE_SPEED) {
					this.shipDamage ++; // increase level of ship damage
					//this.updateReadout();
					}
				if(this.shipDamage >= MAXIMUM_DAMAGE) {
					colorTextLarge("Ship destroyed", 400, 300, "red")
							setTimeout(loadLevel(levelOne, levelOneBaseState), 5000);
				}	*/
			if(walkIntoTileTypeBottom == TILE_ROCK){ // use == to not = as that sets it to equal not checks if it is equal too
			this.flying = 0 // set flag so can stop x sliding when landed
				if(Math.abs(this.speedY) > DAMAGE_SPEED) {
						this.shipDamage ++; // increase level of ship damage
						//this.updateReadout();
						}
					if(Math.abs(this.speedX) > DAMAGE_SPEED) {
						this.shipDamage ++; // increase level of ship damage
						//this.updateReadout();
						}
					if(this.shipDamage >= MAXIMUM_DAMAGE) {
						//console.log(this.name + " Ship destroyed");
						this.shipdestroyed = 1;
						//setTimeout(loadLevel(levelOne, levelOneBaseState), 5000);
					}
			this.speedY = 0.0;
			this.speedX = 0.0;
			}
			
			if(walkIntoTileTypeBottom == TILE_SPACE){
			this.flying = 1	// set flag to flying so can have x movement once cleared ground
			}
			
			
			if(walkIntoTileTypeTop == TILE_ROCK){ // use == to not = as that sets it to equal not checks if it is equal too
			this.speedY = +0.1; // not sure why setting - this.x doesn't work??
			
			} // check if can use || as split
			
			if(walkIntoTileTypeLeft == TILE_ROCK){ // use == to not = as that sets it to equal not checks if it is equal too
				if(Math.abs(this.speedY) > DAMAGE_SPEED) {
						this.shipDamageLeft ++; // increase level of ship damage
						//this.updateReadout();
						}
					if(Math.abs(this.speedX) > DAMAGE_SPEED) {
						this.shipDamageLeft ++; // increase level of ship damage
						//this.updateReadout();
						}
					if(this.shipDamageLeft >= MAXIMUM_DAMAGE) {
						this.shipdestroyed = 1;
							//setTimeout(loadLevel(levelOne, levelOneBaseState), 5000);
					}
		
			this.speedX = 0.0;
			}
			
			if(walkIntoTileTypeRight == TILE_ROCK){ // use == to not = as that sets it to equal not checks if it is equal too
			
				if(Math.abs(this.speedY) > DAMAGE_SPEED) {
							this.shipDamageRight ++; // increase level of ship damage
							//this.updateReadout();
							}
						if(Math.abs(this.speedX) > DAMAGE_SPEED) {
							this.shipDamageRight ++; // increase level of ship damage
							//this.updateReadout();
							}
						if(this.shipDamageRight >= MAXIMUM_DAMAGE) {
							//console.log(this.name + " Ship destroyed");
							this.shipdestroyed = 1;
							//setTimeout(loadLevel(levelOne, levelOneBaseState), 5000);
						}
			
			this.speedX = 0.0;}
			
		
			if(this.shipdestroyed >0 && this.keyHeld_Takeore ) { //take ore from base
			loadLevel(levelOne, levelOneBaseState)
			}
		
	}

	
	
	this.draw = function() {
		
		// draw thrusters on key press
		if(this.keyHeld_North) {//draw ship and main thruster when on
			
			drawBitmapCenteredWithRotation(this.myShipFiringPic, this.x,this.y, 0);
			} else {
		
			drawBitmapCenteredWithRotation(this.myShipPic, this.x,this.y, 0);}
			
		if(this.keyHeld_East) {//side thruster
			
			drawBitmapCenteredWithRotation(this.sideThrustRight, this.x -15,this.y, 0);
			}
								
		
		
		
		if(this.keyHeld_West) {//side thruster
			
			drawBitmapCenteredWithRotation(this.sideThrustLeft, this.x +15,this.y, 0);
		}
		
		// ship load levels drawing, note will need to shift out to seperate function when have multiple ships
		colorTextMedium("Fuel :"+Math.floor(this.fuel), 50,20,'white');
		colorTextMedium("Part :"+this.partCarried, 150,20,'white');
		colorTextMedium("Oxygen :"+Math.floor(this.oxygenCarried ), 250,20,'white');
		colorTextMedium("People :"+Math.floor(this.peoplecarried), 350,20,'white');
		colorTextMedium("Ore :"+Math.floor(this.oreCarried), 450,20,'white');
		
		//colorText("Part :"+this.partCarried, 270,510,'white')
		if (this.shipdestroyed >0){
		colorTextLarge("Ship Non functional", 325, 300, "red")
		}
	}
}