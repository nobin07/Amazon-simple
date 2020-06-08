import React, { useState, useEffect } from 'react';
import happyImage from '../../images/giphy.gif'
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ReviewItem from '../ReviwItem/ReviewItem';
import Cart from '../Cart/Cart';


const Review = () => {
    const [cart,setCart] = useState([])
    const [orderPlaced,setOrderPlaced] = useState(false)
    const handlePlaceOrder = () => {
        setCart([])
        setOrderPlaced(true)
        processOrder()
    }
    const handleRemoveProduct = (productKey)=>{
            const newCart = cart.filter(pd => pd.key !== productKey)
            setCart(newCart);
            removeFromDatabaseCart(productKey);
    }
    useEffect(()=>{
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map(key=>{
            const products = fakeData.find(pd =>pd.key ===key)
            products.quantity = savedCart[key]
            return products
        })
        setCart(cartProducts)
    },[])
    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>

    }
    return (
        <div className='ShopAndReview-container'>
           <div className="product-container">
           {
               cart.map(pd => <ReviewItem
               handleRemoveProduct = {handleRemoveProduct}
               key = {pd.key}
                 product = {pd}></ReviewItem>)
           }
           {thankYou}
           </div>
           <div className="cart-container">
               <Cart cart = {cart}>
                   <button onClick = {handlePlaceOrder} className="main-button">Place Order</button>
               </Cart>
           </div>
          
        </div>
    );
};

export default Review;