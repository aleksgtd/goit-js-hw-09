// Напиши скрипт, который после нажатия кнопки «Start»,
// раз в секунду меняет цвет фона < body > на случайное значение используя инлайн стиль.
// При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.

// ВНИМАНИЕ
// Учти, на кнопку «Start» можно нажать бесконечное количество раз.
// Сделай так, чтобы пока изменение темы запушено, кнопка «Start» была не активна(disabled).

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};

onLoading();

refs.stop.setAttribute('disabled', 'disabled');

refs.start.addEventListener('click', onStart);
refs.stop.addEventListener('click', onStop);

let intId = null;

function onStart() {
  refs.start.setAttribute('disabled', 'disabled');
  refs.stop.removeAttribute('disabled', 'disabled');
  intId = setInterval(onBodyColorChange, 1000);
}

function onStop() {
  refs.stop.setAttribute('disabled', 'disabled');
  refs.start.removeAttribute('disabled', 'disabled');
  clearInterval(intId);
}

function onBodyColorChange() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function onLoading() {
  refs.start.classList.add('btn-cls');
  refs.stop.classList.add('btn-cls');
}
