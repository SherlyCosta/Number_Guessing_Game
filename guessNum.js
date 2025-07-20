//generate random numbers
let randomNums=parseInt(Math.random()*100+1);
// console.log(randomNums);

const userInput=document.querySelector('#guessField');
const submit= document.querySelector('#subt');
const guessSlots=document.querySelector('.guesses');
const remainingGuess=document.querySelector('.lastResult');
const range=document.querySelector('.lowOrHi');
const startOver=document.querySelector('.resultParas');

const p=document.createElement('p');

let prevGuess=[];
let numGuess=1;

let playGame=true;

//to check if you are available to play the game
if(playGame){
    submit.addEventListener('click', function(e) {          
        //once u create an event "e" now it is a form, so the value will to go the server or wherever it is called.
        
        e.preventDefault() //so you have to stop the values from going anywhere.

    const guess=parseInt(userInput.value)//take the value from the guessField
    console.log(guess);
    validateGuess(guess) //pass the number or display it.
    });
}

//function- validate Number....to check if the values are nums and not alphabest, neg nums, nums above 100.
function validateGuess(guess){
    if(isNaN(guess)) {
        alert("please enter a valid Number");
    }else if (guess < 1) {
        alert("Please enter numbers greater than or equal to 1");
    }else if (guess > 100) {
        alert("Please enter numbers less than or equal to 100")
    }else{
        prevGuess.push(guess)
        if(numGuess === 11){
            displayGuess(guess);
            displayMessage("Game Over.",`Your Last Chance for choosing Random Number was ${randomNums}`);
            endGame()
        }else{
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}


//function- to check if the numbers are correct and fall in the range of 1-100 and to check the range on the entered numbers.
function checkGuess(guess) {
    if (guess === randomNums) {
        displayMessage(`Your Number is ${guess},`,`You guessed it Right!`)
        endGame()
    }else if (guess < randomNums){
        displayMessage(`Your Number ${guess}, is too low!`,'take another guess')
    }else if (guess > randomNums){
        displayMessage(`Your Number ${guess}, is too high!`,'take another guess')
    }
}

//function- to display guess
function displayGuess(guess){
    userInput.value=''//clear the display guess and set it to empty //cleans the values
    guessSlots.innerHTML+=`${guess}, ` ///displays the values. ${guess}- doesnt update the guess but pushes the gueses in guessSlots. 
    numGuess++; //adds the values
    remainingGuess.innerHTML=`${11-numGuess}`
}


//function- to diplay message
function displayMessage(ms1,ms2){
    range.innerHTML=`<h1 id="mesh1">${ms1}</h1><h4 id="mesh4">${ms2}</h4>`;
}

//function- end game
function endGame() {
    userInput.value=''//clear the input fields
    userInput.setAttribute('disabled', '')//should not add any values to the text field
    p.classList.add('button')//create a start button, this paragraph tag will behave like a button
    p.innerHTML=`<button class="startBtn" id="newGame">Start New Game</button>`;
    startOver.appendChild(p)
    playGame= false;
    newGame();
}


//function- start new game
function newGame() {
    //get the reference of the button u created for start new game
    const newGameBtn=document.querySelector('#newGame')
    newGameBtn.addEventListener('click', function (e) {
        //reset the variables 1st and then allow the user to play the game.
        randomNums=parseInt(Math.random()*100+1);
        console.log("New Random Number:", randomNums);
        prevGuess=[]
        numGuess=1
        guessSlots.innerHTML=''
        remainingGuess.innerHTML=`${11-numGuess}`
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)

        playGame=true;
    })
}