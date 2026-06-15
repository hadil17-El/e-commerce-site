"use client"
import { useEffect, useState } from "react";
import {useRouter} from "next/navigation"
import Hero from "./components/Hero"
export default function Home() {
  const [user,setUser]=useState(null)
/**
 * localStorage:
 * il problema è che localStorage puo salvare solo stringhe di testo e non og
 * :
 * localStorage.setItem("user", JSON.stringify(data.user))
//                           ↑ converte oggetto → stringa
// salva: '{"email":"test@test.com","role":"customer"}'
Quando rileggi, ottieni una stringa — non un oggetto. Quindi:
javascriptlocalStorage.getItem("user")
// ritorna: '{"email":"test@test.com","role":"customer"}'  ← stringa

JSON.parse(localStorage.getItem("user"))
// ritorna: { email: "test@test.com", role: "customer" }  ← oggetto

Senza JSON.parse non potresti fare user.email o user.role — saresti su una stringa e otterresti undefined.
In sintesi: JSON.stringify = oggetto → stringa (per salvare), JSON.parse = stringa → oggetto (per leggere).
 */
  const router = useRouter()
  useEffect(()=>{
   const storedUser = localStorage.getItem("user")
    if(!storedUser){
      router.push("/login")
    }
  },[])
  return <Hero />
}
