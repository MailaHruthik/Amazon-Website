import { cart_array,remove_item, save_products , update_delivery} from "./cart.js";
import { products } from "./data/products.js";
import { delivery } from "./Delivery.js";
import dayjs from " https://unpkg.com/dayjs@1.11.10/esm/index.js"
import { payment } from "./payment.js";

function render(){
let a = ''
cart_array.forEach((element)=>{
let matchingelement;

products.forEach((products_element)=>{
    if(element.productId == products_element.id){
       matchingelement = products_element
       
    }
})

const delivery_date = element.deliveryId
let delivery_display;
delivery.forEach(delivery_option =>{
  if(delivery_option.id == delivery_date){
    delivery_display = delivery_option
  }
})

let day = dayjs();
let today = day.add(delivery_display.delivery_days, 'days')
let delivery_date_display = today.format('dddd, MMMM D')


a += `<div class="cart-item-container js-cart-item-container-${matchingelement.id}">
<div class="delivery-date js-delivery-date">
  Delivery date: ${delivery_date_display}
</div>

<div class="cart-item-details-grid">
  <img class="product-image"
    src="${matchingelement.image}">

  <div class="cart-item-details">
    <div class="product-name">
      ${matchingelement.name}
    </div>
    <div class="product-price">
   $${((matchingelement.priceCents)/100).toFixed(2)}
    </div>
    <div class="product-quantity">
      <span>
        Quantity: <span class="quantity-label js-quntity-label js-quntity-label-${matchingelement.id}" data-quantity-id = "${matchingelement.id}"></span>
      </span>
      <span class="update-quantity-link link-primary js-update" data-update-id = '${matchingelement.id}'>
        Update
      </span>
      <span class="delete-quantity-link link-primary js-delete" data-delete-id = "${matchingelement.id}">
        Delete
      </span>
    </div>
  </div>

  <div class="delivery-options">
  <div class="delivery-options-title">
      Choose a delivery option:
    </div>
    ${delivery_process(matchingelement,element)}
    
  </div>
</div>
</div>  `

})
function delivery_process(matchingelement,element){
let HTML = ''
delivery.forEach(element_1=>{

let day = dayjs();
let today = day.add(element_1.delivery_days, 'days')
let delivery_date = today.format('dddd, MMMM D')

let price = 0
if(element_1.price ===0){
  price = 'Free'
}
else{
  price = element_1.price
}

const isChecked =element.deliveryId == element_1.id
 HTML += `
    <div class="delivery-option js-delivery-option" data-js-delivery-option = "${matchingelement.id}" 
    data-js-delivery-id = "${element_1.id}">
      <input type="radio"
       ${isChecked ? 'checked': ""}
        class="delivery-option-input"
        name="${matchingelement.id}">
      <div>
        <div class="delivery-option-date js-delivery-option-date-${element_1.delivery_days}" data-delivery-date = ${delivery_date}>
          ${delivery_date}
        </div>
        <div class="delivery-option-price">
          $${price}- Shipping
        </div>
      </div>
    </div>
 
`
})
return HTML
}
const y = document.querySelector(".content")
y.innerHTML = a



 document.querySelectorAll('.js-quntity-label').forEach(element=>{
  const quantity_toupdate = element.dataset.quantityId
  cart_array.forEach(element=>{
    if(element.productId == quantity_toupdate){
      document.querySelector(`.js-quntity-label-${quantity_toupdate}`).innerHTML = element.quantity
    }
      
 })

 })



let count = 0
cart_array.forEach(element=>{
if(element)
count++;

})
let z = document.querySelector('.js-items-num')
z.innerHTML = count



let delete_button = document.querySelectorAll(".js-delete")
delete_button.forEach((element_delete)=>{
    element_delete.addEventListener('click',function(){
        let item_toRemove = element_delete.dataset.deleteId
        remove_item(item_toRemove)
        const x = document.querySelector(`.js-cart-item-container-${item_toRemove}`)
        x.remove()
        count--;
        z.innerHTML = count
        payment()
       
    })
    
})

let update = document.querySelectorAll(`.js-update`)
update.forEach(element=>{
  element.addEventListener('click', function handleClick(){
  const ele_toupdate = element.dataset.updateId
  element.innerHTML = `<select id ="slect-${ele_toupdate}">
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
            <button class="save-button-${ele_toupdate}">save</button>`
            element.removeEventListener('click', handleClick);

    const saveButton = document.querySelector(`.save-button-${ele_toupdate}`)
    saveButton.addEventListener('click', function() {
    let selected_value = document.getElementById(`slect-${ele_toupdate}`).value
    cart_array.forEach(element=>{
      if(element.productId == ele_toupdate){
        element.quantity += Number(selected_value)
        console.log(document.querySelector(`.js-quntity-label-${ele_toupdate}`).innerHTML = element.quantity)
        save_products()
      }
    })
      element.innerHTML = `Update`;
    
  })
})
})


document.querySelectorAll('.js-delivery-option').forEach(element => {
 element.addEventListener('click',()=>{
 const{jsDeliveryId,jsDeliveryOption } = element.dataset
update_delivery(jsDeliveryOption, jsDeliveryId)
render()
  })
})
payment(count)
}
render()







