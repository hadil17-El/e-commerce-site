"use client"
import "./orders.css"
import { useEffect,useState } from "react"
import { getOrders } from "../../api/api"
import Link from "next/link"
const fakeOrders =[
    {
        id:1,customer:"Mario Rossi",total:129.99,status:"Pending"
    },
    {
        id:2,customer:"Luca Bianchi",total:79.50,status:"Shipped"
    },
    {
            id:3,
            customer:"Anna Verdi",
            total: 210.00,
            status:"Delivered"
    }
]
export default function OrdersPage(){
    const [orders,setOrders]=useState([])

    useEffect(()=>{
        async function load(){
        const data = await getOrders()
        setOrders(Array.isArray(data) ? data:[])
    }
load()
},[])
    return(
        <div className="orders-page">
            <div className="orders-header">
            <h1>Orders</h1>
            <h1>Manage customer orders</h1>
        </div>
           <div className="orders-table">
            <div className="orders-head">
          <span>ID</span>
        <span>Customer</span>
        <span>Total</span>
          <span>Status</span>
            </div>
    {orders.map((order)=>(
        <div key={order.id}
            className="orders-row">
 <span>Order #{order.id}</span> 
 <span>{order.customer}</span>
  <span>{order.email}</span> 
  <span>Total: ${order.total}</span>
   <span className={`status ${order.status.toLowerCase()}`}>
    {order.status}
   </span>
        </div>
    ))}
          
        </div>
        </div>
    )
}