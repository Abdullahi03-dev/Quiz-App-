import { createContext, useContext, useState, ReactNode } from "react";


interface UsernameProps{

    username:string;
    setUsername:(name:string)=>void;

}
const UsernameContexts=createContext<UsernameProps|undefined>(undefined)


export const UsernameContext=({children}:{children:ReactNode})=>{

const [username,setUsername]=useState('')

return(
    <UsernameContexts.Provider value={{username,setUsername}}>
{children}

    </UsernameContexts.Provider>
)



}

export const useUser=()=>{
    const context=useContext(UsernameContexts)
    if(!context) throw new Error("useUser must be used inside UserProvider")
    return context
}