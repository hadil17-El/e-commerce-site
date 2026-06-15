"use client"
import { useRouter } from "next/navigation"
import "./profile.css"
import { useEffect,useState } from "react"
export default function Profile(){
const [user,setUser]=useState(null)
const router = useRouter()
useEffect(()=>{
    const storedUser=localStorage.getItem("user")
    if(!storedUser){
        router.push("/login")
        return
    }
    setUser(JSON.parse(storedUser))
},[])
function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/login")
}
if(!user) return null
    return(
        <div className="profile-page">
        <div className="profile-card">
       <div className="profile-top">
       <div className="profile-avatar">
        {user.email.charAt(0).toUpperCase()}
        </div>
        <div>
        <h1>
       {user.email}
        </h1>
        <p className="role">
       {user.role}
        </p>

        </div>
        </div>
        <div className="profile-section">
        <h2>
       Account information
        </h2>
        <div className="info-row">
       <span>
       {user.email}
        </span>
        <strong>
       {user.role}
        </strong>
        </div>
         <button className="profile-btn primary" onClick={()=>router.push("/orders")}>
       My Orders
        </button>
            </div>
        <div className="profile-actions">
         <button className="profile-logout-btn" onClick={logout}>
       Logout
        </button>
        </div>
        </div>
        </div>
    )
}