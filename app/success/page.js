"use client"
import Link from "next/link"
import { FaCheckCircle } from "react-icons/fa"
import "./success.css"
export default function SuccessPage(){
    return(
        <div className="success-container">
             <div className="success-card">
                   <div className="success-icon">
                      <FaCheckCircle color="black" size={24} />
                       </div>
             <h1 className="success-title">Payment Successful</h1>
                   <div className="success-actions">
                      <Link href="/" className="btn-primary">
                    Continue Shopping  
                    </Link>
                    <Link href="/orders" className="btn-secondary">
                   View Orders
                    </Link>
             </div>
          
                   </div>
                 
                </div>
    )
}