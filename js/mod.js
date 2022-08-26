let modInfo = {
	name: "The Modding Tree",
	id: "mymod",
	author: "",
	pointsName: "points",
	discordName: "",
	discordLink: "",
	initialStartPoints: new ExpantaNum (10), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new ExpantaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new ExpantaNum(0)

	let gain = new ExpantaNum(1)
	if (hasUpgrade('p', 11)) gain = gain.times(10)
	if (hasUpgrade('p', 13)) gain = gain.times(upgradeEffect('p', 13))
	if (hasUpgrade('p', 14)) gain = gain.add(player.points)
	if (hasUpgrade('p', 15)) gain = gain.times(upgradeEffect('p', 15))
	if (ExpantaNum.gte(player.points,4294967296)&&!hasUpgrade('p', 31)) {
		gain=gain.logBase(2).arrow(1)(6.4)
		if (hasUpgrade('p', 21)) gain = gain.times(gain.logBase(2).arrow(1)(upgradeEffect('p', 21)))
		if (hasUpgrade('p', 23)) gain = gain.times(gain.logBase(2).arrow(1)(6.9))
	}
	if (hasUpgrade('p', 25)) gain = gain.arrow(1)(upgradeEffect('p', 25))
	if (hasUpgrade('p', 26)) gain = gain.times(ExpantaNum("1e107"))
	if (hasUpgrade('p', 31)) gain = gain.add(player.points.times(player.points.add(2).logBase(2)))
	if (hasUpgrade('p', 32)) {gain = 1
		gain=player.points.add(1).arrow(1)(1e100)}
	if (hasUpgrade('p', 33)) {
		gain=player.points.arrow(1)(player.points.add(1).logBase(2))
	}
	if (hasUpgrade('p', 34)) {
		gain=player.points.arrow(2)(1.001)
	}
	if (hasUpgrade('p', 35)) gain = player.points.arrow(2)(player.points.add(2).slog(2).add(1).slog(1.5))
	if (hasUpgrade('p', 36)) gain = player.points.arrow(2)(player.points.add(2).slog(2))
	if (hasUpgrade('E', 11)) gain = gain.times(player.points.add(1).arrow(1)(2))
	if (hasUpgrade('E', 12)) gain = gain.times(player.points.add(1).arrow(1)(player.E.points.add(1)))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return false
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
