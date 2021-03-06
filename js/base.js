const BASE_OXYGEN_USAGE = 0.002; //30 frames per sec so need to base off of that
const BASE_FUEL_USAGE = 0.004; 
const BASE_DEATH_RATE = 0.05;
const BASE_OXYGEN_PRODUCTION = 0.003
const BASE_FUEL_PRODUCTION = 0.003
const BASE_ORE_PRODUCTION = 0.003
const ORE_WIN = 8; // set low for test, amount of ore that calls trader to save you

var levelOneBaseState = [// pull out unneeded values? Change alpha and beta so can use baseName field to control, can always have show name field seperate
//// baseX and baseY need to be written out from world 
{baseName: "Alpha", oxygenLevel: 4, fuelLevel: 10, personnelLevel: 10, baseX: 0, baseY: 0, partLevel: 0, oreLevel: 0},
{baseName: "Beta", oxygenLevel: 4, fuelLevel: 10, personnelLevel: 10, baseX: 0, baseY: 0, partLevel: 0, oreLevel: 0},
{baseName: "Oxygen", oxygenLevel: 10, fuelLevel: 0, personnelLevel: 0, baseX: 0, baseY: 0, partLevel: 0},
{baseName: "Fuel", oxygenLevel: 0, fuelLevel: 10, personnelLevel: 0, baseX: 0, baseY: 0, partLevel: 0},
{baseName: "Ore", oreLevel:10, personnelLevel: 0, baseX: 0, baseY: 0, partLevel: 0}
];

var baseState = [// need to check how to correctly set array from other so can have clean state to return to
];

var oreWinTime = 0; // timer for trader coming message

function baseUpdate () {
		
	for (var i=0; i<baseState.length; i++) { // var i means has function scope, could use let i then would have block scope
		if (baseState[i].personnelLevel > 0){//so usage only occurring when crew present, not linked to crew level yet
			
		baseState[i].oxygenLevel -= BASE_OXYGEN_USAGE; //// rewrite this so only applies if value above 0 rather than constantly changing and resetting if is zero
		baseState[i].fuelLevel -= BASE_FUEL_USAGE;
		
			if (baseState[i].oreLevel > ORE_WIN && oreWinTime < 360){
				colorTextLarge("The trader says that's enough Ore mined for them to come!", 100,50,'white')
				oreWinTime = oreWinTime +1;			}
		
		}
		
		// Production of resources
		if (baseState[i].baseName == "Oxygen") {
			baseState[i].oxygenLevel += BASE_OXYGEN_PRODUCTION
		}
		
		if (baseState[i].baseName == "Fuel") {
			baseState[i].fuelLevel += BASE_FUEL_PRODUCTION
		}
		
		if (baseState[i].baseName == "Ore") {
			baseState[i].oreLevel += BASE_ORE_PRODUCTION
		}
		
		if (baseState[0].oxygenLevel < 2) { //// so need to make general, do based on loop through all with && statemnent for baseName
			colorTextMedium("We're running out of oxygen!", 145,450,'red')
		}
		
		if (baseState[1].oxygenLevel < 2) { // so need to make general
			colorTextMedium("We're running out of oxygen!", 400,50,'red')
		}
		
		if (baseState[i].oxygenLevel <=0){//// capture this in code above so can get rid of hack
			baseState[i].oxygenLevel = 0;
			baseState[i].personnelLevel -= BASE_DEATH_RATE;//so no effect if run out of fuel at minute
				if (baseState[i].personnelLevel <0){
					baseState[i].personnelLevel = 0;
				}
		}
		
		if (baseState[i].fuelLevel <=0) {// capture this in code above so can get rid of hack
			baseState[i].fuelLevel = 0
		}
		
	}
		
		//// below place holder hard coded,need to make UI function in Base.js and add location value to baseState by writing out from World, drawWorld function, using if tile type base etc
		colorText("Part :"+Math.floor(baseState[0].partLevel), 145,510,'white')
		colorText("o2 :"+Math.floor(baseState[0].oxygenLevel), 145,490,'white')
		colorText("Fuel :"+Math.floor(baseState[0].fuelLevel), 145,500,'white')
		colorText("Personnel :"+Math.floor(baseState[0].personnelLevel), 145,480,'white')
		colorText("Ore :"+Math.floor(baseState[0].oreLevel), 145,470,'white')
				
		colorText("Part :"+Math.floor(baseState[1].partLevel), 400,125,'white')
		colorText("o2 :"+Math.floor(baseState[1].oxygenLevel), 400,105,'white')
		colorText("Fuel :"+Math.floor(baseState[1].fuelLevel), 400,115,'white')
		colorText("Personnel :"+Math.floor(baseState[1].personnelLevel), 400,95,'white')
		colorText("Ore :"+Math.floor(baseState[1].oreLevel), 400,85,'white')
				
		colorText("Ore :"+Math.floor(baseState[4].oreLevel), 720,510,'white')
		
		colorText("Fuel :"+Math.floor(baseState[3].fuelLevel), 15,125,'white')
		
		colorText("Oxygen :"+Math.floor(baseState[2].oxygenLevel), 710,60,'white')
	}

function baseUI () {
	//Code so that text for O2 for bases as getting critical white->orange->red
	}