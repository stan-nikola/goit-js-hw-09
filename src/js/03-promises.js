import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

  const startValue = Number(evt.target.delay.value);
  const stepValue = Number(evt.target.step.value);
  const amount = Number(evt.target.amount.value);

  const promiseData = {
    delay: startValue - stepValue,
    position: 0,
  };

  // new Promise(function (resolve, reject) {
  //   const intervalId = setInterval(() => {
  //     promiseData.position += 1;
  //     promiseData.delay += stepValue;

  //     if (promiseData.position >= amount) {
  //       clearInterval(intervalId);
  //     }
  //     resolve(createPromise(promiseData).then(onSuccess).catch(onError));
  //   }, stepValue);
  // });

  new Promise(function (resolve) {
    setTimeout(() => {
      for (let i = 1; i <= amount; i += 1) {
        promiseData.position = i;
        promiseData.delay += stepValue;
        resolve(createPromise(promiseData).then(onSuccess).catch(onError));
      }
    }, startValue);
  });
}

function createPromise({ position, delay }) {
  console.log({ position, delay });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
function onSuccess(result) {
  Notiflix.Notify.success(result);
  console.log(result);
}
function onError(error) {
  Notiflix.Notify.failure(error);
  console.log(error);
}
