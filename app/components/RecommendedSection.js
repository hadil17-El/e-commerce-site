"use client"
import { useEffect,useState } from "react"
import { useProductStore } from "../store/productStore"
import { getRecommendedProducts ,getCart} from "../api/api"
import ProductCard from "./ProductCard"
import {Swiper,SwiperSlide} from "swiper/react"
import "swiper/css"
import "./recommended.css"
export default function RecommendedSection(){
    const recommended = useProductStore((s)=> s.recommended)
    const setRecommended = useProductStore((s)=> s.setRecommended)
   
        useEffect(()=>{
        async function load(){
            const user = JSON.parse(localStorage.getItem("user"))
            if(!user) return

            const data = await getRecommendedProducts(user.id)
            setRecommended(data)
        }
        load()
    },[])
    if(!recommended?.length){
        return null
    }

return(
    <section className="recommended-section">
        <div className="recommended-header">
        <h2 className="recommended-title">You might like</h2>
        </div>
         <Swiper    
         spaceBetween={15} slidesPerView={2} 
         breakpoints={{
          
            768:{slidesPerView:3},
            1024:{slidesPerView:5}
         }}
         >
            {recommended.map((product)=>(
               <SwiperSlide key={product.id}>
                <ProductCard product={product}  />
               </SwiperSlide>
            ))}

         </Swiper>
       
        
        </section>
       
)
}
