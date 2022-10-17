import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru.js';
import 'flatpickr/dist/themes/material_blue.css';

import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import FlipDown from 'flipdown-mp';
import '../css/timer.css';

const calendar = flatpickr('#datetime-picker', {
  locale: Russian,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateValidate(selectedDates[0]);
  },
});

const refs = {
  startTimerBtn: document.querySelector('[data-start]'),
  stopTimerBtn: document.querySelector('[data-stop]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

function dateValidate(inputDate) {
  if (new Date() >= inputDate) {
    refs.startTimerBtn.disabled = 'true';
    return Notiflix.Notify.warning('Please choose a date in the future');
  }
  refs.startTimerBtn.removeAttribute('disabled');
  Notiflix.Notify.success('Press start for countdown');
}

let intervalId = null;
const INTERVAL_TIME = 1000;
refs.startTimerBtn.addEventListener('click', startTimer);
refs.stopTimerBtn.addEventListener('click', stopTimer);

function startTimer() {
  refs.startTimerBtn.disabled = 'true';
  const dateNow = Date.now();
  const userTime = calendar.selectedDates[0].getTime() - Date.now();
  new FlipDown(
    Math.floor(
      new Date(calendar.selectedDates[0] - INTERVAL_TIME).getTime() / 1000
    )
  ).start();

  intervalId = setInterval(() => {
    const deltaTime = Date.now() - dateNow;
    if (userTime < deltaTime + INTERVAL_TIME) {
      clearInterval(intervalId);
      return;
    }
    updateClockFace(convertMs(userTime - deltaTime));
  }, INTERVAL_TIME);
}

function stopTimer() {
  location.reload();
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}
