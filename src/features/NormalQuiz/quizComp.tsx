import { db, collection, query, where, getDocs, doc,updateDoc ,increment} from "../../firebase/firebase";
import { ArrowLeft,ArrowRight } from "lucide-react"
import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import { calculateFinalScore } from "../../utils/calculateScore";
// import NotFound from "../../components/notFound";
interface QuestionProps{
  question:string;
  options:string[];
  correctAnswer:string[];
}
const quizComp = () => {
  const [questionIndex,setQuestionIndex]=useState<number>(0)
  const [questionNumber,setQuestionNumber]=useState<number>(1)
  const [data,setData]=useState<QuestionProps[]>([])
  const [questionlenght,setQuestionLenght]=useState<number>(0)
  const [score,setScore]=useState<{[key:number]:boolean}>({})
  const [scoreToBeSave,setscoreToBeSave]=useState<number>(0)
  const [selected,setSelected]=useState<{[key:number]:string}>({})
  const [selectedId,setSelectedId]=useState<string[]>([])
  // const [username,setUserName]=useState<string>('')
  const saveData= JSON.parse(localStorage.getItem('quizSettings')||'{}')

  const navigate=useNavigate()


  ////NAVIGATE FUNION TO RESULT PAGE
  const navigateToResult=()=>{
    navigate('/result')
  }
  

  useEffect(()=>{
    const quizStatus=localStorage.getItem('quizSettings')
    if(quizStatus!=null){
      return
    }else{
      navigate('/categories')
    }
  },[])

  

  ///CHECKING IF NAME EXIST IN FIREBASE FIRST
      const checkIfNameExists = async (name: string): Promise<boolean> => {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("name", "==", name));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty; // Returns true if name exists
      };

      const updateScore=async(name:string)=> {
        if(saveData.languageChoosed!=null){
        const q=query(collection(db,'users'),where('name','==',name));
        const querySanpshot=await getDocs(q)
        if(querySanpshot.empty){
          console.log('does ot match')
        }
        querySanpshot.forEach(async(document)=>{
          const docRef=doc(db,'users',document.id);
          const finalScore=calculateFinalScore(
            scoreToBeSave,
            saveData.questonsLenghtSaved,
            saveData.difficultyLevel
          )
          await updateDoc(docRef,{
            [`scores.${saveData.languageChoosed}`]:increment((finalScore)/2),
          })

        })}
      }
      

      const updateWholeScore = async (name:string) => {
        try {
          // Check if the name already exists in Firestore
          const nameExists = await checkIfNameExists(name);
          if (!nameExists) {
            return;
          }else{
            updateScore(name)

          }
          // Store the user details in Firestore
          
        } catch (error: any) {
          console.log(error)
        }
      }



/////UI OF SELECTED OPTIONS I.E IF I SELECT AN OPTION LET IT INDICATED IT HAS BEEN SELECTED....
      useEffect(()=>{
        if(selected!=null||selected!=undefined){
          console.log(selected)
          console.log(selected)
                const array=Object.values(selected)
                console.log(array)
                if(array!==null){
                 setSelectedId(array)      
                  
              }
          }
     },[selected])




      ////USEEFFECT TO STORE SOME DEATAILS WHEN USER WANT TO REFRESH THE PAGE ..... CHEATING
  useEffect(()=>{
    const handleBeforeUnload=()=>{
      localStorage.setItem("quizState",JSON.stringify({questionIndex,
        questionNumber,data,questionlenght,scoreToBeSave,selected
      }))
    }
    window.addEventListener("beforeunload",handleBeforeUnload);
    return ()=>
    window.removeEventListener("beforeunload",handleBeforeUnload)
  },[questionIndex,questionNumber,data,questionlenght,selected,scoreToBeSave])







////USEEFFEVT
  useEffect(()=>{
    ///THOSE DATA SAVED WE ARE TRYING TO GET IT NOW
    const saved=localStorage.getItem("quizState");
    if(saved){
      const parsed=JSON.parse(saved)
      setData(parsed.data)
      setQuestionIndex(parsed.questionIndex);
      setQuestionNumber(parsed.questionNumber);
      setQuestionLenght(parsed.questionlenght);
      setScore(parsed.scoreToBeSave)
      setSelected(parsed.selected)
      return
    }


    
      let filename=''
      if(saveData.languageChoosed === null||saveData.questonsLenghtSaved===null){
        navigate(-1)
      }else{
        setQuestionLenght(parseInt(saveData.questonsLenghtSaved))
         filename=`data/${saveData.languageChoosed}.json`;
      }
      fetch(`${filename}`)
      .then((response)=>response.json() as Promise<QuestionProps[]>)
      .then((data)=>{
        // setData(data)
       const shuffled=[...data];
        for (let i = shuffled.length-1; i > 0; i--) {
          
          const j=Math.floor(Math.random()*(i+1));
          [shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]]
        }
        const selectedQues=shuffled.slice(0,saveData.questonsLenghtSaved)
        setData(selectedQues)
        setQuestionIndex(0)
      })
      .catch((err)=>{
          console.log(err)
      })
    },[])


    ///ERROR CHECKING
    if(!data.length||questionIndex===null){
      return <Loader/>
      // navigate('/404')
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
      const userNamesaved=localStorage.getItem('username')
      if(userNamesaved){
        updateWholeScore(userNamesaved)
      }
      localStorage.setItem('scoreSaved',`${scoreToBeSave}`)
      localStorage.setItem('langused',`${questionlenght}`)
      navigateToResult()
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
                if(score!==null){
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
                  console.log(selectedId)
             console.log( Object.values(selectedId).some(vals=>vals.trim()===val.trim()))    
}








  return (
    <>
    <section className="bg-slate-950 min-h-screen pb-2.5">
    {/* <div className='absolute inset-0 bg-gradient-to-br from emerald-500/5 via transparent to-purple-500/5'></div>
      <div className='absolute top-20 left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl'></div>
      <div className='absolute bottom-20 right-20  w-96 h-96 bg-purple-500/10 rounded-full blur-3xl'></div> */}
    <nav className="flex items-center justify-between pt-6 px-4 pb-25 md:pb-12">
      <span className="flex items-center">
      <h1 className="text-white font-bold text-2xl">{questionNumber}/</h1>
<h1 className="text-[#00ff7f] font-bold text-2xl">{questionlenght}</h1>
      </span>
        {/* <Clock className="text-[#00ff7f]"/> */}
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

export default quizComp