document.addEventListener('DOMContentLoaded', () => {
    const cartQuantity = document.querySelector('.quantity');
    const cartItems = document.querySelector('.listCard');
    const totalPrice = document.querySelector('.total-price');

    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function addToCart(event) {
        const item = event.target.closest('.item');
        const itemName = item.querySelector('.item-name').innerText;
        const itemPrice = parseFloat(item.querySelector('.item-price').innerText.replace('$', ''));
        const itemImg = item.querySelector('.item-img').src;

        const cartItem = document.createElement('li');
        cartItem.classList.add('listItem');
        cartItem.innerHTML = `
            <div class="itemCart">
                <img src="${itemImg}" alt="" class="itemCart-img">
                <h5 class="itemCart-name">${itemName}</h5>
            </div>
            <div class="itemCart-detail">
                <div class="qty">
                    <i class='bx bx-minus'></i>
                    <input type="text" class="input-qty" min="1" value="1">
                    <i class='bx bx-plus'></i>
                </div>
                <span class="itemCart-price">${itemPrice}$</span>
            </div>
        `;

        cartItems.appendChild(cartItem);

        const minusButton = cartItem.querySelector('.bx-minus');
        const plusButton = cartItem.querySelector('.bx-plus');

        minusButton.addEventListener('click', () => {
            const qtyInput = cartItem.querySelector('.input-qty');
            qtyInput.value = Math.max(0, parseInt(qtyInput.value) - 1); 
            if (parseInt(qtyInput.value) === 0) {
                cartItem.remove();
            }
            updateCart();
        });

        plusButton.addEventListener('click', () => {
            const qtyInput = cartItem.querySelector('.input-qty');
            qtyInput.value = parseInt(qtyInput.value) + 1;
            updateCart();
        });

        updateCart();
    }

    function updateCart() {
        const items = cartItems.querySelectorAll('.listItem');
        cartQuantity.innerText = items.length;

        let total = 0;
        items.forEach(item => {
            const price = parseFloat(item.querySelector('.itemCart-price').innerText.replace('$', ''));
            const qty = parseInt(item.querySelector('.input-qty').value);
            total += price * qty;
        });

        totalPrice.innerText = total.toFixed(2) + '$';
    }
});
