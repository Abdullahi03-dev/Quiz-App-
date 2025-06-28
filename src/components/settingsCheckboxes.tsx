type Props={
    selected:string|null;
    selectedLang:string|null;
    handlecheck:(e:React.ChangeEvent<HTMLInputElement>)=>void
    handlecheckLang:(e:React.ChangeEvent<HTMLInputElement>)=>void

}

const settingsCheckboxes:React.FC<Props> = ({selected,selectedLang,handlecheck,handlecheckLang}) => {
  return (
    <>
    <div className="flex items-center justify-between px-4.5">
<div className="pt-8.5 pl-4">

  <h3 className="font-light text-white">Difficulty Level</h3>
  <span className="mt-3 block"><input type="radio" id="easy" className=" appearance-none  rounded-full border-3 border-green-700 w-4 h-4 checked:bg-white checked:border-5 checked:border-green-700 transition duration-200  inline-block" name='difficulty' value='1' checked={selected==='1'} onChange={handlecheck}/><h4 className="inline-block text-white ml-1.5">Easy</h4></span>
  <span className="mt-3 block"><input type="radio" id="medium" className="appearance-none  rounded-full border-3 border-green-700 w-4 h-4 checked:bg-white checked:border-5 checked:border-green-700 transition duration-200 inline-block" name='difficulty' value='2' checked={selected==='2'} onChange={handlecheck}/><h4 className="inline-block text-white ml-1.5">Medium</h4></span>
  <span className="mt-3 block"><input type="radio" id="hard" className="appearance-none  rounded-full border-3 border-green-700 w-4 h-4 checked:bg-white checked:border-5 checked:border-green-700 transition duration-200 inline-block" name='difficulty' value='3' checked={selected==='3'} onChange={handlecheck}/><h4 className="inline-block text-white ml-1.5">Hard</h4></span>
  
</div>

<div className="pt-8.5 pl-4">

  <h3 className="font-light text-white">Choose Language</h3>
  <span className="mt-3 block"><input type="radio" id="javascript" className=" appearance-none  rounded-full border-3 border-green-700 w-4 h-4 checked:bg-white checked:border-5 checked:border-green-700 transition duration-200  inline-block" name='javascript' value='javascript' checked={selectedLang==='javascript'} onChange={handlecheckLang}/><h4 className="inline-block text-white ml-1.5">Javascript</h4></span>
  <span className="mt-3 block"><input type="radio" id="golang" className="appearance-none  rounded-full border-3 border-green-700 w-4 h-4 checked:bg-white checked:border-5 checked:border-green-700 transition duration-200 inline-block" name='golang' value='golang' checked={selectedLang==='golang'} onChange={handlecheckLang}/><h4 className="inline-block text-white ml-1.5">Golang</h4></span>
  <span className="mt-3 block"><input type="radio" id="python" className="appearance-none  rounded-full border-3 border-green-700 w-4 h-4 checked:bg-white checked:border-5 checked:border-green-700 transition duration-200 inline-block" name='python' value='python' checked={selectedLang==='python'} onChange={handlecheckLang}/><h4 className="inline-block text-white ml-1.5">Python</h4></span>
  
</div>

</div>
    </>
  )
}

export default settingsCheckboxes