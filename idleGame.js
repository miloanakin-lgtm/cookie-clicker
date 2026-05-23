/*let counter = document.getElementById("counter");
let counterValue = 0;
let multiCounter = 1;
let cursorAmount = 0;
localStorage.setItem("savedCookies", counterValue);

let cookies = parseInt(localStorage.getItem("savedCookies")) || 0;

let cookie = document.getElementById("cookie");
cookie.addEventListener("click", function() {
    counterValue += (1 * multiCounter);
    updateScreen();
});



let cpsCost = document.getElementById("cookieCostCPS");
let cpsCostNUM = 10;
let cpsButton = document.getElementById("cps");
cpsButton.addEventListener("click", function() {
    if (counterValue >= cpsCostNUM) {
        counterValue -= cpsCostNUM;
        multiCounter++;
        cpsCostNUM += 10;
        updateScreen()
    };
});



function updateScreen() {
    cookies.setItem("savedCookies", cookies)
    if (counterValue >= cpsCostNUM) {
        cpsButton.classList.remove("greyed");
    } else {
        cpsButton.classList.add("greyed");
    };
    if (counterValue >= cursorCost) {
        cursorButton.classList.remove("greyed");
    } else {
        cursorButton.classList.add("greyed");
    };
    if (counterValue >= cursorPowerCost) {
        cursorPowerButton.classList.remove("greyed");
    } else {
        cursorPowerButton.classList.add("greyed");
    };
    cpsButton.innerHTML=`Cookies per click: ${multiCounter}x <br><label id="cookieCostCPS">Costs: ${cpsCostNUM}</label>`
    counter.innerText=`Cookies: ${counterValue}`;
    cursorButton.innerHTML=`Cursors: ${cursorAmount} <br><label id="cursorCostCPS">Costs: ${cursorCost}</label>`
    document.getElementById("cursorPower-btn").innerHTML=`Cursor power: ${cursorMulti}x <br><label id="cursorCostCPS">Costs: ${cursorPowerCost}</label>`
}


setInterval(function() {
    counterValue += (cursorAmount * cursorMulti);
    updateScreen()
}, 1000)



let cursorButton = document.getElementById("cursor-btn");
let cursorCost = 20;
let cursorCostText = document.getElementById("cursorCostCPS");
cursorButton.addEventListener("click", function() {
    if (counterValue >= cursorCost) {
        counterValue -= cursorCost;
        cursorCost += 20;
        cursorAmount++;
        updateScreen();
    };
});


let cursorPowerCost = 10;
let cursorMulti = 1;
let cursorPowerButton = document.getElementById("cursorPower-btn");
cursorPowerButton.addEventListener("click", function() {
    if (counterValue >= cursorPowerCost) {
        cursorMulti++;
        counterValue -= cursorPowerCost;
        cursorPowerCost += 10;
	    updateScreen();
    };
});




updateScreen();
*/
// ==========================================
// 1. GAME STATE (Load Save File or Start at 0)
// ==========================================
// We pull everything from localStorage. If it doesn't exist yet (||), we use your starting numbers.
let counterValue = parseInt(localStorage.getItem("savedCookies")) || 0;
let multiCounter = parseInt(localStorage.getItem("savedMulti")) || 1;
let cpsCostNUM = parseInt(localStorage.getItem("savedCpsCost")) || 10;

let cursorAmount = parseInt(localStorage.getItem("savedCursors")) || 0;
let cursorCost = parseInt(localStorage.getItem("savedCursorCost")) || 20;

let cursorMulti = parseInt(localStorage.getItem("savedCursorMulti")) || 1;
let cursorPowerCost = parseInt(localStorage.getItem("savedCursorPowerCost")) || 10;


// ==========================================
// 2. GRAB HTML ELEMENTS
// ==========================================
const counter = document.getElementById("counter");
const cookie = document.getElementById("cookie");
const cpsButton = document.getElementById("cps");
const cursorButton = document.getElementById("cursor-btn");
const cursorPowerButton = document.getElementById("cursorPower-btn");


// ==========================================
// 3. CORE FUNCTIONS (Update & Save)
// ==========================================
function updateScreen() {
    // 1. Handle Grayed-out CSS
    if (counterValue >= cpsCostNUM) {
        cpsButton.classList.remove("greyed");
    } else {
        cpsButton.classList.add("greyed");
    }

    if (counterValue >= cursorCost) {
        cursorButton.classList.remove("greyed");
    } else {
        cursorButton.classList.add("greyed");
    }

    if (counterValue >= cursorPowerCost) {
        cursorPowerButton.classList.remove("greyed");
    } else {
        cursorPowerButton.classList.add("greyed");
    }

    // 2. Update Text (Changed <label> to <span> to prevent mobile clicking bugs!)
    counter.innerText = `Cookies: ${counterValue}`;
    cpsButton.innerHTML = `Cookies per click: ${multiCounter}x <br><span id="cookieCostCPS">Costs: ${cpsCostNUM}</span>`;
    cursorButton.innerHTML = `Cursors: ${cursorAmount} <br><span id="cursorCostCPS">Costs: ${cursorCost}</span>`;
    cursorPowerButton.innerHTML = `Cursor power: ${cursorMulti}x <br><span id="cursorPowerCostCPS">Costs: ${cursorPowerCost}</span>`;
}

function saveGame() {
    // Saves all variables to the browser memory
    localStorage.setItem("savedCookies", counterValue);
    localStorage.setItem("savedMulti", multiCounter);
    localStorage.setItem("savedCpsCost", cpsCostNUM);
    localStorage.setItem("savedCursors", cursorAmount);
    localStorage.setItem("savedCursorCost", cursorCost);
    localStorage.setItem("savedCursorMulti", cursorMulti);
    localStorage.setItem("savedCursorPowerCost", cursorPowerCost);
    console.log("Game Saved!");
}


// ==========================================
// 4. CLICK EVENTS
// ==========================================
cookie.addEventListener("click", function() {
    counterValue += (1 * multiCounter);
    updateScreen();
});

cpsButton.addEventListener("click", function() {
    if (counterValue >= cpsCostNUM) {
        counterValue -= cpsCostNUM;
        multiCounter++;
        cpsCostNUM += 10;
        updateScreen();
    }
});

cursorButton.addEventListener("click", function() {
    if (counterValue >= cursorCost) {
        counterValue -= cursorCost;
        cursorCost += 20;
        cursorAmount++;
        updateScreen();
    }
});

cursorPowerButton.addEventListener("click", function() {
    if (counterValue >= cursorPowerCost) {
        counterValue -= cursorPowerCost;
        cursorMulti++;
        cursorPowerCost += 10;
        updateScreen();
    }
});

document.getElementById("reset-btn").addEventListener("click", function() {
    if (confirm("Are you sure you want to delete ALL data?")) {
        localStorage.clear();
        location.reload();
    };
});

document.getElementById("save-btn").addEventListener("click", function() {
    saveGame();
    alert("Game saved");
});

// ==========================================
// 5. THE GAME LOOPS
// ==========================================

// Passive Income Loop (Runs every 1 second)
setInterval(function() {
    counterValue += (cursorAmount * cursorMulti);
    updateScreen();
}, 1000);

// Auto-Save Loop (Runs every 10 seconds)
// We put this in its own loop so it isn't saving to the hard drive 100 times a second!
setInterval(function() {
    saveGame();
}, 10000);


// ==========================================
// 6. STARTUP
// ==========================================
// Force the screen to update once immediately when the page loads
updateScreen();