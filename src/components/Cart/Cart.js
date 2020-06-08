import React from 'react';


const Cart = (props) => {
    const cart = props.cart
    // price totalize with reduce method
    // const total = cart.reduce((total,prd)=>total+prd.price,0)
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity
        debugger
    }
    
    let shipping = 0;
    if (total>35) {
        shipping = 2.99;
    }
    else if (total>15) {
        shipping = 4.99
    }
    else if (total>0){
        shipping =12.66
    }
    let tax =( total/10).toFixed(2)
    const grandTotal = (total+shipping+Number(tax)).toFixed(2)
    return (
        <div>
           <h4>Order Summary</h4>
           <p>Item Ordered :{cart.length} </p>
           <p>Product Price :{(total).toFixed(2)} </p>
           <p><small>Shipping Cost: {shipping}</small></p>
           <p><small>TAX + Vat :{tax} </small></p>
           <p> Total Price : {grandTotal} </p>
           <br/>
           {
               props.children
           }
           
        </div>
    );
};

export default Cart;