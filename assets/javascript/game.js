//Letter choices available-this is an array.
var computerChoices = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

//Setting all to zero when the game is started.
let wins = 0;
let losses = 0;
let guesses = 9;
let guessesLeft = 9;
let guessedLetters = [];
var letterToGuess = null;

//Lets the computer select a random letter from a-z.
var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];

//User gets 9 guesses
// guesses = guesses || 9
function updateGuessesLeft() {
    // Show the guessesLeft. (guesses left show on the screen in its own field)
    document.querySelector('#guessLeft').innerHTML = "Guesses left: " + guessesLeft;
};

function updateLetterToGuess() {
    this.letterToGuess = this.computerChoices[Math.floor(Math.random() * this.computerChoices.length)];
};

function updateGuessesSoFar() {
    // Guesses the user attempted -- letters tried show separated by commas. 
    document.querySelector('#let').innerHTML = "Your Guesses so far: " + guessedLetters.join(', ');
};
// This function will be called when replaying.
var reset = function() {
    totalGuesses = 9;
    guessesLeft = 9;
    guessedLetters = [];

    updateLetterToGuess();
    updateGuessesLeft();
    updateGuessesSoFar();
}

updateLetterToGuess();
updateGuessesLeft();

//key press becomes the user's guess- wanted to add a sound if the user hits a non-accepted character, I could not figure out how to do it.
document.onkeyup = function(event) {
    var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    var check = computerChoices.includes(userGuess);

    if (check === false) {
        alert("Must use only letters, try again?"); //display if invalid characters are pressed.
        return false;
    } else if (check === true) {
//display the amount of guessed letters.
        guessesLeft--;
        guessedLetters.push(userGuess);
        updateGuessesLeft();
        updateGuessesSoFar();

        if (guessesLeft > 0) {
            if (userGuess == letterToGuess) {
                wins++;
                document.querySelector('#wins').innerHTML = "Wins: " + wins;
                userGuess = userGuess.toUpperCase();
                alert("Wow! you are psychic! MewTwo has chosen " + userGuess); 
                reset();
            }
        } else if (guessesLeft == 0) {
// after 9 guesses display as loss 
            losses++;
            document.querySelector('#losses').innerHTML = "Losses: " + losses;
            alert("Sorry, you're not psychic, please try again?");
// clicking ok resets the game to start over. 
            reset();
        }
        return false;
    } else {
        alert("Oops, we have an error");
    }

};