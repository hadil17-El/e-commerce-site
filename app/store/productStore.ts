
/**questo file serve a creare uno stato globale condiviso tra componenti React
 * senza questo store:
 * home carica prootti
 * trends deve ricaricarli
 * hero deve ricaricali di nuovo
 * ogni componente fa fetch separato
 * con questo file :
 * un solo punto centrale per i dati
 * e tutti i componenti leggono gli stessi prodotti
 * e niente fetch ripetuti inutili 
 * ui sincronizzata automatico
 * 
 */
import { Product } from "../type/product"
import {create} from "zustand"

type ProductState={
    products: Product[]//è lo stato globale e che contiene la lista prodotti
    setProducts:(p:Product[])=>void//è una funzione globale e serve per aggiornare lo stato
    recommended: Product[]
    setRecommended:(p: Product[])=>void
}
//create():crea il mini database frontend
//questo è una store globale con zustand
//create<ProductState> cui dice a ts : questo store avra questa struttura
//(set)=>({..}):set è una funzione magica fornita dazustand serve per aggiornare lo stato globale
export const useProductStore = create<ProductState>((set)=>({
    products:[],//questo è lo stato iniziale 
    recommended:[],
    setProducts:(p)=>set({products: p}),//riceve p(nouovi prodotti) e aggiorna lo stato globale e sostituisce products ==== traduzione semplice : quando chiamo setProducts(data) --- aggiorno products nello store globale
    setRecommended:(p)=> set({recommended:p})
    }))