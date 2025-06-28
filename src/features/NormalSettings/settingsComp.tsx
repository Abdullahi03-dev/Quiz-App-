// import React from 'react'
import { useState } from "react"
import RangeSlider from "../../components/rangeSlider"
import SettingsCheckboxes from "../../components/settingsCheckboxes"
import '../../assets/css/classes.css'
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
const settingsComp = () => {
  const navigate=useNavigate()
  const [selected,setSelected]=useState<string| null>(null)
  const [selectedLang,setSelectedLang]=useState<string| null>(null)
  const [selectedid,setSelectedid]=useState<string>("")
  const [selectedidLang,setSelectedidLang]=useState<string>("")
  const min=5;
  const max=20;
    const [value,setValue]=useState<number>(min)
    const handlechange=(e:any)=>{
        setValue(Number(e.target.value))
    }
     const percent=((value-min)/(max-min))*100 
  

        const handlecheck=(e:React.ChangeEvent<HTMLInputElement>)=>{
                setSelected(e.target.value);
                setSelectedid(e.target.id);
        }
        const handlecheckLang=(e:React.ChangeEvent<HTMLInputElement>)=>{
          setSelectedLang(e.target.value);
          setSelectedidLang(e.target.id);
  }
  
     const handleClick=()=>{
      if(selected&&selectedLang){
        localStorage.setItem('difficultyLevel',selectedid)
        localStorage.setItem('languageChoosed',selectedidLang)
        localStorage.setItem('questonsLenght',`${value}`)
        localStorage.setItem('HasQuizStart','true')
          navigate('/quiz')
      }
      else{
        toast.error('CHOOSE ALL SETTINGS')
      }
     }
  return (
    <>
    <section className='bg-[#0f1218] h-[100vh]'>

<div className="w-[340px] bg-gradient-to-br from-[#a1f2c] to-black/80 rounded-[6px] relative left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] h-[390px]">
<span className='flex items-center justify-center pt-3.5'>
      <h1 className='inline-block text-center font-bold text-4xl text-[#00ff7f] drop-shadow-[0_0_10px_rgba(34,197,94,0.8)] pr-5 font-dmsans'>Quiz</h1><h1 className='font-bold text-4xl text-white inline-block'>Setup</h1>
      </span>
      
<SettingsCheckboxes selected={selected} selectedLang={selectedLang} handlecheck={handlecheck} handlecheckLang={handlecheckLang} />


<RangeSlider value={value} handlechange={handlechange} percent={percent}/>

<div className="pt-5">
<button className="text-black font-bold bg-[#00ff7f] w-[300px] h-10 rounded-lg block mx-auto cursor-pointer" onClick={handleClick}>Start Quiz</button>
  
</div>
</div>

    </section>
    
    </>
  )
}

export default settingsComp