const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let flippedCards = 0;
let noClicking = false;
const scoreCounter = document.getElementById("counter");
let score = 0;



const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card

let shuffledColors = shuffle(COLORS);
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  if (noClicking) return;
  if (event.target.classList.contains("flipped")) return;

  //define the clickedCard as the div being targeted by the click event
  let clickedCard = event.target;
  //set the background color of the targeted div to match the class name from the COLORS array (which has an index of 0 in the classList):
  clickedCard.style.backgroundColor = clickedCard.classList[0];
  
  //if card1 does not equal false OR card2 does not equal false...
  if (card1 !== false | card2 !== false) {
    //add the class "flipped" to the classlist of the current targeted div.
    clickedCard.classList.add("flipped");
    
    //card1 will keep its property as long as does not equal false; else card1 will take the property of clickedCard:
    card1 = card1 || clickedCard;
    
    //if clickedCard is currently card1, card2 = null. Otherwise card2 becomes clickedCard (targeted div)
    card2 = (clickedCard == card1) ? null : clickedCard;
    
    //test:
    console.log(card1);
    console.log(clickedCard);
    console.log(card2);
    console.log(clickedCard);
  }


  // if card1 and card2 return true - if any one returns false, then the evaluation is stopped and falsy value is returned.
  if (card1 && card2) {
    noClicking = true; //if card1 and card2 are true / have properties associated, noClicking returns true
    let color1 = card1.className;
    let color2 = card2.className;

  //if the class name (color) of card1 equals the class name (color) or card 2
    if (color1 === color2) {

      //add 2 to the flipped cards counter
      flippedCards += 2;

      card1.classList.add("yay");
      card2.classList.add("yay");

      //remove the event listeners on the matching cards
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);

      // return card1 and card2 values to null to start the process over
      card1 = null;
      card2 = null;
      noClicking = false;

      //if the class name (color) of card1 DOES NOT equal the class name (color) of card 2, return the background color to empty and remove "flipped" class name, and return the calues of clicked cards to null
    } else {
      setTimeout(function () {
        card1.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card1 = null;
        card2.style.backgroundColor = "";
        card2.classList.remove("flipped");
        card2 = null;
        noClicking = false;
      }, 1000);
      
      //add 1 to the score tally
      score ++;
      setTimeout(function () {
        scoreCounter.innerText = score;
      }, 800);
    }

  }
  if (flippedCards === COLORS.length) alert("small win! you should probably get some sleep though");
}




// when the DOM loads
createDivsForColors(shuffledColors);



//function to reload the page / reset game applied to reset button
const resetButton = document.querySelector("#reset");
function reset() {
    reset = location.reload();
}
// Event listener for reset on click
resetButton.addEventListener("click", reset);