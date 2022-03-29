import Notiflix from 'notiflix';
const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const data = {
    delay: Number(form.elements.delay.value),
    step: Number(form.elements.step.value),
    amount: Number(form.elements.amount.value),
  };

  onMultipleFnCalls(data);
}

function onMultipleFnCalls({ delay, step, amount }) {
  let positionArg;
  let delayArg;

  for (let i = 1; i <= amount; i += 1) {
    positionArg = i;
    delayArg = delay + step * (i - 1);

    // console.log(positionArg, delayArg);

    onCall(positionArg, delayArg);
  }
}

function onCall(positionArg, delayArg) {
  setTimeout(() => {
    // console.log(positionArg, delayArg);
    createPromise(positionArg, delayArg)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`This is a FULFILL of promise #${position} with ${delay}ms delay`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`This is a REJECT of promise #${position} with ${delay}ms delay`);
      });
  }, delayArg);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      // Fulfill
      resolve({ position, delay });
    }
    // Reject
    reject({ position, delay });
  });
}
