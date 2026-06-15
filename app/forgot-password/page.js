"use client"
import {
    useState
} from "react"
import "./auth.css"
export default function ForgotPassword(){
    const [email,setEmail]=useState("")
    const [message,setMessage]=useState("")
    async function handleSubmit(e){
        e.preventDefault()

        const res = await fetch("http://localhost/ecommerce/forgot-password.php",{
            method:"POST",
            headers:{
                        "Content-Type":"application/json"
            },
            body:JSON.stringify({email})
        })
            const data = await res.json()
            setMessage(data.message || data.error)

            }

return(
    <div className="auth-container">
           <div className="auth-card">

        <h1 className="auth-title">Forgot Password</h1>
        <form onSubmit={handleSubmit}>
            <input  className="auth-input"
                    type="email"
                    placeholder="Email"
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                    <button className="ath-button">Invia link</button>
        </form>
        {message && <p className="auth-message">{message}</p>}
    </div>
     </div>
)
    }
