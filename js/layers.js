addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
    }},
    color: "#4BDC13",
    requires: new ExpantaNum(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new ExpantaNum(1)
        if (hasUpgrade('p', 12)) mult = mult.times(10)
        if (hasUpgrade('p', 22)) mult = mult.times(10)
        if (hasUpgrade('p', 24)) mult = mult.times(upgradeEffect('p', 24))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new ExpantaNum(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    upgrades: {
        11: {
            title: "1 per each second",
            description: "Decuple your point gain.",
            cost: new ExpantaNum(1),
        },
        12: {
            title: "10 is new 1",
            description: "Decuple your prestige point gain.",
            cost: new ExpantaNum(10),
        },
        13: {
            title: "Finally those matter.",
            description: "Boost your point gain based on prestige.",
            cost: new ExpantaNum(255),
            effect() {
                return player[this.layer].points.add(1).sqrt()
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        14: {
            title: "Early game inflation be like.",
            description: "Add points to point gain(point gain is softcapped after a lil bit)",
            cost: new ExpantaNum(8192),
        },
        15: {
            title: "1e7 is new 1",
            description: "Boost point gain based on prestige points after upgrade 14 but before softcap.",
            cost: new ExpantaNum(8388608),
            effect() {
                return player[this.layer].points.add(1).sqrt()
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        16: {
            title: "Make this whatever you want!",
            description: "Double point gain",
            cost: new ExpantaNum("1e12"),
            unlocked() {
                return hasUpgrade("p",22)
            }
        },
        21: {
            title: "Softcap booster.",
            description: "Boost softcap exponent by 0.5 for each upgrade.",
            cost: new ExpantaNum("1e8"),
            effect() {
                return player[this.layer].upgrades.length*0.5
            },
            effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id)) },
            unlocked() {
                return hasUpgrade("p",15)
            }
        },
        22: {
            title: "Dev is tired so...",
            description: "Decuple prestige point gain and unlock Placeholder upgrade.",
            cost: new ExpantaNum("1e10"),
            unlocked() {
                return hasUpgrade("p",15)
            }
        },
        23: {
            title: "Softcap fun.",
            description: "Increase softcap exp by funni number/10.",
            cost: new ExpantaNum("1e13"),
            unlocked() {
                return hasUpgrade("p",15)
            }
        },
        24: {
            title: "Why is that this far?",
            description: "Prestige point gain is multiplied based on them.",
            cost: new ExpantaNum("2e20"),
            effect() {
                return player[this.layer].points.add(1).cbrt()
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {
                return hasUpgrade("p",15)
            }
        },
        25: {
            title: "Force single tab mode incoming.",
            description: "Points are raised based on them.",
            cost: new ExpantaNum("1e32"),
            effect() {
                return player.points.add(2).logBase(2).add(1).logBase(2).add(1).logBase(2)
            },
            effectDisplay() { return "^"+format(upgradeEffect(this.layer, this.id)) },
            unlocked() {
                return hasUpgrade("p",15)
            }
        },
        26: {
            title: "Cost",
            description: "*1e107 points",
            cost: new ExpantaNum("1e107"),
            unlocked() {
                return hasUpgrade("p",25)
            }
        },
        31: {
            title: "Start inflation",
            description: "Remowe softcap and point gain is added by points*log_2(points).",
            cost: new ExpantaNum("1e339"),
            unlocked() {
                return hasUpgrade("p",26)
            }
        },
        32: {
            title: "Wait dididid it realaellay inflaaate?1/?!!?!??!/?1?",
            description: "Remove all the previous upgrade effects but gain is raised to 1e100 every tick.",
            cost: new ExpantaNum("ee1000"),
            unlocked() {
                return hasUpgrade("p",31)
            }
        },
        33: {
            title: "Its only gonna get worse now.",
            description: "Remove all the previous upgrade effects but gain is raised to log(points) every tick.",
            cost: new ExpantaNum("ee100000"),
            unlocked() {
                return hasUpgrade("p",32)
            }
        },
        34: {
            title: "And more worse.",
            description: "Tetrate points by 1.001 each tick.",
            cost: new ExpantaNum("eee303"),
            unlocked() {
                return hasUpgrade("p",33)
            }
        },
        35: {
            title: "Giggolchime.",
            description: "Tetrate points by slog(slog(points)) each second.",
            cost: new ExpantaNum("10^^1000"),
            unlocked() {
                return hasUpgrade("p",34)
            }
        },
        36: {
            title: "Giggoltoll.",
            description: "Tetrate points by slog(points) each second.",
            cost: new ExpantaNum("10^^10000"),
            unlocked() {
                return hasUpgrade("p",35)
            }
        },
        41: {
            title: "break_eternity.js is not good.",
            description: "Unlock new layer.",
            cost: new ExpantaNum("10^^1.7976e308"),
            unlocked() {
                return hasUpgrade("p",36)
            }
        },
    },
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
addLayer("E", {
    name: "Broken eternities", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
    }},
    color: "#ABC123",
    requires: new ExpantaNum("10^^1e308"), 
    resource: "broken eternities",
    baseResource: "points",
    baseAmount() {return player.points},
    type() {
        if (hasUpgrade("E",13)) {
            return "normal"
        }
        else {
            return "static"
        }
    },
    exponent: ExpantaNum(2).tetrate(1e308),
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new ExpantaNum(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new ExpantaNum(1)
    },
    upgrades:{
        11:{
            title: "sped up",
            description: "Square point gain per tick AFTER the softcap..",
            cost: new ExpantaNum(0),
        },
        12:{
            title: "Ok this is boring now.",
            description: "Raise points by E+1",
            cost: new ExpantaNum(10),
        },
        13:{
            title: "SIMPLER.",
            description: "type is normal now!",
            cost: new ExpantaNum(3),
        }
    },
    branches: ["p"],
    row: 1, // Row the layer is in on the tree (0 is the first row),
    hotkeys: [
        {key: "e", description: "E: Break some eternities", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("p",41)||hasUpgrade("E",11)}
})

