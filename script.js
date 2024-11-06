//const { default: events } = require("inquirer/lib/utils/events");

const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span') //selects anything within a span element, e.g. time, day, week etc. returns them as an array element

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date; //explicitly a date object
let countdownActive;

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
        console.log('distance', distance);

        const days = Math.floor(distance / day);  //math.floor returns nearest whole number (round down)
        const hours = Math.floor((distance % day) / hour); //uses a modulus, returns the remained when one is divided by the other.  
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        console.log(days, hours, minutes, seconds);

        //Populating Countdown
        countdownElTitle.textContent = `${countdownTitle}`;
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;

        //swaps the visible aspects of the DOM
        // Hide input
        inputContainer.hidden = true
        // show Countdown
        countdownEl.hidden = false
    },second);
}
 

//Takes values from form input
function updateCountdown (e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    console.log(countdownTitle, countdownDate);
    //Get number version of current Date, update DOM
    countdownValue = new Date(countdownDate).getTime(); //object = new Date (Date is a type of object)
    console.log('countdown value:', countdownValue);
    updateDOM();
}

// Event listener
countdownForm.addEventListener('submit', updateCountdown)
