/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    for(let i = 0; i < games.length; i++){
    // loop over each item in the data

        // create a new div element, which will become the game card
        let gameCardDiv = document.createElement('div');

        // add the class game-card to the list

        gameCardDiv.classList.add('game-card');

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")

        //<img class="game-img" src=${games[i].img}>

        const display = `
        <div class = "games">
            <h1>Game Name: ${games[i].name}</h1>
            <img class="game-img" src=${games[i].img}>
            <p>${games[i].description}</p>
        </div>
        `;

        gameCardDiv.innerHTML = display;
        // append the game to the games-container
        gamesContainer.append(gameCardDiv);
    }

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element  *paragraph tag with number of contributions
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);


// set the inner HTML using a template literal and toLocaleString to get a number with commas


const contributions = `
            <p>${totalContributions.toLocaleString('en-US')}</p>
        `;

contributionsCard.innerHTML = contributions;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
// set inner HTML using template literal
const amountRaised = `
            <p>$${totalRaised.toLocaleString('en-US')}</p>
        `;

raisedCard.innerHTML = amountRaised;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;

gamesCard.innerHTML = totalGames;
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const filterGoalMissed = GAMES_JSON.filter((game) => game.pledged < game.goal);
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(filterGoalMissed);
}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const filterGoalReached = GAMES_JSON.filter((game) => game.pledged >= game.goal);
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(filterGoalReached);
}


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly)
allBtn.addEventListener("click", showAllGames)

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const filterUnfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);
const totalUG = filterUnfundedGames.length;
console.log(totalUG);

// create a string that explains the number of unfunded games using the ternary operator
let unfundedString = `Currently, ${totalUG >= 7 ? "7" : "less than 7"} game remains unfunded. We need your help to reach our goal! You are worthy to have the best game experience :)`;

// create a new DOM element containing the template string and append it to the description container
const descriptionUnfundedString = `
            <p>${unfundedString}</p>
        `;
        // append the game to the games-container
        descriptionContainer.innerHTML += unfundedString;
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});
console.log(sortedGames);

// use destructuring and the spread operator to grab the first and second games
// sortedGames[0] sortedGames[1]
const [game0, game1] = sortedGames;
console.log(game0);
console.log(game1);
// create a new element to hold the name of the top pledge game, then append it to the correct element
let topCardDiv = document.createElement('div');
topCardDiv.classList.add('game-card');
const display1 = `
        <div class = "games">
            <h1>Game Name: ${game0.name}</h1>
            <img class="game-img" src=${game0.img}>
            <p>${game0.description}</p>
        </div>
        `;

topCardDiv.innerHTML = display1;
firstGameContainer.append(topCardDiv);
// do the same for the runner up item
let runnerCardDiv = document.createElement('div');
runnerCardDiv.classList.add('game-card');
const display2 = `
        <div class = "games">
            <h1>Game Name: ${game1.name}</h1>
            <img class="game-img" src=${game1.img}>
            <p>${game1.description}</p>
        </div>
        `;

runnerCardDiv.innerHTML = display2;
secondGameContainer.append(runnerCardDiv);