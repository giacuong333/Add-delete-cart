const products = [
          {
                    id: 0,
                    image: "../asset/image/apple-watch.png",
                    title: "Apple watch",
                    price: 120,
          },
          {
                    id: 1,
                    image: "../asset/image/ipone-11.png",
                    title: "Iphone 11",
                    price: 200,
          },
          {
                    id: 2,
                    image: "../asset/image/airpods.png",
                    title: "Airpods",
                    price: 50,
          },
          {
                    id: 3,
                    image: "../asset/image/charger.png",
                    title: "Charger",
                    price: 30,
          },
]

const categories = [...new Set(products.map(item => item))]

let i = 0
document.getElementById('root').innerHTML = categories.map(item => {
          var { image, title, price } = item
          return (
                    `<div class='box'>
                              <div class='image-box'>
                                        <img class='images' src=${image}></img>
                              </div>
                              <div class='bottom'>
                                        <p>${title}</p>
                                        <h2>${price}.00</h2>` +
                    "<button type='button' onclick='addToCart(" + (i++) + ")'>Add to cart</button>" +
                    `</div>
                    </div> `
          )
}).join('')

var cart = []

addToCart = (a) => {
          cart.push({ ...categories[a] })
          console.log(cart)
          displayCart()
}

deleteItem = (a) => {
          cart.splice(a, 1)
          displayCart()
}

// This function is used to refresh and display the updated cart
displayCart = () => {
          let j = 0
          let total = 0

          document.getElementById('count').innerHTML = cart.length

          if (cart.length === 0) {
                    document.getElementById('cart-item').innerHTML = "Your cart is empty"
                    document.getElementById('total').innerHTML = '$ ' + 0 + '.00'
          } else {
                    document.getElementById('cart-item').innerHTML = cart.map(items => {
                              var { image, title, price } = items

                              total += price
                              document.getElementById('total').innerHTML = '$ ' + total + '.00'

                              return (
                                        `<div class='cart-item-'>
                                                  <div class='row-img'>
                                                            <img class='rowimg' src=${image}></img>
                                                  </div>
                                                  <p style='font-size: 13px;'>${title}</p>
                                                  <h2 style='font-size: 15px;'>${price}.00</h2>` +
                                        "<i class='fa-solid fa-trash' onclick='deleteItem(" + (j++) + ")'></i></div>"
                              )
                    }).join('')
          }
}