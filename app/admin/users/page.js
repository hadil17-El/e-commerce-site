"use client"
import "./users.css"

import { useEffect,useState } from "react"
import {getUsers} from "../../api/api"

import "./users.css"

export default function UsersPage(){
    const [users,setUsers] = useState([])
    useEffect(()=>{
        async function load() {
            const data =await getUsers()
            setUsers(data)
        }
        load()
    },[])
    return(
        <div className="users-page">
            <div className="users-header">
                <h1>Users</h1>
                <p>Manage platform users</p>
            </div>

            <div className="users-grid">
                {
                    users.map((user)=>(
                        <div
                            key={user.id}
                            className="user-card"
                            >
                                <div className="user-avatar">
                                    {user.email[0].toUpperCase()}
                                </div>
                                <h3>{user.email}</h3>
                                <span className={`role-badge ${user.role}`}>
                                    {user.role}
                                </span>
                                </div>

                    ))
                }
            </div>
        </div>
    )
}