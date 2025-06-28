import {motion} from 'framer-motion'
import { Link } from "react-router-dom"
import useSignIn from '../../hooks/useSignIn'
import { useState } from 'react'
import toast from 'react-hot-toast'
const containerVariants={
    hidden:{opacity:0,y:50},
    visible:{opacity:1,y:0},
    transition:{
        duration:5,
        delay:40,
        ease:[0.5,0.71,1,1.5]
    }
}

const inputsVariants={
    hidden:{opacity:0,x:-90},
    visible:{opacity:1,x:0},
    transition:{duration:0.5},
}
const buttonVariants={
    hidden:{scale:1.05,transition:{
        duration:0.2
    }},
}
const signincomp = () => {
  const {handleSignIn,loading}=useSignIn()
   
    const [form,setForm]=useState({
        name:"",
        email:"",
        password:"",
        cpassword:'',
    })

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
     const submit=(e:React.FormEvent)=>{
        if(form.cpassword!==form.password){
            toast.error('Password Do Not Match')
            return
        }
        e.preventDefault()
        handleSignIn(form.email,form.name,form.password)
    }
  return (
   <>
   <section className="bg-[#0f1218] h-[100vh] flex items-center justify-center">
    <motion.div initial='hidden'animate='visible' variants={containerVariants} className="shadow-[0_4px_20px_rgba(0,255,128,0.2)] w-[320px] bg-black pb-5.5  px-14 rounded-[7px]  md:w-[365px]">
<span className="flex flex-col items-center pt-8 md:pb-2.5">
    <h1 className="text-center text-white font-semibold text-[23px] font-dmsans">Log In</h1>
    <p className="text-center text-[#f5f5f5cb] text-[14px] font-light font-dmsans">Login to your account</p>
</span>
<form onSubmit={submit}>

<div className="flex flex-col items-center">
    {/* <div className="flex flex-col items-center pt-7 mb-4 md:mb-3 md:pt-1">
        <label className="text-left text-white font-light inline-block self-start -ml-1.5">Username</label>
        <motion.input type="text" placeholder="quizmaster" name='name' value={form.name} onChange={handleChange} required  initial='hidden' animate='visible' variants={inputsVariants} className="text-[15px] font-dmsans bg-[#1e1f20] w-[245px] p-[4px] rounded-[9px] pl-[10px] py-[6px] text-[#f5f5f5cb] border-[1px] border-[#00ff7f] mt-2.5 focus:border-[#00ff7f] focus:outline-none md:w-[285px] md:py-[4.5px]"/>
    </div> */}

    <div className="flex flex-col items-center mb-4 md:mb-3">
        <label className="text-left text-white font-light inline-block self-start -ml-1.5">Email</label>
        <motion.input type="text" placeholder="yourexample@gmail.com" name='email' value={form.email} onChange={handleChange} required initial='hidden' animate='visible' variants={inputsVariants} className="text-[15px] font-dmsans bg-[#1e1f20] w-[245px] p-[4px] rounded-[9px] pl-[10px] py-[6px] text-[#f5f5f5cb] border-[1px] border-[#00ff7f] mt-2.5 focus:border-[#00ff7f] focus:outline-none md:w-[285px] md:py-[4.5px]"/>
    </div>

    <div className="flex flex-col items-center mb-4 md:mb-3">
        <label className="text-left text-white font-light inline-block self-start -ml-1.5">Password</label>
        <motion.input type="password" initial='hidden' animate='visible' name='password' value={form.password} onChange={handleChange} required variants={inputsVariants} className="text-[15px] font-dmsans bg-[#1e1f20] w-[245px] p-[4px] rounded-[9px] pl-[10px] py-[6px] text-[#f5f5f5cb] border-[1px] border-[#00ff7f] mt-2.5 focus:border-[#00ff7f] focus:outline-none md:w-[285px] md:py-[4px]"/>
    </div>

    <div className="flex flex-col items-center mb-4 md:mb-3">
        <label className="text-left text-white font-light inline-block self-start -ml-1.5">Confirm Password</label>
        <motion.input type="password" initial='hidden' animate='visible' name='cpassword' value={form.cpassword} onChange={handleChange} required variants={inputsVariants} className="text-[15px] font-dmsans bg-[#1e1f20] w-[245px] p-[4px] rounded-[9px] pl-[10px] py-[6px] text-[#f5f5f5cb] border-[1px] border-[#00ff7f] mt-2.5 focus:border-[#00ff7f] focus:outline-none md:w-[285px] md:py-[4px]"/>
    </div>

    <span>
        <motion.button whileHover='hover' variants={buttonVariants} className="bg-[#00ff7f] w-[245px] border-none py-[10px] text-center rounded-xl mt-[12px] font-semibold cursor-pointer text-[15px] md:py-[7px] md:w-[285px] md:mt-[8px]" disabled={loading}>{loading ? "Loging..." : "Login"}</motion.button>
        
        <h5 className="text-[#4a4a4c] text-center block mt-3 self-center md:text-[13px] md:self-center">Don't have an account? <Link to={'/signup'} className="inline-block text-[#00ff7f] underline font-light" >Sign up</Link></h5>
    </span>
</div>
</form>
    </motion.div>
        </section>
   </>
  )
}

export default signincomp