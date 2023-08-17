//document load function
window.addEventListener('load', function () {
    fetch('http://localhost:3001/api/products').then(res => res.json()).then((products) => {
        loadProducts(products);
    });

    fetch('http://localhost:3001/api/cart').then(res => res.json()).then((cart) => {
        renderCart(cart);
    });

});


function renderCart(cart) {
    const cartList = document.getElementById('cart');
    cartList.innerHTML = '';
    cart.forEach((product) => {
        const cartLi = document.createElement('li');
        cartLi.innerHTML = `
        <div class="product">
            <h2>${product.name}</h1>
            <p>Amount: ${product.amount}</p>
        </div>
        `;
        cartList.appendChild(cartLi);
    });
}

function loadProducts(products) {
    const productsList = document.getElementById('products');
    products.forEach((product) => {
        const productLi = document.createElement('li');
        productLi.innerHTML = `
        <div class="product">
            <h2>${product.name}</h1>
            <p>${product.price}</p>
            <p>${product.description}</p>
            <p>${product.amount}</p>
        </div>
        `;
        const productButton = document.createElement('button');
        productButton.innerHTML = 'Add to cart';
        productButton.addEventListener('click', () => {
            addToCart(product);
        });
        productLi.appendChild(productButton);
        productsList.appendChild(productLi);
    });
}

function addToCart(product) {
    fetch('http://localhost:3001/api/cart/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: product.name,
            amount: 1,
            price: product.price
        })
    }).then(res => res.json()).then((cart) => {
        renderCart(cart);
    });
}

function login(user, password) {
    const loginObject = {
        user,
        password
    };
    fetch('http://localhost:3001/login', {
        body: JSON.stringify(loginObject),
        method: 'POST'
    }).then(res => res.json()).then(data => {
        console.log(data);
    });
}