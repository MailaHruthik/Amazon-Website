
 export var cart_array = JSON.parse(localStorage.getItem('cart'))

 if(!cart_array)
{  cart_array = [
    {
        productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity : 1,
       deliveryId:1
    },

    {
        productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:2,
        deliveryId:2
    }
 ]
}

export function save_products(){
    localStorage.setItem('cart', JSON.stringify(cart_array))
}




 export function Adding_Item_toCart(Productid,item_value){
    let item_found = false
    cart_array.forEach((item) =>{
        if(Productid === item.productId){
            item.quantity+=item_value
            item_found = true
        } 
       })

       if(!item_found){
        cart_array.push({
            productId: Productid,
            quantity: item_value,
            deliveryId : 2
          });
       }
       save_products()
      }


 export  function remove_item(item_toRemove){
    let newCart = []
       cart_array.forEach((element)=>{
        if(element.productId !== item_toRemove){ //push the products which are not equal to deleting products
            newCart.push(element)
        }
       }) 
       cart_array = newCart
       save_products()
      }


export function update_delivery(jsDeliveryOption, jsDeliveryId){
let matchingelement;
cart_array.forEach(element=>{
    if(element.productId == jsDeliveryOption){
        matchingelement = element
    }
})

matchingelement.deliveryId = jsDeliveryId
save_products()
}