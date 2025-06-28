import { createContext,useContext,useState ,ReactNode} from "react";

interface Props{
    roomCode:number;
    setRoomCode:(roomcode:number)=>void
}


const LiveSetting=createContext<Props|undefined>(undefined)


export const LiveSettings=({children}:{children:ReactNode})=>{

    const [roomCode,setRoomCode]=useState<number>(0)

    
return(
    <LiveSetting.Provider value={{roomCode,setRoomCode}}>
    {children}
    </LiveSetting.Provider>
)
   

}

export const UseLiveSetting=()=>{
    const context=useContext(LiveSetting)
    if(!context) throw new Error("useUser must be used inside UserProvider")
    return context
}