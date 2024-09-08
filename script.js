import { cart_array, Adding_Item_toCart } from "./cart.js";
import { products } from "./data/products.js";


var content = document.getElementById("container")
var item_count = document.querySelector('.js-cart-quantity')
var a = '';
products.forEach( (element) =>{
 a += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src=${element. image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${element.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${(element.rating.stars)*10}.png">
            <div class="product-rating-count link-primary">
              ${element.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${((element.priceCents)/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select id = "${element.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart" id="js-added-to-cart-${element.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-button" data-product-id = "${element.id}">
            Add to Cart
          </button>
        </div>`

})

content.innerHTML = a
var y = document.querySelectorAll('.js-button')

function Quantity_dispaly(){
  var total_quantity =0 
  cart_array.forEach(item =>{
  total_quantity += item.quantity
  item_count.innerHTML = total_quantity
  
  })
  }
Quantity_dispaly()

y.forEach((Elementbutton)=>{

    Elementbutton.addEventListener('click',function(){
        const Productid = Elementbutton.dataset.productId
        let selectElement = document.getElementById(`${Productid}`);
        let item_value = Number(selectElement.value)
        let added = document.getElementById(`js-added-to-cart-${Productid}`);
        function style(){
            added.style.opacity = '1'
       }
       setTimeout(style,100)

       setTimeout(function(){
         added.style.opacity = '0'
       },1000)

       Adding_Item_toCart(Productid, item_value)
       Quantity_dispaly()


        
    })
   
})


