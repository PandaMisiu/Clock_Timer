'use strict';

// TODO:
// - jak sekundy przejdą na 60 to dodać do minuty jeden i tak samo dalej
// - wysuwający się przycisk przy odpaleniu slidera i vice versa
// - alarm checkbox
// - checkbox z muzyczką
// - może jakiś box-shadow kolorowy na slider?

const clock = document.querySelector('.time-container');
const hour = document.querySelector('.hour-container');
const minutes = document.querySelector('.minutes-container');
const seconds = document.querySelector('.seconds-container');
const switchBtn = document.getElementById('check');

let isSwitched = false; // bool to check if the checkbox is checked

// function that updates the clock and timer
function updateClock(){
  if(!isSwitched){
    let time = new Date(Date.now());

    let currHour = time.getHours();
    let currMinutes = time.getMinutes();
    let currSeconds = time.getSeconds();

    if(currHour<10)currHour = "0"+currHour;
    if(currMinutes<10)currMinutes = "0"+currMinutes;
    if(currSeconds<10)currSeconds = "0"+currSeconds;

    hour.textContent = currHour;
    minutes.textContent = currMinutes;
    seconds.textContent = currSeconds;
  }
  // else{
    
    
  // }
}
updateClock();
setInterval(updateClock, 1000);


// Switch slider
switchBtn.addEventListener('click', function(){
  if(switchBtn.checked) {
    isSwitched=true;
    hour.textContent = "00";
    minutes.textContent = "00";
    seconds.textContent = "00";
    updateClock();

    clock.classList.remove('time-container');
    clock.classList.add('time-container-timer');
  } 
  else {
    clock.classList.remove('time-container-timer');
    clock.classList.add('time-container');
    isSwitched=false;
    updateClock();
  }
});


// add/rem hour, minutes, seconds

// ------ hours -------
document.querySelector('.add-hour-btn').addEventListener('click', function(){
      
  let current = Number(hour.textContent);
  current = (current + 1)%24;

  if(current<10)hour.textContent = "0" + current;
  else hour.textContent = current;
})

document.querySelector('.rem-hour-btn').addEventListener('click', function(){
      
  let current = Number(hour.textContent);
  current = (current - 1)%24;

  if(current<0)return;

  if(current<10)hour.textContent = "0" + current;
  else hour.textContent = current;
})

// ------ minutes -------
document.querySelector('.add-minutes-btn').addEventListener('click', function(){
      
  let current = Number(minutes.textContent);
  current = (current + 1)%60;

  if(current<10)minutes.textContent = "0" + current;
  else minutes.textContent = current;
})

document.querySelector('.rem-minutes-btn').addEventListener('click', function(){
      
  let current = Number(minutes.textContent);
  current = (current - 1)%60;

  if(current<0)return;

  if(current<10)minutes.textContent = "0" + current;
  else minutes.textContent = current;
})

// ------ seconds -------
document.querySelector('.add-seconds-btn').addEventListener('click', function(){
      
  let current = Number(seconds.textContent);
  current = (current + 1)%60;

  if(current<10)seconds.textContent = "0" + current;
  else seconds.textContent = current;
})

document.querySelector('.rem-seconds-btn').addEventListener('click', function(){
      
  let current = Number(seconds.textContent);
  current = (current - 1)%60;

  if(current<0)return;

  if(current<10)seconds.textContent = "0" + current;
  else seconds.textContent = current;
})