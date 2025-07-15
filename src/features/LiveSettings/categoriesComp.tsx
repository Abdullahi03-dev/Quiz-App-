// import React from 'react'
import { useEffect } from 'react';
import Cards from '../../components/cards'
const categoriesComp = () => {
       useEffect(()=>{
  
      const saved=localStorage.getItem("quizSettings");
      const saved2=localStorage.getItem("quizState");
    const scoreSaved =localStorage.getItem('scoreSaved')
      if(saved!=null||saved2!=null||scoreSaved!=null){
        localStorage.removeItem('quizSettings')
        localStorage.removeItem('scoreSaved')
        localStorage.removeItem('quizState')
        return
      }
     },[])
  return (
    <>
    <section className=' bg-slate-950 pb-6 min-h-screen'>
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-purple-500/5"></div>
      <div className="absolute md:top-20 md:left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
      {/* <div className='md:absolute md:bottom-0 md:right-5  md:w-96 md:h-96 md:bg-green-900 md:rounded-full md:blur-3xl'></div> */}

    <div className='flex flex-col items-center pt-[4rem]'>
      <span className='flex '>
      <h1 className='inline-block text-center font-bold text-4xl text-[#00ff7f] drop-shadow-[0_0_10px_rgba(34,197,94,0.8)] pr-5 font-dmsans'>Explore</h1><h1 className='font-bold text-4xl text-white inline-block'> Categories</h1>

      </span>
    <p className='mt-[13px] wrap-break-word w-[300px] md:w-[500px] md:mt-[12px] text-center text-[#f5f5f5cb] pb-9 font-dmsans'>Choose from our diverse range of quiz categories to test your knowledge an challenge your mind</p>
    </div>
    <Cards/>
    </section>
    </>
  )
}

export default categoriesComp