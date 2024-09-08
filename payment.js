import { cart_array } from "./cart.js";
import { products } from "./data/products.js";
import { delivery } from "./Delivery.js";


export function payment(count){
let total_price= 0;
let shipping_price = 0;
let total_before_tax = 0;
let tax = 0;
let total_after_tax  = 0;
cart_array.forEach(cart_Item => {
    let matchingelement;
    products.forEach(products=>{
        if(cart_Item. productId == products.id){
            matchingelement = products;
            total_price += Number(matchingelement.priceCents*cart_Item.quantity)
            
        }

        
       
    })

delivery.forEach(element=>{
    if(element.id == cart_Item.deliveryId){
        shipping_price += element.price
    }
})
})
shipping_price = shipping_price*100
total_before_tax = total_price+shipping_price;
console.log(total_before_tax)
tax = total_before_tax*0.1
total_after_tax = total_before_tax + tax

const payment_summary = `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${count}):</div>
            <div class="payment-summary-money">$${((total_price)/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(shipping_price/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(total_before_tax/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(tax/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(total_after_tax/100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`

document.querySelector(".js-payment-summary").innerHTML = payment_summary
}

