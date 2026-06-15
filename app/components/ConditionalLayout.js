"use client"
import { usePathname } from "next/navigation"
import Header from "./Header"
import Navbar from "./Navbar"
const AUTH_ROUTES=["/login","/register"]
export default function ConditionalLayout({ children}){
    const pathname=usePathname()
    const isAuthPage = AUTH_ROUTES.some(route=> pathname.startsWith(route))

    return(
        <>
        {!isAuthPage && <Header />}
        {children}
        {!isAuthPage && <Navbar />}
        </>
    )

}