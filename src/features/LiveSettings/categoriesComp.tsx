// import React from 'react'
import Cards from '../../components/cards'
const categoriesComp = () => {
  return (
    <>
    <section className=' bg-[#0f1218] pb-6'>
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