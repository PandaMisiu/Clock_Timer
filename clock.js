'use strict';

const hour = document.querySelector('.hour-container');
const minutes = document.querySelector('.minutes-container');
const seconds = document.querySelector('.seconds-container');


function updateClock(){
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
updateClock();
setInterval(updateClock, 1000);