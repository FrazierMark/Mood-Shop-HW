import data from './data.js'

const itemsContainer = document.querySelector('#items');
const itemList = document.getElementById('item-list');
const cartQty = document.getElementById('cart-qty');
const cartTotal = document.getElementById('cart-total')

// the length of our data determines how many times this loop goes around
data.forEach(function (gif, index) {
	// create a new div element and give it a class name
	const newDiv = document.createElement('div');
	newDiv.className = 'item'
	// create an image element
	const img = document.createElement('img');
	// this will change each time we go through the loop. Can you explain why?
	img.src = gif.image
	img.width = 300
	img.height = 300
	// Add the image to the div
	newDiv.appendChild(img)
	//console.log(img) // Check the console!
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

// Add Item
const addItem = (name, price) => {
    
    for (let i = 0; i < cart.length; i += 1){
        if (cart[i].name === name) {
            cart[i].qty += 1
            return
        }
    }

    const item = {name, price, qty: 1}
    cart.push(item)
}

// Show Items
const showItems = () => {
    const qty = getQty()
    const total = getTotal()

    //console.log(`You have ${qty} items in your cart.`)
    cartQty.innerHTML = `You have ${qty} items in your cart.`

    let itemStr = ''
    

    for (let i = 0; i < cart.length; i += 1) {
        // console.log(`- ${cart[i].name} ${cart[i].price} x ${cart[i].qty}`)
        // const name = cart[i].name
        // const price = cart[i].price
        // const qty = cart[i].qty

        const { name, price, qty} = cart[i]

        itemStr += `<li> ${name} ${price} x ${qty} = ${qty * price} </li>`
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
            return
        }
    }
}

addItem('Apple', 0.99)
addItem('Apple', 0.99)
addItem('Orange', 4.99)
addItem('Taco', 4.99)
addItem('Orange', 4.99)
addItem('Apple', 0.99)
showItems()

removeItem('Apple', 2)


showItems(itemList.innerHTML)


