const form = document.getElementById('form');

const number_ball_div = document.createElement('div');
number_ball_div.setAttribute(
  'class',
  'bg-warning text-white rounded-circle p-3 text-center fs-3'
);

// prevent reload on click
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const total = formData.get('numbers-required');
  const min = formData.get('min-number');
  const max = formData.get('max-number');
  const allow_repeat = formData.get('repeat-numbers-allowed');

  if (
    min > max ||
    (max - min + 1 < total && !allow_repeat) ||
    min < 0 ||
    max < 0 ||
    total < 0
  ) {
    alert('ERROR: invalid input');
    return;
  }

  document.getElementById('number-container-parent').classList.remove('hidden');
  document.getElementById('number-container').innerHTML = '';

  let numbers = [];
  for (let i = 0; i < total; ++i) {
    let number = getRandomInt(min, max);

    let ok = false;
    while (!ok) {
      if (!allow_repeat && numbers.includes(number)) {
        number = getRandomInt(min, max);
      } else {
        ok = true;
      }
    }

    numbers.push(number);
  }

  for (number of numbers) {
    const ball = number_ball_div.cloneNode();
    ball.innerText = number.toString();
    document.getElementById('number-container').appendChild(ball);
  }
});

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
