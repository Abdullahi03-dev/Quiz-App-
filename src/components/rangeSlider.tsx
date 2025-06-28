// import { useState } from "react"
type Props={
    value:number;
    percent:number;
    handlechange:(e:React.ChangeEvent<HTMLInputElement>)=>void
}


const rangeSlider:React.FC<Props> = ({value,percent,handlechange}) => {

  return (
    <>
    <div className="flex flex-col items-center justify-baseline mt-8">
  <span className=" flex justify-between">
  <label htmlFor="slider" className=" text-white text-xl mx-6 pb-2 font-dmsans">Number of Questions</label>
  <label className="text-[#00ff7f] mx-4 pb-2 text-xl font-medium">{value}</label>
  </span>
<input 
id="slider"
type="range"
min="5"
max="20"
value={value}
onChange={handlechange}
style={{
  background:`linear-gradient(to right ,#00ff7f ${percent}%, transparent ${percent}% )`
}}
className=" rounded-lg "/>
</div>
    </>
  )
}

export default rangeSlider
