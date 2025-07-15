
import { db, collection, query, where, getDocs, doc,updateDoc ,increment} from "../../firebase/firebase";
import { ArrowLeft,ArrowRight,Clock } from "lucide-react"
import { useEffect,useState,useRef } from "react"
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
interface QuestionProps{
  question:string;
  options:string[];
  correctAnswer:string[];
}
const liveJoin = () => {
  const [questionIndex,setQuestionIndex]=useState<number>(0)
  const [questionNumber,setQuestionNumber]=useState<number>(1)
  const [data,setData]=useState<QuestionProps[]>([])
  const [questionlenght,setQuestionLenght]=useState<number>(0)
  const [score,setScore]=useState<{[key:number]:boolean}>({})
  const [scoreToBeSave,setscoreToBeSave]=useState<number>(0)
  const [selected,setSelected]=useState<{[key:number]:string}>({})
  const [selectedId,setSelectedId]=useState<string[]>([])
  const [time,setTime]=useState<number|null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval>|null>(null);
  const [languageChoosed,setlanguageChoosed]=useState<string>('')
  const [questonsLenghtSaved,setquestonsLenghtSaved]=useState<string>('')
  const [roomCode,setRoomCode]=useState(0)
  const navigate=useNavigate()


  ////NAVIGATE FUNION TO RESULT PAGE

  



  ////GET THE VALUES OF SETTINGS FROM FIREBASE LIKE TIME , QUESTION LENGHT , LANGUAGE CHOOSED ETC.....
  const getDocuments = async (roomCode: number): Promise<void> => {
    const usersRef = collection(db, "Rooms");
    const q = query(usersRef, where("roomCode", "==", roomCode));
    const querySnapshot = await getDocs(q);
    if(!querySnapshot.empty){
      const doc=querySnapshot.docs[0];
      const data= doc.data()
      console.log(data.languageChoosed)
      console.log(data.time)
      setlanguageChoosed(data.languageChoosed)
      setquestonsLenghtSaved(data.questtionList)
      setTime(data.time)
    }else{
      console.log('error')
    }
  };



  ///CHECKING IF ROOMCODE EXIST IN FIREBASE FIRST
      const checkIfNameExists = async (roomCode: number): Promise<boolean> => {
        const usersRef = collection(db, "Rooms");
        const q = query(usersRef, where("roomCode", "==", roomCode));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty; // Returns true if name exists
      };

      const updateScoreAndState=async(roomCode:number)=> {
        const q=query(collection(db,'Rooms'),where('roomCode','==',roomCode));

        const querySanpshot=await getDocs(q)
        if(querySanpshot.empty){
          console.log('does ot match')
        }
        querySanpshot.forEach(async(document)=>{
          const docRef=doc(db,'Rooms',document.id);
            console.log(document.id,document.data())
          await updateDoc(docRef,{
            userTwoScore:increment(scoreToBeSave),
            userTwoOnline:false
          })

        })
      }
      

      const updateWholeScore = async (roomCode:number) => {
        try {
          // Check if the name already exists in Firestore
          const nameExists = await checkIfNameExists(roomCode);
          if (!nameExists) {
            return;
          }else{
            updateScoreAndState(roomCode)
          }
          // Store the user details in Firestore
        } catch (error: any) {
          console.log(error)
        }
      }



      useEffect(()=>{
        const saved=localStorage.getItem('Roomcode')
        if(saved){
          setRoomCode(parseInt(saved))
          getDocuments(parseInt(saved))
        }
      },[languageChoosed,questonsLenghtSaved])


// Countdown timer
// Countdown timer
useEffect(() => {
  if (time === null || time <= 0) return;

  intervalRef.current = setInterval(() => {
    setTime(prev => 
      prev!==null && prev>0 ? prev - 1:0);
  }, 1000);

  return () => {
    if(intervalRef.current!==null){
      clearInterval(intervalRef.current); // cleanup

  }
  }
}, [time]);
// Stop when time hits 0
useEffect(() => {
  if ( time===0) {
    if(intervalRef.current!==null){
      updateWholeScore(roomCode)
      navigate('/liveresult')
      clearInterval(intervalRef.current); // cleanup

  }
    console.log("Time's up!");
    // Add: auto-submit quiz, disable button, show modal, etc.
  }
}, [time]);

// Format time as MM:SS
const formatTime = (secs:number) => {
  const minutes = Math.floor(secs / 60);
  const seconds = secs % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

  //USEEFFECT TO STORE SOME DEATILW WHEN USER WANT TO REFRESH THE PAGE ..... CHEATING
  useEffect(()=>{
    const handleBeforeUnload=()=>{
      localStorage.setItem("LiveQuizState",JSON.stringify({questionIndex,questionNumber,languageChoosed,data,questonsLenghtSaved,scoreToBeSave,selected,time,questionlenght,selectedId,score}))
    }
    window.addEventListener("beforeunload",handleBeforeUnload);
    return ()=>
    window.removeEventListener("beforeunload",handleBeforeUnload)
  },[questionIndex,questionNumber,languageChoosed,data,questonsLenghtSaved,scoreToBeSave,time,selected,questionlenght,selectedId,score])






////USEEFFEVT
  useEffect(()=>{
    // THOSE DATA SAVED WE ARE TRYING TO GET IT NOW
    const saved=localStorage.getItem("LiveQuizState");
    if(saved){
      const parsed=JSON.parse(saved)
      setData(parsed.data)
      setQuestionIndex(parsed.questionIndex);
      setQuestionNumber(parsed.questionNumber);
      setQuestionLenght(parsed.questionlenght);
      setlanguageChoosed(parsed.languageChoosed);
      setquestonsLenghtSaved(parsed.questonsLenghtSaved);
      setSelectedId(parsed.selectedId)
      setSelected(parsed.selected)

      setscoreToBeSave(parsed.scoreToBeSave)
      setScore(parsed.score)
      if(parsed.time!==undefined &&parsed.time>0){
        setTime(parsed.time)
      }else{
        setTime(60)
      }
      return
    }

      let filename=''
      if(languageChoosed === null||questonsLenghtSaved===null){
        alert('erro')
        navigate(-1)
      }else {
        setQuestionLenght(parseInt(questonsLenghtSaved))
         filename=`data/${languageChoosed.trim()}.json`;
      }
      fetch(`${filename}`)
      .then((response)=>response.json() as Promise<QuestionProps[]>)
      .then((data)=>{
        const shuffled=[...data];
        for (let i = shuffled.length-1; i > 0; i--) {
          
          const j=Math.floor(Math.random()*(i+1));
          [shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]]
        }
        const selectedQues=shuffled.slice(0,parseInt(questonsLenghtSaved))
        setData(selectedQues)
        setQuestionIndex(0)
      })
      .catch((err)=>{
          console.log(err)
      })
    },[languageChoosed,questonsLenghtSaved])


    ///ERROR CHECKING
    if(!data.length){
      return <Loader/>
    }
    const currentQUes=data[questionIndex]
  
  

    ////NEXT BUTTON FUNCTION
    const nextButton=()=>{
      setQuestionIndex((prev)=>{
        if(prev!==null&&prev<data.length-1){
          return prev+1
        }
      return prev
      })
      setQuestionNumber((prev)=>{
       if(questionNumber!==questionlenght){
        return prev+1
      }
        updateWholeScore(roomCode)
        navigate('/liveresult')
      return prev
  })    
  }


  ////PREVIOUS BUTTON FUNCTION
    const prevButton=()=>{
      setQuestionIndex((prev)=>{
        if(questionNumber>=2){
          return prev-1
        }
      return prev
      })
      setQuestionNumber((prev)=>{
        if(questionNumber>=2){
         return prev-1
       }
       return prev
       })
    }
  



    ///CHECKING IF THE CHOSEN OPTION IS CORRECT AND ALSO THE UI OF THE SLECTED OPTION
  const checkAnswer=(val:string,questionNumber:number)=>{
            const correct=currentQUes.correctAnswer.includes(val)
                setScore((prev:{[key:number]:boolean})=>{
                  const updated={
                    ...prev,
                    [questionNumber]:correct
                  }
                  return updated
                })
                if(score!=null){
                  const count=Object.values(score).filter(value=>value===true).length
                  setscoreToBeSave(count)
                }
            setSelected((prev:{[key:number]:string})=>{
                    const updated={
                      ...prev,
                      [questionNumber]:val
                    }
                    return updated
                  })
                  if(selected!=null){
                    const array=Object.values(selected)
                    console.log(array)
                    if(array!==null){
                    console.log(selectedId)
                    setSelectedId(array)
                        
                    }
            }
                

                
}






return (
  <>
  <section className="bg-slate-950 min-h-screen pb-2.5">
  <nav className="flex items-center justify-between pt-6 px-4 pb-25 md:pb-12">
    <span className="flex items-center">
    <h1 className="text-white font-bold text-2xl">{questionNumber}/</h1>
<h1 className="text-[#00ff7f] font-bold text-2xl">{questionlenght}</h1>
    </span>
    <span className="flex items-center justify-center">
      <Clock className="text-[#00ff7f]"/>
      
      {
      time === null ? (
        <h2 className="text-white">Loading time...</h2>
      ) : (
        <h2 className="text-white">Time Left: {time > 0 ? formatTime(time) : "Time's up!"}</h2>
      )
    }
    </span>
      
    </nav>
  <main className="w-[80%] mx-auto md:w-[40%] md:pt-9 md:mt-[4%]">
    
  <h1 className="text-center text-white pb-8 text-[24px] font-medium">{currentQUes.question}</h1>
  <div className="flex flex-col   justify-center gap-y-5 md:grid md:grid-cols-2 md:gap-x-[8rem] md:gap-y-[2rem] md:pt-6 md:place-items-center md:justify-center">
    {currentQUes.options.map((val,index)=>(

<span key={index} onClick={()=>checkAnswer(val,questionNumber)} className={`cursor-pointer border border-[#ffffff59] py-4 text-white pl-5 rounded-[13px] bg-gradient-to-br from-[#a1f2c] to-[#131720]/90 md:w-[310px] ${selected[questionNumber]===val?'shadow-[0_4px_10px_rgba(0,255,128,0.2)] border-3 border-green-700':''} `}>{val}</span>


    ))}


  </div>
  <span className="w-[100%] mx-auto flex items-center justify-between pt-10 ">
    <span className="flex items-center border border-[#ffffff3e] w-[110px] py-1.5 rounded-[8px] px-2 bg-gradient-to-br from-[#a1f2c] to-[#171b26]/80 cursor-pointer md:w-[120px] md:py-2" onClick={prevButton}>
<ArrowLeft className="text-white"/>
    <button className="text-white ml-3 font-medium cursor-pointer">Prev</button>
    </span>
    <span className="flex items-center w-[110px] justify-end py-1.5 rounded-[8px] px-2 bg-[#00ff80c4] cursor-pointer  md:w-[120px] md:py-2" onClick={nextButton}>
    <button className="text-black mr-3 font-bold text-[16px] cursor-pointer" >{questionNumber==questionlenght?'Submit':'Next'}</button>
    <ArrowRight className="text-black"/>
    </span>
  </span>
  

  </main>


  </section>
  
  </>
)
}

export default liveJoin