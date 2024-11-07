//const { default: events } = require("inquirer/lib/utils/events");

const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span') //selects anything within a span element, e.g. time, day, week etc. returns them as an array element

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeElBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date; //explicitly a date object
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second*60;
const hour = minute*60;
const day = hour*24;

// Set Date Input Min with Todays date
const today = new Date().toISOString().split('T')[0]; //returns the 1st item of the split array
dateEl.setAttribute('min', today); // sets the min date attribute so you can't set a past date

//populate the countdown / UI
function updateDOM() {
    countdownActive = setInterval(() => {  //the contents of the updateDOM function is wrapped in a setInterval so it fires every second.
        const now = new Date().getTime(); // getting current date and how far is is from 1970, returns a millisecond value
        const distance = countdownValue - now; //countdown value is in the future
        const days = Math.floor(distance / day);  //math.floor returns nearest whole number (round down)
        const hours = Math.floor((distance % day) / hour); //uses a modulus, returns the remained when one is divided by the other.  
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        
        // Hide input
        inputContainer.hidden = true;
        // If the countdown has ended, show complete
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;

        } else {
            //Countdown is in progress
            //Populating Countdown
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            //swaps the visible aspects of the DOM
            completeEl.hidden = true; 
            countdownEl.hidden = false; 
        }
    },second);
}
 

//Takes values from form input
function updateCountdown (e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    console.log(countdownTitle, countdownDate);

    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,  
    };
    console.log(savedCountdown);
    //sets local storage
    localStorage.setItem('countdown', JSON.stringify(savedCountdown)); // can only save a string to local storage, objects pushed to local storage return [object, Object]
    //Get number version of current Date, update DOM

    // check for valid date
    if (countdownDate === '') {
        alert('Please enter a valid date') 
    } else {
        countdownValue = new Date(countdownDate).getTime(); //object = new Date (Date is a type of object)
        updateDOM();
    }
}

function reset() {
    //Hide Countdowns and show input
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    
    //Stop the countdown
    clearInterval(countdownActive);
    // reset values
    countdownTitle = '';
    countdownDate = '';
    
}

function restorePreviousCountdown() {
    if (localStorage.getItem('countdown')) { // countdown is the name of the local storage key.
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title; 
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime(); //object = new Date (Date is a type of object)
        updateDOM();
    }
}

// Event listener
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeElBtn.addEventListener('click', reset);

//onLoad check local storage
restorePreviousCountdown();
