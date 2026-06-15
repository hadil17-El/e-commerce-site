"use client"
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import "./header.css"
import { FiMenu } from "react-icons/fi";
import Link from "next/link"
import { useRouter } from "next/navigation";

export default function Header(){
    const [user,setUser]=useState(null)
    const [open,setOpen] = useState(false)
    const [query,setQuery]=useState("")
    const router = useRouter()
    useEffect(()=>{
        const storedUser= localStorage.getItem("user")
    
        if(storedUser){
            try{
                     setUser(JSON.parse(storedUser))

            } catch (e){
                console.error("User JSON non valido",e)
                localStorage.removeItem("user")

            }
       
        }
    },[])
 function handleSearch(e){
    /**quando fai submit di un form html ,la pagina si ricarica ,preventDefault blocca il comportamento standard del browser */
    e.preventDefault()
    /**
     * query:quello che scrive l utente
     * .trim():rimuove spazi vuoti
     * quindi questo if significa:se è vuoto allora non fare nulla
     * se non cambia pagina senza ricaricare il sito
     * questo è un routing dinamico(nextjs app router)
     * 
     * onSubmit={handleSearch} signfica :quando premi enter o submit esegui handleSearch
     * (e)=>setQuery(e.targe.value):quando utente scrive e.targe.value=testo scritto aggiorna stato react
     * 
     * aria-label="Search products":serve per accessibilità,aiuta screen reader a capire lo scopo dell input
    value={query}
    onChange={(e)=>setQuery(e.target.value)} :cui controlle input : cosa signfica :significa che il valore dell’input non è gestito dal browser, ma da React
    senza quello :Il browser gestisce tutto:
scrivi dentro
il valore resta lì nel DOM
React NON sa cosa stai scrivendo
con onchange((e)=>setQuery(e.target.value)) :ogni volta che scrivi qualcosa aggiorna stato query con quello che hai scritto
    */
    if(!query.trim()) return

    router.push(`/shop?search=${query}`)
 }
    return(
        <>
        <div className="promo-bar">
            Free shipping onorders over $80 - Spring Collection now live
        </div>
        <header className="header">
            <div className="header-inner">
                <Link href="/"><h1 className="logo">ULTRASHOP</h1> </Link>
                
                <nav className="header-nav">
                    <ul>
                        <li><Link href="/shop?type=new">New in </Link></li>
                        <li><Link href="/shop?gender=women">Women</Link></li>
                        <li><Link href="/shop?gender=men">Men</Link></li>
                        <li><Link href="/sale">Sale</Link></li>
                        {!user ? (
                            <>
                             <li>
                            <Link href="/login">
                            Login
                            </Link>
                             </li>
                            <li>
                              <Link href="/register">
                            Register
                            </Link>
                            </li>
                          
                            </>

                        ) : (
                            <> 
                        
                        {
                            user && user.role ==="admin" && (
                                 <>
                                  <li> 
                                  <Link href="/admin">
                                  Dashboard
                                   </Link>
                               </li>
                                      
                               
                            
                                  </>
                            )
                        }
                         
                                  </>
                        )}
                       
                    </ul>
                    </nav>
                     <div className="header-actions">
                          <div className="search-bar">
                             <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35"/>
                             </svg>
                                <form onSubmit={handleSearch} className="search-bar">
                             <input type="text" placeholder="Search products..." value={query}
                                    onChange={(e)=>setQuery(e.target.value)} aria-label="Search products" />

                                </form>
                          </div>
                            <div className="divider" aria-hidden="true" />
                            <button className="icon-btn" aria-label="Account" onClick={()=>router.push("/profile")}><FaUserCircle size={20} /></button>
                             <button className="menu-btn" onClick={()=>setOpen(!open)}>
                               <FiMenu />
                             </button>


                          
                           </div>
            </div>
        </header>
                {open && (
                    <div className="mobile-menu">
                         <Link href="/shop?type=new">New In </Link>
                          <Link href="/shop?gender=women">Women </Link>
                           <Link href="/shop?gender=men">Men</Link>
                            <Link href="/sale">Sale</Link>
                              {!user ? (
                            <>
                             
                            <Link href="/login">
                            Login
                            </Link>
                             
                              <Link href="/register">
                            Register
                            </Link>
                            
                          
                            </>

                        ) : (
                            <> 
                        
                        {
                            user && user.role ==="admin" && (
                                 <>
                                  
                                  <Link href="/admin">
                                  Dashboard
                                   </Link>
                               
                                      
                               
                            
                                  </>
                            )
                        }
                         
                                  </>
                        )}
                         </div>
                )}

              
        </>
    )
}