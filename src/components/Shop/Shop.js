import React, { useEffect } from 'react';
import fakeData from '../../fakeData';
import {useState}  from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products,setProducts]= useState(first10)
    const [cart,setCart] = useState([]);
    useEffect(() => {
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map( existingKey => {
            const product = fakeData.find(pd => pd.key ===existingKey);
            product.quantity = savedCart[existingKey];
            return product
        })
        setCart(previousCart)
    },[])
    const handleAddProduct = (product) => {
        const toBeAddedeKey = products.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedeKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd =>pd.key !== toBeAddedeKey )
            newCart = {...others,sameProduct}
        }
        else{
            product.quantity = 1;
            newCart =[...cart,product]
        }
        setCart(newCart)
        addToDatabaseCart(product.key,count)
    }
    return (
        <div className = 'ShopAndReview-container'>
         <div className="product-container">
         <ul>
              {products.map(prod => <Product 
              key = {prod.key}
              showAddToCart = {true}
              handleAddProduct = {handleAddProduct}
              product={prod}>
              </Product> )}
            </ul>  
        </div>
        <div className="cart-container">
            <Cart cart={cart}>
            <Link to = '/review'>
           <button className="main-button">Review Cart</button>
           </Link>
            </Cart>
        </div>
         </div>
    );
};

export default Shop;