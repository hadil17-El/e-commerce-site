"use client"

import {useEffect, useState} from "react"
import { getSaleProducts } from "../api/api"
import ProductCard from "../components/ProductCard"
import "./sale.css"
export default function Sale(){
    const [products,setProducts]=useState([])

    /**Perché serve lo state loading?
Serve per sapere:

👉 “i dati sono pronti o no?”

🔥 senza loading:
pagina vuota
poi dati appaiono di colpo
🟢 con loading:
{loading ? <p>Loading...</p> : <Grid />}

UX migliore perché:

✔ feedback all’utente
✔ evita “pagina vuota sospetta” */
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        /**
         * perche non puoi solo chiamare getSaleProducts() direttamente qui? Perche getSaleProducts è async e ritorna una promise e react non aspetta auto il risultato dentro useEffect :
         * Il termine "promessa" indica un impegno a compiere un'azione che potrebbe richiedere del tempo in futuro (come ad esempio recuperare dati da Internet o leggere un file).
لماذا نستخدمها؟التعامل مع طلبات الإنترنت (API)
L'idea è semplice:
Si ha un processo che non si concluderà immediatamente. Invece di interrompere il programma, si fa una "promessa" che il risultato arriverà in un secondo momento.
Quindi si usa questo pattern:👉 è solo un “wrapper” per usare async/await

React NON vuole una funzione async direttamente in useEffect.

👉 useEffect deve sempre ritornare:

undefined
oppure cleanup function

Non una Promise.
*/
        async function load(){
            const data = await getSaleProducts()
            setProducts(data)
            setLoading(false)
        }
        load()
    },[])

    return(
        <div className="sale-page">
            <div className="sale-header">
                <h1>Sale</h1>
                <p>Beat deals and discounts</p>
            </div>
            {loading ? (
                <p>Loading...</p>
            ):(
                <div className="sale-grid">
                    {products.map(p=>(
                          <ProductCard key={p.id} product={p} setProducts={setProducts}/>
                    ))}
                        </div>
            )}
        </div>
    )
}