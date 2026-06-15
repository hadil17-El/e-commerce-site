//prodotti
/*"use client"
import ProductCard from "./ProductCard"
import Link from "next/link"
import "./trends.css"
import { useEffect, useState } from "react"
import { getLatestProducts } from "../api/api"
export default function Trends(){
const [products,setProducts] = useState([])
useEffect(()=>{
    async function load() {
        const data = await getLatestProducts()
        setProducts(data)

    }
    load()
   
},[])
/**
 * 👉 stai duplicando la lista dei prodotti

Esempio:

products = [A, B, C]

diventa:

loopProducts = [A, B, C, A, B, C]
👉 significa:

“ripeti la lista due volte per creare effetto infinito”
 */
/** cui ho fatto una protazione del codice per evitare il crash : perche lo spread operator ...  serve per aprire un array e nel mio caso [...products,...products]  signfica ripeti la lista 2 volte. il problema cui che se products non è un array e restituisce undefined  oppure error allora ...products crasha perche spread funziona solo con array/iterabili . 
 * cosa ho fatto: ho aggiunto controllo Array.isArray(products) : controlla  se produts è veramente un array? : esempio Array.isArray([1,2,3]) torna true 
  */
/* const loopProducts = Array.isArray(products) ? [...products,...products] : []
return(
        <div className="trends-section">
         <div className="trends-header">
             <h2 className="trends-title">
            New Arrivals
                </h2>   
        </div>
        <div className="trends-container">

            {loopProducts.map((product,index)=>(
                <ProductCard key={index} product={product} />
            ))}
        </div>
        <Link href="/products">
         <button className="trend-btn">Show All</button>
        </Link>
        
        </div>
    )
}*/
"use client"

import ProductCard from "./ProductCard"
import Link from "next/link"
import "./trends.css"
import {Swiper,SwiperSlide} from "swiper/react"

import {
  useEffect,
  useState,
} from "react"

import {
  getLatestProducts,
  getCart
} from "../api/api"



export default function Trends(){

    const [products,setProducts] = useState([])
const [loading,setLoading]=useState(true)
 const [cartItems,setCartItems] = useState([])
//cui con [] : signfica che esegui solo una volta quando il componente si monta
 useEffect(()=>{
    async function loadCart(){
        const data = await getCart()
        if(!data || !Array.isArray(data)) return
        setCartItems(Array.isArray(data) ? data :[])
        setLoading(false)
    }
    loadCart()
   

 },[])
    useEffect(()=>{

        async function load(){

            const data =
              await getLatestProducts()

            setProducts(data)
        }

        load()

    },[])


    return(

        <div className="trends-section">

            <div className="trends-header">

                <h2 className="trends-title">
                    New Arrivals
                </h2>

            </div>



            <Swiper
                spaceBetween={15}
                slidesPerView={2.5}
                breakpoints={{
                    768:{slidesPerView:4},
                    1024:{slidesPerView: 5}
                }}
            >

                {products.map((product)=>(
                            <SwiperSlide key={product.id}>
                                         <ProductCard product={product}  />
                            </SwiperSlide>
                   
                ))}

            </Swiper>


 <div className="tend-div">
     <Link href="/products">

                <button className="trend-btn">
                    Show All
                </button>

            </Link>

 </div>
           
        </div>
    )
}