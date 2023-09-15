import data from './data.js'

const itemsContainer = document.querySelector('#items')


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
	console.log(img) // Check the console!
	itemsContainer.appendChild(newDiv)

    const description = document.createElement('p');
    description.className = 'description';
    description.innerText = gif.desc;

    const price = document.createElement('p');
    price.className = 'price';
    price.innerText = gif.price

    itemsContainer.appendChild(description)
    itemsContainer.appendChild(price)

    const button = document.createElement('button')
    button.id = gif.name

    button.dataset.price = gif.price
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)

});