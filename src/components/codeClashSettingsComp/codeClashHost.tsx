import ComboBox from '../comboBox'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import { db, collection, query, where, getDocs,addDoc} from "../../firebase/firebase";
import useUsername from "../../hooks/useUsername";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../ui/dialog"
  import { Copy } from "lucide-react"
  import { Button } from "../ui/button"
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { serverTimestamp } from 'firebase/firestore';
  const languageChoosed = [
    {
      value: "javascript",
      label: "Javascript",
    }
  ]
  const Difficulty = [
    {
      value: "easy",
      label: "Easy",
    },{
      value: "medium",
      label: "Medium",
    },{
      value: "hard",
      label: "Hard",
    }
  ]
  const time = [
    {
      value: '300',
      label: "5 Min",
    },
    {
      value: '600',
      label: "10 Min",
    }
  ]
  const timeName=[
    {
    name:'Time'

    }
  ]
  const Difficultyname=[
    {
    name:'Difficulty'
    }
  ]
  const languageName=[
    {
        name:'Language'
    }
  ]
 ////FRAMER MOTION VARIANTS
 const cardVariants={
    hidden:{opacity:0,y:50},
    visible:{opacity:1,y:0,transition:{
        delay:.2,
        duration:.9,ease:"easeInOut",
    }
    }
}
const codeClashSettingsComp = () => {
  const {username}=useUsername()
  const navigate=useNavigate()
  const [generatedRoomCode,setgeneratedRoomCode]=useState(0)
  const [difficulty,setDifficulty]=useState<string>('')
  const [selectedLanguage,setselectedLanguage]=useState<string>('')
  const [selectedTime,setselectedTime]=useState<string>('');
  const [userName,setusername]=useState<string>('')

  // const [username,setusername]=useState<string>('')
  const [Loading,setloading]=useState(false)

  useEffect(()=>{
    const timecode=new Date().getTime();
    const room_code=parseInt(timecode.toString().slice(-7));
    setgeneratedRoomCode(room_code)
  },[])

  const saved=localStorage.getItem('username')
useEffect(()=>{
  if(saved){
  setusername(saved)
}
},[])




const copyToClipBoard=()=>{
  navigator.clipboard.writeText(`${generatedRoomCode}`)
    .then(() => {
      toast.success('Copied')
    })
    .catch((error) => {
      toast.error('Not Copied',error)
    });
}



 ///CHECKING IF NAME EXIST IN FIREBASE FIRST
 const checkIfNameExists = async (generatedRoomCode: number): Promise<boolean> => {
  const usersRef = collection(db, "Codeclash");
  const q = query(usersRef, where("roomCode", "==", generatedRoomCode));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty; // Returns true if name exists
};

const PushDetails=async(generatedRoomCode:number)=> {
  const roomCodeExist = await checkIfNameExists(generatedRoomCode);
   try {
    // Check if the ROOM CODE already exists in Firestore

    if (!roomCodeExist) {
       await addDoc(collection(db, "Codeclash"), {
          roomCode:generatedRoomCode,
          host:!username?userName:username,
          participants:[!username?userName:username],
          languageChoosed:selectedLanguage,
          difficulty:difficulty,
          time:selectedTime,
          currentQuestionId:'q1',
          winner:[],
          status:'waiting',
          Onliners:[!username?userName:username],
          createdAt: serverTimestamp(),
  })
      toast.success('Goodluck')
      localStorage.setItem('Codclroomcd',`${generatedRoomCode}`)
      localStorage.setItem('Codclroomcd2',`${generatedRoomCode}`)
      navigate('/waitingcodeclash')
    }else{
      toast.error('ROOM CODE ALREADY EXIST TRY REFRESHING')
      return;
    }
    // Store the user details in Firestore
  } catch (error: any) {
    console.log(error)
  }

}
const handleClick=()=>{

  if(selectedLanguage==''||selectedTime==''){
    toast.error('SELLECT ALL SETTINGS')
    return 
  }
  setloading(true)
  PushDetails(generatedRoomCode)
}
  return (
    <>
    <Dialog>
<DialogTrigger asChild>
<motion.div initial='hidden'animate='visible' variants={cardVariants}  className={`z-50 mb-6.5 py-7 w-[335px] flex flex-col items-start justify-center md:w-[450px] md:h-[240px] bg-gradient-to-br from-[#a1f2c] to-black/70 rounded-[6px] md:px-3.5 cursor-pointer `} >

<span className='px-[13px]'>
<h2 className='text-[23px] pb-1 text-white font-semibold md:text-[24px] pt-3 text-center font-dmsans'>Create A Room</h2>
<p className='text-[#f5f5f5cb] text-center text-[15px] font-medium font-dmsans'>Create a quiz room and get a unique code.Share this code with friends to join your quiz.Get ready to compete and have fun!</p>

<button className="text-black font-bold mt-4 bg-[#00ff7f] w-[300px] h-10 rounded-lg block mx-auto cursor-pointer z-50">Create Room</button>
</span>

        </motion.div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle className='text-center'>Create Room Settings</DialogTitle>
          <DialogDescription>
            <span className='flex items-center justify-between'>
            <h3 className='text-center py-6 text-[16px]  font-bold text-black'>Room Code: {generatedRoomCode}</h3>
            <Button type="submit" size="sm" className="px-3" onClick={copyToClipBoard}>
            <span className="sr-only" >Copy</span>
            <Copy className='cursor-pointer' />
          </Button>
            </span>
          <ComboBox data={languageChoosed} placeholder='Select' nameData={languageName} onValueChange={(value)=>setselectedLanguage(value)} className='mx-auto'/>
          <ComboBox data={Difficulty} placeholder='Select' nameData={Difficultyname} onValueChange={(value)=>setDifficulty(value)} className='mb-8'/>
          <ComboBox data={time} placeholder='Select' nameData={timeName} onValueChange={(value)=>setselectedTime(value)} className='mx-auto'/>




    
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter>

          <Button type="submit" className='mx-auto cursor-pointer' onClick={()=>handleClick()} disabled={Loading}>{Loading?'Creating....':'Create'}</Button>
        </DialogFooter>
      </DialogContent>
        </Dialog>
    </>
  )
}

export default codeClashSettingsComp