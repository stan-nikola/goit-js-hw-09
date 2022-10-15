import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru.js';
import 'flatpickr/dist/themes/material_blue.css';

import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// flatpickr('#datetime-picker');
flatpickr('#datetime-picker', {
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
  console.log('YES');
  refs.startTimerBtn.removeAttribute('disabled');
}

class Timer {
  constructor({ onTic }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTic = onTic;

    this.init();
  }
  init() {
    const time = this.convertMs(0);
    this.onTic(time);
  }
  start() {
    if (this.isActive) {
      return;
    }
    const startTime = Date.now();
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const time = this.convertMs(deltaTime);
      this.onTic(time);
    }, 1000);
  }
  stop() {
    const time = this.convertMs(0);
    this.onTic(time);
    this.isActive = false;
    clearInterval(this.intervalId);
  }

  convertMs(time) {
    const days = this.pad(Math.floor((time / (1000 * 60 * 60 * 24)) % 30));
    const hours = this.pad(Math.floor((time / (1000 * 60 * 60)) % 24));
    const mins = this.pad(Math.floor((time / (1000 * 60)) % 60));
    const secs = this.pad(Math.floor((time / 1000) % 60));

    return { days, hours, mins, secs };
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
}
const timer = new Timer({ onTic: updateClockFace });
refs.startTimerBtn.addEventListener('click', timer.start.bind(timer));

function updateClockFace({ days, hours, mins, secs }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = mins;
  refs.seconds.textContent = secs;
}
