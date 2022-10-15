import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru.js';
import 'flatpickr/dist/themes/material_blue.css';

import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// flatpickr('#datetime-picker');
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
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

function dateValidate(InputDate) {
  if (new Date() >= InputDate) {
    refs.startTimerBtn.disabled = 'true';
    return Notiflix.Notify.warning('Please choose a date in the future');
  }
  refs.startTimerBtn.removeAttribute('disabled');
  updateClockFace(convertMs(InputDate.getTime()));
}

refs.startTimerBtn.addEventListener('click', timer);

function timer() {
  Notiflix.Notify.success('Start counting time');
  const startTime = calendar.selectedDates[0].getTime();
  const dateNow = Date.now();
  setInterval(() => {
    const deltaTime = dateNow - Date.now();
    updateClockFace(convertMs(startTime + deltaTime));
  }, 1000);
}

function convertMs(time) {
  const days = pad(Math.floor((time / (1000 * 60 * 60 * 24)) % 30));
  const hours = pad(Math.floor((time / (1000 * 60 * 60)) % 24));
  const mins = pad(Math.floor((time / (1000 * 60)) % 60));
  const secs = pad(Math.floor((time / 1000) % 60));

  return { days, hours, mins, secs };
}
function pad(value) {
  return String(value).padStart(2, '0');
}

function updateClockFace({ days, hours, mins, secs }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = mins;
  refs.seconds.textContent = secs;
}
