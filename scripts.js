import data from './data.js'

const itemsContainer = document.querySelector('#items');
const itemList = document.getElementById('item-list');
const cartQty = document.getElementById('cart-qty');
const cartTotal = document.getElementById('cart-total');

// the length of our data determines how many times this loop goes around
data.forEach(function (gif, index) {
	// create a new div element and give it a class name
	const newDiv = document.createElement('div');
	newDiv.className = 'item'

	const img = document.createElement('img');
	img.src = gif.image
	img.width = 300
	img.height = 300
	// Add the image to the div
	newDiv.appendChild(img)
	itemsContainer.appendChild(newDiv)


    const description = document.createElement('P');
    description.className = 'description';
    description.innerText = gif.desc;

    const price = document.createElement('P');
    price.className = 'price';
    price.innerText = gif.price

    newDiv.appendChild(description)
    newDiv.appendChild(price)

    const button = document.createElement('button')
    button.id = gif.name

    button.dataset.price = gif.price
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)

});

window.addEventListener('scroll', function() {
    // Code to check if the page has scrolled past a certain point
    var navElement = document.getElementById('header');
    var scrollPosition = window.scrollY;

    // Define the scroll threshold (in pixels)
    var scrollThreshold = 50;

    if (scrollPosition >= scrollThreshold) {
      navElement.classList.add('nav_fade');
    } else {
      navElement.classList.remove('nav_fade');
    }
  });

const cart = []

// Handle Change events on update input
itemList.onchange = function(evt) {
    if (evt.target && evt.target.classList.contains('update')) {
        const name = evt.target.dataset.name
        const qty = parseInt(evt.target.value)
        updateCart(name, qty)
    }
}

// Handle clicks on list
itemList.onclick = function(evt) {
    // console.log("Click list!!")
    // console.log(evt.target)
    if(evt.target && evt.target.classList.contains('remove')) {
        const name = evt.target.dataset.name
        removeItem(name)
    } else if (evt.target && evt.target.classList.contains('add-one')) {
        const name = evt.target.dataset.name;
        const price = evt.target.dataset.price;
        addItem(name, price)
    } else if (evt.target && evt.target.classList.contains('remove-one')) {
        const name = evt.target.dataset.name
        removeItem(name, 1)
    }
}

// Add Item
const addItem = (name, price) => {
    for (let i = 0; i < cart.length; i += 1){
        if (cart[i].name === name) {
            cart[i].qty += 1
            showItems()
            return
        }
    }
    const item = {name, price, qty: 1}
    cart.push(item)
    showItems()
    
}

// Show Items
const showItems = () => {
    const qty = getQty()
    const total = getTotal()

    cartQty.innerHTML = `You have ${qty} items in your cart.`

    let itemStr = ''
    
    for (let i = 0; i < cart.length; i += 1) {
        const { name, price, qty} = cart[i]

        itemStr += `<li> 
        ${name} ${price} x ${qty} = ${qty * price} 
        <button class="remove" data-name="${name}">Remove</button>
        <button class="add-one" data-name="${name}"> + </button>
        <button class="remove-one" data-name="${name}"> - </button>
        <input class="update" type="number" data-name="${name}">
        </li>`
    }
    itemList.innerHTML = itemStr
    //console.log(`Total in cart: ${total}`)
    cartTotal.innerHTML = `Total in cart: ${total}`
}

// Get Quantity
const getQty = () => {
    let qty = 0;
    for(let i = 0; i < cart.length; i += 1) {
        qty += cart[i].qty
    }
    return qty
}

// Get total
const getTotal = () => {
    let total = 0
    for (let i = 0; i < cart.length; i += 1) {
        total += cart[i].price * cart[i].qty
    }
    return total.toFixed(2)
}

const removeItem = (name, qty = 0) => {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name) {
            if (qty > 0) {
                cart[i].qty -= qty
            }
            if(cart[i].qty < 1 || qty === 0) {
                cart.splice(i, 1)
            }
            showItems()
            return
        }
    }
}

function updateCart(name, qty) {
    for (let i = 0; i < cart.length; i++) {
        if(cart[i].name === name) {

            if (qty < 1) {
                removeItem(name)
                return
            }
            cart[i].qty = qty
            showItems()
            return
        }
    }
}

showItems(itemList.innerHTML)

const all_items_button = Array.from(document.querySelectorAll("button"))
//console.log(all_items_button)
all_items_button.forEach(elt => elt.addEventListener('click', () => {
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showItems()
  }))
