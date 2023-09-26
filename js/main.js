fetch("../js/products1.json")
          .then(response => {
                    return response.json() // get products from json file and parse to javascript
          })
          .then(data => {
                    localStorage.setItem("products", JSON.stringify(data))
                    if (!localStorage.getItem("cart")) {
                              localStorage.setItem("cart", "[]")
                    }
          })
          .catch(error => {
                    console.log(error)
          })

// Get products and cart from localStorage
const products = JSON.parse(localStorage.getItem("products"))
let cart = JSON.parse(localStorage.getItem("cart"))
const categories = [...new Set(products.map(item => item))]

// Render products 
document.getElementById('root').innerHTML = categories.map(item => {
          var { id, image, title, price } = item // destructor (ES6)
          return (
                    `<div class='box'>
                              <div class='image-box'>
                                        <img class='images' src=${image}></img>
                              </div>
                              <div class='bottom'>
                                        <p>${title}</p>
                                        <h2>${price}.00</h2>
                                        <button type='button' onclick='addToCart(${id} )'>Add to cart</button>
                              </div >
                    </div > `
          )
}).join('')

// Add the product to the cart
function addItemToCart(productId) {
          const product = products.find(product => {
                    return product.id === productId
          })

          if (!product) {
                    console.error("Product not found!")
                    return;
          }

          // If the product exists in the cart, then set quantity for the product is 1. If yes, increasing one
          const existingItem = cart.find(item => {
                    return item.id === productId
          })

          if (!existingItem) {
                    cart.push({ ...product, quantity: 1 }) // the quantity of product will be overrided
          } else {
                    existingItem.quantity++
          }

          localStorage.setItem("cart", JSON.stringify(cart))
}

// Delete a product from the cart
function deleteItemFromCart(productId) {
          // Get all products and update cart array except the product wants to delete 
          cart = cart.filter(product => {
                    return product.id !== productId
          })

          localStorage.setItem("cart", JSON.stringify(cart))
}

// add to cart
addToCart = (productId) => {
          addItemToCart(productId)
          displayCart()
}

// delete from cart
deleteItem = (index) => {
          const productId = cart[index].id
          deleteItemFromCart(productId)
          displayCart()
}

// refresh and display the updated cart
displayCart = () => {
          let totalPrice = 0
          let totalQuantity = cart.reduce((accumulate, products) => {
                    return accumulate + products.quantity
          }, 0)

          const cartContainer = document.getElementById('cart-item')

          document.getElementById('count').innerHTML = totalQuantity

          if (cart.length === 0) {
                    document.getElementById('cart-item').innerHTML = "Your cart is empty"
          } else {
                    cartContainer.innerHTML = "" // clear the previous content before updating new contents

                    cart.forEach((item, index) => {
                              const { image, title, price, quantity } = item

                              totalPrice += price * quantity
                              document.getElementById('total').innerHTML = '$ ' + totalPrice + '.00'

                              const cartDiv = document.createElement("div")
                              cartDiv.className = "cart-item-"
                              cartDiv.innerHTML = `<div class='row-img'>
                                                            <img class='rowimg' src=${image}></img>
                                                  </div>
                                                  <p style='font-size: 13px;'>${title}</p>
                                                  <h2 style='font-size: 15px;'>${price}.00</h2>
                                                  <p style='font-size: 16px; font-style: italic;'>(${quantity})</p>
                                                  <i class='fa-solid fa-trash' onclick='deleteItem(${index})'></i>
                                                  `

                              cartContainer.appendChild(cartDiv)
                    })
          }
}

// Call displayCart to initially populate the cart
displayCart()