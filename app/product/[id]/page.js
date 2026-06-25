"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image"
import "./productPage.css"
import { addToCart,getCart, removeFromCart } from "../../api/api";
import {useApp} from "../../context/AppContext"
export default function ProductPage(){
    const {id}=useParams()
    const [product,setProduct]= useState(null)
    const {cartItems,setCartItems} = useApp()
    useEffect(()=>{
        if(!id) return
        async function load(){
            const res = await fetch(
 `https://ecommerce-backend-uwgf.onrender.com/products?id=${id}`
            )
            const data = await res.json()
            setProduct(data)
                
        }
        load()
    },[id])

    if(!product) return <p className="productP-loading">Loading...</p>
async function handleAddToCart(){
    if(isInCart){
        const cartItem = cartItems.find(
            item => Number(item.product_id) === Number(product.id)
        )
        await removeFromCart(cartItem.id)
    } else {
        await addToCart(product.id)
    }
    const updated = await getCart()
    setCartItems(Array.isArray(updated) ? updated : [])
}
const isInCart = Array.isArray(cartItems)
    ? cartItems.some(item=> Number(item.product_id) === Number(id))
    : false
    if(!product) return <p className="productP-loading">Loading...</p>
    return(
        <div className="productP-container">
                <div className="productP-card">
                    <div className="productP-imageWrapper">
 <Image fill sizes="(max-width:640px) 100vw,50vw"  src={`/image/${product.image}`} alt="image product" className="image" />
                         </div>
   <div className="productP-info">
     <span className="tag">Product</span>
  <h1 className="name">{product.name}</h1>
  <div  className="divider" />
  
  <p className="description">{product.gender}</p>
             <p className="price">${product.price} </p>
       <button className={`btn ${isInCart ? "added" : ""}`} onClick={handleAddToCart}>  {isInCart ? "Added" :"Add to cart" }</button>
   </div>
           
                </div>
           
        </div>

    )
}