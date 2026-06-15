"use client"
import { useEffect,useState } from "react"
import {
    getCart,removeFromCart,updateCartQuantity
} from "../api/api"
import "./cart.css"
import { useRouter } from "next/navigation"
export default function Carrello(){
    const router = useRouter()
    const [cart,setCart]=useState([])
    async function loadCart() {
        const data = await getCart()
        console.log(data)
        if(Array.isArray(data)){
            setCart(data)
        } else {
            setCart([])
         
        }
    
    }
    useEffect(()=>{
       loadCart()
    },[])
    const total = Array.isArray(cart)
            ? cart.reduce((acc,item)=>{
        return acc + (
            Number(item.price) * Number(item.quantity)
        )
    },0)
    : 0


    return(
        <div className="cart-page">
        <h1>
           Shopping Cart
        </h1>
{cart.length === 0 && (
 <p className="cart-empty">
           Cart is empty
        </p>
)}
<div  className="cart-list">
 {cart.map(item=>(
             <div key={item.id} className="cart-item">
                <img src={`/image/${item.image}`} className="cart-image" />
                   <div  className="cart-info"> 
                     <h3>
            {item.name}
                        </h3>
                          <p>
         ${item.price}
                        </p>
                         <div className="qty-controls">
                                <button onClick={async ()=>{
                                    await updateCartQuantity(item.id,"dec")
                                   loadCart()
                                }}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={async ()=>{
                                    await updateCartQuantity(item.id,"inc")
                                   loadCart()
                                }}>+</button>
                                </div>
                         <p className="cart-item-total">Total:
         ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                
                 <button
                 className="remove-btn"
                    onClick={async()=>{
                            await removeFromCart(item.id)
                            loadCart()
                    }
                    }> 

                    Rimuovi
                 </button>
                 </div>
        ))}
</div>
       
        <div className="cart-summary">
              <h2>
                Total: ${total.toFixed(2)}
              </h2>
            <button
                className="checkout-btn"
                onClick={()=>router.push("/checkout")}
                >
                    Proceed to Checkout
                </button>
        
      </div>
        </div>
    )
}