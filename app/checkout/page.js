"use client"
import { useEffect, useState } from "react"
import { getCart,checkoutOrder } from "../api/api"
import "./checkout.css"
import { useRouter } from "next/navigation"
export default function CheckoutPage(){
    const [cart,setCart] = useState([])
    const router = useRouter()
    const [loading,setLoading] = useState(true)


     async function load() {
            const data = await getCart()
            setCart(Array.isArray(data) ? data : [])
            setLoading(false)
        }
    useEffect(()=>{
       
        load()
    },[])
async function handleCheckout(){
    const data = await checkoutOrder()
    if(data.error){
        alert(data.error)
        return
    }
    router.push(`/orders/${data.order_id}`)
}
const total = cart.reduce((acc,item)=>{
    return acc + item.price * item.quantity
},0)

if(loading) return <p>Loading...</p>
  return (
        <div className="checkout-wrapper">

            {/* LEFT: prodotti */}
            <div className="checkout-left">
                <h2 className="checkout-title">Your Order</h2>

                {cart.map(item => (
                    <div className="checkout-item" key={item.id}>
                        <img
                            src={`/image/${item.image}`}
                            className="checkout-img"
                        />

                        <div className="checkout-info">
                            <h3>{item.name}</h3>
                            <p>Qty: {item.quantity}</p>
                           
                            <p>${item.price}</p>
                        </div>

                        <div className="checkout-subtotal">
                            ${(item.price * item.quantity).toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>

            {/* RIGHT: summary */}
            <div className="checkout-right">
                <h2>Summary</h2>

                <div className="summary-row">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                </div>

                <div className="summary-row">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>

                <div className="summary-total">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>

                <button className="pay-btn" onClick={handleCheckout}>
                    Pay Now
                </button>
            </div>

        </div>
    )
}