//Grabbing HTML elements from the DOM
const textToType = document.getElementById("text-to-type");
const typingArea = document.getElementById("typing-area");
const timeDisplay = document.getElementById("time");
const speedDisplay = document.getElementById("speed");
const resetBtn = document.getElementById("reset-btn");

//Initializing variables
let startTime;
let endTime;
let timerRunning = false;

//Array of sample texts to use for the typing test
const sampleTexts = [
  "The quick brown fox jumps over the lazy dog.",
  "To be or not to be, that is the question.",
  "A journey of a thousand miles begins with a single step.",
  "I'm not a gnelf I'm not a gnoblin I'm a gnome and you've been gnomed!",
];

//Function to generate a random text from the sampleTexts array
function generateText() {
  const randomIndex = Math.floor(Math.random() * sampleTexts.length);
  return sampleTexts[randomIndex];
}

//Function to start the timer
function startTimer() {
  startTime = new Date();
  timerRunning = true;
}

//Function to stop the timer and return the time in seconds
function stopTimer() {
  endTime = new Date();
  const timeInSeconds = (endTime - startTime) / 1000;
  return timeInSeconds;
}

//Function to calculate typing speed in words per minute
function calculateSpeed(text, timeInSeconds) {
  const words = text.split(" ").length;
  const wordsPerMinute = (words / timeInSeconds) * 60;
  return Math.round(wordsPerMinute);
}

//Event listener for changes in the typing area
typingArea.addEventListener("input", () => {
  //Start the timer if it's not running
  if (!timerRunning) {
    startTimer();
  }

  //Check if the typed text matches the target text
  if (typingArea.value === textToType.innerText) {
    timerRunning = false;
    const timeInSeconds = stopTimer();

    //Calculate and display typing speed and time
    const speed = calculateSpeed(textToType.innerText, timeInSeconds);
    timeDisplay.innerText = timeInSeconds.toFixed(2);
    speedDisplay.innerText = speed;

    //disables the typing area
    typingArea.disabled = true;
  }
});

//Event listener for the reset button
resetBtn.addEventListener("click", () => {
  //Clear the typing area and enable it
  typingArea.value = "";
  typingArea.disabled = false;

  //Generate a new text to type
  textToType.innerText = generateText();

  //Reset the timer and speed display
  timeDisplay.innerText = "0";
  speedDisplay.innerText = "0";

  //Reset the timerRunning flag
  timerRunning = false;
});

// Initialize the page with a text to type
textToType.innerText = generateText();
