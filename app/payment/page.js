"use client"
import {useEffect} from "react"
import {useRouter} from "next/navigation"
import {checkoutOrder} from "../api/api"

export default function PaymentPage(){
    const router = useRouter()

    useEffect(()=>{
        async function porcess(){
            const data=await checkoutOrder()

            if(data.error){
                alert(data.error)
                router.push("/cart")
                return
            }
            router.push(`/orders/${data.order_id}`)
        }
    process()
},[])
return(
    <div style={{
        textAlign:"center",
        padding:"100px"
    }}>
        <h1>Processing Payment...</h1>
        <p>Please wait</p>
    </div>
)
}