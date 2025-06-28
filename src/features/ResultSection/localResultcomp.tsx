import { useEffect, useState } from "react"
import {  useNavigate } from 'react-router-dom';
import image1 from '../../assets/images/5677990.png'
import ImageComponent from "../../components/image";
import Footer from "../../components/footer";
import { Code } from "lucide-react";
import { Trophy } from "lucide-react";
import { UserRound } from "lucide-react";
import { Button } from "../../components/ui/button";
const localResultComp = () => {
const navigate=useNavigate()
const [score,setScore]=useState<number>(0)
const [category,setCategory]=useState<string>('')
const [username,setUserName]=useState<string>('')


useEffect(()=>{
    const handlepop=()=>{
      navigate('/categories',{replace:true})

    }
    window.addEventListener('popstate',handlepop)
    return()=>{
      window.removeEventListener('popstate',handlepop)
    }
  },[navigate])
useEffect(()=>{
    localStorage.removeItem('HasQuizStart')
    const languageChoosed =localStorage.getItem('languageChoosed')
    const userName=localStorage.getItem('username')
    const scoreSaved =localStorage.getItem('scoreSaved')
    if(scoreSaved!==null&&languageChoosed!==null&&userName!==null){
        setCategory(languageChoosed)
        setScore(parseInt(scoreSaved))
        setUserName(userName)
    }

},[])



useEffect(()=>{
  
    const saved=localStorage.getItem("quizState");
    const saved1=localStorage.getItem("questonsLenght");
    const saved2=localStorage.getItem('languageChoosed')
    if(saved!=null||saved2!=null||saved1!=null){
      localStorage.removeItem('quizState')
      localStorage.removeItem('questonsLenght')
      localStorage.removeItem('languageChoosed')
      return
    }


},[])



  return (
<>




<section className="h-[100vh] bg-[#0f1218]">
    <div className="absolute top-[45%] left-[50%] transform rounded-[7px] -translate-x-[50%] py-7 -translate-y-[55%] w-[300px] z-10 shadow-[0_4px_15px_rgba(0,255,128,0.2)]">

<span className=' w-[90px] h-[50px] rounded-[9px] bg-[#00ff80c4] block mx-auto p-2 self-start  transition delay-75 duration-300 ease-in-out'>
    <ImageComponent src={image1} alt='heading' width='35px' height='25px'  className='block mx-auto my-auto z-30'/>
</span>

<h1 className="text-center text-[#00ff80c4] text-[23px] py-4 font-bold">Quiz Completed  !!</h1>
<div className="w-[100%] flex flex-col justify-center items-center">


  <div className="flex justify-between items-center p-3  w-[50%]">
<UserRound  className="text-[#00ff80c4] w-9 h-9"/>
<span className="w-[65px]">
<h3 className="text-[#eaf6f1c4] font-bold">Player</h3>
<h3 className="text-[#00ff80c4] font-semibold">{username}</h3>
</span>
</div>


<div className="flex justify-between items-center p-3  w-[50%]">
<Trophy  className="text-[#00ff80c4] w-9 h-9"/>
<span className="w-[65px]">
<h3 className="text-[#eaf6f1c4] font-bold">Score</h3>
<h3 className="text-[#00ff80c4] font-semibold">{score}000</h3>
</span>
</div>


<div className="flex justify-between items-center p-3  w-[50%]">
<Code  className="text-[#00ff80c4] w-9 h-9"/>
<span className="w-[65px]">
<h3 className="text-[#eaf6f1c4] font-bold">Language</h3>
<h3 className="text-[#00ff80c4] font-semibold">{category?category:'.....'}</h3>
</span>
</div>

<Button className="mt-3 bg-[#00ff80c4] text-black font-medium hover:bg-[#00ff80c4] cursor-pointer" onClick={()=>navigate('/settings')}>Back To Settings Page</Button>
</div>

    </div>
</section>

<Footer/>
</>


  )
}

export default localResultComp