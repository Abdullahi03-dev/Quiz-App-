// import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthProvider";
import {motion} from 'framer-motion'
const animates={
    hidden:{opacity:0,y:50},
    visible:{opacity:1,y:0,transition:{
        delay:.2,
        duration:.9,ease:"easeInOut",
    }
    }
}
import '../assets/css/index.css'
const indexComp = () => {
  const {user}=useAuth()



  const navigate=useNavigate()
  useEffect(()=>{
if(!user){
  return
} else{
    navigate('/categories')
}
  },[])



  return (
    <>
    <section className="section z-10 relative">
      <div className='absolute inset-0 bg-black/60 z-0'></div>
        <div className='relative pt-40 z-10 md:w-[780px] mx-auto md:pt-55'>
            <h1 className="text-[#00ff7f] text-4xl text-center font-bold font-dmsans">Mastering Javascript:The Ultimate Coding Edition</h1>
            <p className='text-white text-center text-[17px] pt-[10px] font-semibold px-2 font-dmsans'>Unlock you full potential and discover where you rank among the best JavaScript developers-take our expert-levl quiz quiz now</p>
        </div>
        <div className='relative flex justify-center flex-col pt-7  md:flex-row w-[300px] mx-auto z-10'>
            <motion.button initial='hidden' animate='visible' variants={animates} className=' relative w-[110px] bg-[#00ff7f] py-[6px] px-[7px] text-center rounded-[20px] font-bold mx-auto md:py-auto h-[50px] cursor-pointer font-dmsans' onClick={()=>navigate('signup')}>Signup</motion.button>
            <motion.button initial='hidden' animate='visible' variants={animates} className=' relative w-[110px] border-2 border-[#00ff7f]-500 text-[#00ff7f] py-[6px] px-[7px] text-center rounded-[20px] font-bold mx-auto mt-3.5 h-[50px] md:mt-0 cursor-pointer font-dmsans' onClick={()=>navigate('signin')}>Login</motion.button>
        </div>
    </section>
    
    
    
    </>
  )
}

export default indexComp
 