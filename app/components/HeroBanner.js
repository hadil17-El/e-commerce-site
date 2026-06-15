"use client"
import { useEffect, useState } from "react"
import "./herobanner.css"
import {Swiper, SwiperSlide} from "swiper/react"
import {Autoplay,Pagination} from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"
import Image from "next/image"
const slides = [
    {
        id:1,
        text:"Winter is always with Levi's",
        image:"/image/slide1.jpg"
    },
    {
        id:2,
        text:"New Collection 2026",
        image:"/image/slide2.jpg"
    },
    {
        id:3,
        text:"Guess with you today!",
        image:"/image/slide3.jpg"
    }

]

export default function HeroBanner(){
   

    return (
        <div className="hero-slider">
            <Swiper 
                modules={[Autoplay,Pagination]}
                autoplay={{ delay: 1000}}
                pagination={{clickable: true}}
                loop={true}
                >
                    {
                        slides.map((slide)=>(
                            <SwiperSlide key={slide.id}>
                                <div className="slide">
                                     <Image
                  width={300}
                  height={300}
                    src={slide.image}
                    alt="slide"
                    className="hero-image" />
               <div className="hero-text">
                {slide.text}
                </div>   
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
                  
        </div>
    )
}