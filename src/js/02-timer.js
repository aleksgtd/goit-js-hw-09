import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const refs = {
  input: document.querySelector('input#datetime-picker'),
  start: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.start.setAttribute('disabled', 'disabled');

let intId = null;

// localStorage.setItem('selectedTime', null);

// const currentTime = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0].getTime());

    const currentTime = Date.now();

    if (selectedDates[0].getTime() > currentTime) {
      refs.start.removeAttribute('disabled', 'disabled');
      sessionStorage.setItem('selectedTime', selectedDates[0].getTime());
      return;
    }

    alert('Please choose a date in the future');
  },

  onOpen() {
    if (intId !== null) {
      clearInterval(intId);
      refs.days.textContent = '00';
      refs.hours.textContent = '00';
      refs.minutes.textContent = '00';
      refs.seconds.textContent = '00';
    }

    if (refs.start.hasAttribute('disabled', 'disabled')) {
      return;
    }

    refs.start.setAttribute('disabled', 'disabled');
  },
};

const flatp = flatpickr(refs.input, options);

refs.start.addEventListener('click', onStart);

function onStart() {
  refs.start.setAttribute('disabled', 'disabled');
  const endTime = Number(sessionStorage.getItem('selectedTime'));

  function onMath() {
    let result = endTime - Date.now();
    // console.log(convertMs(result));
    const x = convertMs(result);

    function addLeadingZero(value) {
      return String(value).padStart(2, 0);
    }

    function drawMarkup({ days, hours, minutes, seconds }) {
      refs.days.textContent = addLeadingZero(days);
      refs.hours.textContent = addLeadingZero(hours);
      refs.minutes.textContent = addLeadingZero(minutes);
      refs.seconds.textContent = addLeadingZero(seconds);
    }

    drawMarkup(x);
  }

  intId = setInterval(onMath, 1000);
}

// function onChangeTime() {
//   const endTime = Number(sessionStorage.getItem('selectedTime'));

//   function onMath() {
//     console.log(endTime - Date.now());
//     return endTime - Date.now();
//   }

//   const intId = setInterval(onMath, 1000);
// }
