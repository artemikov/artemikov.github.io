const addToCartButtons = document.querySelectorAll('.add-to-cart');

const cartModal = document.getElementById('modal-cart');
const cartTable = cartModal.querySelector('tbody');

const totalElement = document.querySelector('.total');

function calculateTotal() {
  let total = 0;

  const cartRows = cartTable.querySelectorAll('tr');

  cartRows.forEach(row => {
    const priceElement = row.querySelector('.product-price');
    const totalPriceElement = row.querySelector('.total-price');
    if (priceElement !== null && totalPriceElement !== null) {
      const price = parseFloat(priceElement.innerText.replace(' ₽', ''));
      const subtotal = parseFloat(totalPriceElement.innerText.replace(' ₽', ''));
      if (!isNaN(price) && !isNaN(subtotal)) {
        total += subtotal;
      }
    }
  });

  totalElement.innerText = `Общая сумма: ${total.toFixed(2)} ₽`;
}

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const title = button.closest('.product-details').querySelector('h4 a').innerText;
    const price = button.closest('.product-details').querySelector('.product-price').innerText;

    const cartRow = document.createElement('tr');
    cartRow.innerHTML = `
      <td><img src="${button.closest('.product-card').querySelector('img').src}" alt=""></td>
      <td><a href="#">${title}</a></td>
      <td class="product-price">${price}</td>
      <td><button type="button" class="btn btn-danger remove-item">Удалить товар</button></td>
      <td class="total-price">${price}</td>
    `;

    const removeButton = cartRow.querySelector('.remove-item');

    removeButton.addEventListener('click', () => {
      const cartRow = removeButton.closest('tr');
      cartRow.remove();
      calculateTotal();
    });

    cartTable.insertBefore(cartRow, cartTable.querySelector('tr:last-of-type'));
    calculateTotal();
  });
});


const btnOrder = document.querySelector('.modal-footer button.btn-primary');

const cartTotalRow = document.querySelector('.modal-body table tbody tr:last-child');

function clearCart() {
  const cartItems = document.querySelectorAll('.modal-body table tbody tr:not(:last-child)');

  cartItems.forEach((item) => {
    item.remove();
  });

  totalElement.textContent = '';

  cartTable.appendChild(cartTotalRow);
}

btnOrder.addEventListener('click', clearCart);