
var words = ["meow", "cuddle", "whiskers", "purr", "hairball", "finicky", "mouser"]

var randomWord = "";
var lettersOfWord = []
var blanks = 0;
var blanksAndCorrect = [];
var wrongGuess = [];

//counter variables
var wins = 0;
var losses = 0;
var guessesRemaining = 7;

function Game() {
    //computer generates random word from words array
    randomWord = words[Math.floor(Math.random() * words.length)];

    //split word into separate array for letters, tore in new array 
    lettersOfWord = randomWord.split("");

    //length of the word
    blanks = lettersOfWord.length;

    //create loop to generate "_" for each letter in array stored in blanks
    for (var i = 0; i < blanks; i++) {
        blanksAndCorrect.push("_");
    }

    //display the "_"
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join("  ");

    //console log stuff
    console.log(randomWord);
    console.log(lettersOfWord)
    console.log(blanks)
    console.log(blanksAndCorrect)
}

//variables for resulting image 
// I want to figure out how to have a corresponding image pop-up if the player wins. Still haven't figured that out yet.
var meow = document.getElementById("meow");
var cuddle = document.getElementById("cuddle");
var whiskers = document.getElementById("whiskers");
var purr = document.getElementById("purr");
var hairball = document.getElementById("hairball");
var finicky = document.getElementById("finicky");
var mouser = document.getElementById("mouser");

//reset game
function reset() {
    guessesRemaining = 7;
    wrongGuess = [];
    blanksAndCorrect = [];
    Game()
}

//check letters against the word option

//If/Else, to see if letter selected matches random word
function checkLetters(letter) {
    var letterInWord = false;
    //if the generated randomword is equal to the letter entered... then variable is true
    for (var i = 0; i < blanks; i++) {
        if (randomWord[i] == letter) {
            letterInWord = true;
        }
    }
    //if letterInWord (false)
    if (letterInWord) {
        //check each letter to see if it matches word
        for (var i = 0; i < blanks; i++) {
            if (randomWord[i] == letter) {
                blanksAndCorrect[i] = letter;
            }
        }
    }
    //otherwise, incorrect goes to wrong guesses section and reduces remaining guesses
    else {
        wrongGuess.push(letter);
        guessesRemaining--;
    }

}

//did player win?
function complete() {

    //if WIN, alert and display related image
    if (lettersOfWord.toString() == blanksAndCorrect.toString()) {
        wins++;
        reset()
        //display wins on screen
        document.getElementById("winstracker").innerHTML = " " + wins;

        //if LOST, alert and start new round
    } else if (guessesRemaining === 0) {
        losses++;
        reset()
        document.getElementById("image").src = "./assets/images/try-again.png"
        document.getElementById("losstracker").innerHTML = " " + losses;
    }
    //display losses on screen and guesses remaining countdown
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join(" ");
    document.getElementById("guessesremaining").innerHTML = " " + guessesRemaining;
}

//call start game function
Game()

//check keyup, convert to lowercase, tally guess
//i need to figure out how to alert the player if a non-alpha key is selected. can i do that?
document.onkeyup = function (event) {
    var guesses = String.fromCharCode(event.keyCode).toLowerCase();

    //does keyup match letter options?

    checkLetters(guesses);

    //process wins/loss 

    complete();

    //display/store incorrect letters on screen
    document.getElementById("playerguesses").innerHTML = "  " + wrongGuess.join(" ");
}
