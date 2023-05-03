const priceInput = document.querySelector('#price-input');
const minusBtn = document.querySelector('.minus-btn');
const plusBtn = document.querySelector('.plus-btn');

minusBtn.addEventListener('click', () => {
  priceInput.value = parseInt(priceInput.value) - 50;
});

plusBtn.addEventListener('click', () => {
  priceInput.value = parseInt(priceInput.value) + 50;
});
