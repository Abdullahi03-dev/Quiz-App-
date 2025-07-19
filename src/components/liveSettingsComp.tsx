import { useEffect } from "react";
import LiveCards from "../features/LiveSettings/liveCards"
const liveSettingsComp = () => {
     
  useEffect(()=>{
 const saved=localStorage.getItem('Roomcode');
 const saved1=localStorage.getItem('resultCode');
  if(saved!=null||saved1!==null){
      localStorage.removeItem('Roomcode')
      localStorage.removeItem('resultCode')
      return
  }
  },[])
  return (
<>
<section className=" md:h-[100vh] bg-slate-950">
<div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-purple-500/5 z-30"></div>
      <div className="absolute md:top-20 md:left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl z-30"></div>
     
    <span className='flex justify-center pt-[4rem] md:pt-[6rem]'>
          <h1 className='inline-block text-center font-bold text-4xl text-[#00ff7f] drop-shadow-[0_0_10px_rgba(34,197,94,0.8)] pr-5 font-dmsans'>Explore</h1><h1 className='font-bold text-4xl text-white inline-block'>Live Quiz</h1>
    </span>
          <LiveCards/>
</section>
</>
    )
}

export default liveSettingsComp