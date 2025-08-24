import { db, collection, query, where, getDocs, doc,updateDoc ,increment, auth} from "../../firebase/firebase";
import { ArrowLeft,ArrowRight,Clock } from "lucide-react"
import { useEffect,useState ,useRef} from "react"
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader";
import toast from "react-hot-toast";
import { calculateFinalScore } from "../../utils/calculateScore";
// import useRoomMessages from "../../hooks/useMessages";
// import useCheckRoomStatus from "../../hooks/useCheckRoomStatus";
// import { arrayUnion, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import useUsername from "../../hooks/useUsername";
import { arrayRemove, arrayUnion } from "firebase/firestore";
interface QuestionProps{
  question:string;
  options:string[];
  correctAnswer:string[];
}
const livequiz = () => {
  const { roomId } = useParams()
  const {username}=useUsername()
  const [questionIndex,setQuestionIndex]=useState<number>(0)
  const [questionNumber,setQuestionNumber]=useState<number>(1)
  const [data,setData]=useState<QuestionProps[]>([])
  const [questionlenght,setQuestionLenght]=useState<number>(0)
  const [score,setScore]=useState<{[key:number]:boolean}>({})
  const [scoreToBeSave,setscoreToBeSave]=useState<number>(0)
  const [selected,setSelected]=useState<{[key:number]:string}>({})
  const [selectedId,setSelectedId]=useState<string[]>([])
  const [time,setTime]=useState<number|null>(null)
  const [selectedIndex,setSelectedIndex]=useState<number[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval>|null>(null);
  const [languageChoosed,setlanguageChoosed]=useState<string>('')
  const [questonsLenghtSaved,setquestonsLenghtSaved]=useState<string>('')
  // const [roomCode,setRoomCode]=useState(0)
  const navigate=useNavigate()
  // const saved=localStorage.getItem('Roomcode');
  // const userKey='user1Messages'
  // const allowed=useCheckRoomStatus('userOneOnline')
  const [questionId,setQuestionId]=useState<number[]>([])
  // useRoomMessages(Roomcode, userKey);

  useEffect(() => { 
    const checkRoom = async () => { 
    if (!roomId) 
    return navigate('/livesettings')
    
    // Query the room by room code
      const usersRef = collection(db, "Rooms");
      const roomQuery = query(usersRef, where("roomCode", "==",parseInt(roomId)))
      const snapshot = await getDocs(roomQuery)
    
      if (snapshot.empty){
        toast.error('Not Found')
       navigate('/categories')
      }
      const roomDoc = snapshot.docs[0]
      const roomData = roomDoc.data()
    
      // // Check participant count+/
      if (!username) return;
      if (!roomData.finished.includes(username)) {
      setTime(roomData.time)
      setlanguageChoosed(roomData.languageChoosed)
      setquestonsLenghtSaved(roomData.questtionList)
        const lang = roomData.languageChoosed; // get level here
    // Get current logged-in user
    const authUnsub = onAuthStateChanged(auth, async () => {
      if (!username) return;

      // Fetch this user’s completed challenges for this lang
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("name", "==", username));
      const userSnap = await getDocs(q);
      if(userSnap.empty){
        return
      }
      const roomDoc = userSnap.docs[0]
      const roomData = roomDoc.data()
        const completedIds = roomData.completedLiveChallenges?.[lang] || [];
        setQuestionId(completedIds);
    });
    return () => authUnsub();
        // alert('Waiting for opponent to join...')
      }
      toast.error('ROOM ALREADY CLOSED')
    return navigate('/categories')
     
      
    }
    
    checkRoom()
    
    }, [roomId, navigate])

  
  // const sendMessage = async (roomCode:number) => {
  //   try {
  //     const q=query(collection(db,'Rooms'),where('roomCode','==',roomCode));

  //       const querySanpshot=await getDocs(q)
  //       if(querySanpshot.empty){
  //         console.log('does ot match')
  //       }
  //       querySanpshot.forEach(async(document)=>{
  //         const docRef=doc(db,'Rooms',document.id);
  //           console.log(document.id,document.data())
  //         await updateDoc(docRef,{
  //           user2Messages:'User 1 was disqualified for leaving the page'
  //         })

  //       })
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        toast.error('Disqualified');
          if(!roomId) return
          updateWholeScore(parseInt(roomId),0);
          // sendMessage(parseInt(saved));
        
      } else {
        navigate(`/liveresult/${roomId}`)
      }
    };
  
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);




  ////GET THE VALUES OF SETTINGS FROM FIREBASE LIKE TIME , QUESTION LENGHT , LANGUAGE CHOOSED ETC.....
  // const getDocuments = async (roomCode: number): Promise<void> => {
  //   const usersRef = collection(db, "Rooms");
  //   const q = query(usersRef, where("roomCode", "==", roomCode));
  //   const querySnapshot = await getDocs(q);
  //   if(!querySnapshot.empty){
  //     const doc=querySnapshot.docs[0];
  //     const data= doc.data()
  //     console.log(data.languageChoosed)
  //     console.log(data.time)
  //     setlanguageChoosed(data.languageChoosed)
  //     setquestonsLenghtSaved(data.questtionList)
  //     setTime(data.time)
  //   }else{
  //     console.log('error')
  //   }
  // };


  const updateScore=async(selectedIndex:number[])=> {
    if (!username)return
    const finalScore=calculateFinalScore(
        scoreToBeSave,Number(questonsLenghtSaved),'easy')
    if(languageChoosed!=null){
    const q=query(collection(db,'users'),where('name','==',username));
    const querySanpshot=await getDocs(q)
    if(querySanpshot.empty){
      console.log('does not match')
    }
    // alert(languageChoosed)
    querySanpshot.forEach(async(document)=>{
      const docRef=doc(db,'users',document.id);
      await updateDoc(docRef,{
        [`scores.${languageChoosed}`]:increment((finalScore)),
        [`completedLiveChallenges.${languageChoosed}`]:selectedIndex
      })
    })
  }else{
    alert('lang prob')
  }
  }


  ///CHECKING IF ROOMCODE EXIST IN FIREBASE FIRST
      const checkIfNameExists = async (roomCode: number): Promise<boolean> => {
        const usersRef = collection(db, "Rooms");
        const q = query(usersRef, where("roomCode", "==", roomCode));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty; // Returns true if name exists
      };

      const updateScoreAndState=async(roomCode:number,scoreToBeSave:number)=> {
        const q=query(collection(db,'Rooms'),where('roomCode','==',roomCode));

        const querySanpshot=await getDocs(q)
        if(querySanpshot.empty){
          console.log('does ot match')
        }
        querySanpshot.forEach(async(document)=>{
          const docRef=doc(db,'Rooms',document.id);
            console.log(document.id,document.data())
          await updateDoc(docRef,{
            // userOneScore:increment(scoreToBeSave/2),
            Onliners: arrayRemove(username),
            winners:arrayUnion({name:username,score:(scoreToBeSave)}),
            finished:arrayUnion(username)
            // AnswersChosed:AnswersChosed,
            // QuestionsChosed:arrayUnion(...QuestionsChosed),
          })

        })
      }
      const updateWholeScore = async (roomCode:number,scoreToBeSave:number) => {
        try {
          // Check if the name already exists in Firestore
          const nameExists = await checkIfNameExists(roomCode);
          if (!nameExists&&username!==null) return;
            updateScoreAndState(roomCode,scoreToBeSave)
            // updateScore()
          
          // Store the user details in Firestore
        } catch (error: any) {
          console.log(error)
        }
      }



      useEffect(()=>{
        if(selected!=null||selected!=undefined){
          console.log(selected)
          console.log(selected)
                const array=Object.values(selected)
                console.log(array)
                if(array!==null){
                //  setSelectedId(array)        
              }
          }
     },[selected])


      // useEffect(()=>{
      //   const saved=localStorage.getItem('Roomcode')
      //   if(saved){
      //     setRoomCode(parseInt(saved))
      //     getDocuments(parseInt(saved))
      //   }
      // },[languageChoosed,questonsLenghtSaved])


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
  if (time===0) {
    if(intervalRef.current!==null&&roomId!==null){
      updateWholeScore(Number(roomId),scoreToBeSave)
      localStorage.setItem('AnswersChosedLive',JSON.stringify(selected))
      localStorage.setItem('QuestionsChosedLive',JSON.stringify(selectedIndex))
      localStorage.setItem('langused',`${questionlenght}`)
      updateScore(selectedIndex)
      navigate(`/liveresult/${roomId}`)
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
    if(languageChoosed === null||questonsLenghtSaved===null){
      return
    }
    setQuestionLenght(parseInt(questonsLenghtSaved))
      let filename=`/data/liveQuiz/${languageChoosed.trim()}.json`;
    // console.log(filename)
      fetch(`${filename}`)
      .then((response)=>response.json() as Promise<QuestionProps[]>)
      .then((data)=>{
        // setData(data)
        let filteredQuestions:QuestionProps[]=[]
        console.log(data)
        if(Array.isArray(questionId)&&questionId.length<0){
           filteredQuestions=questionId.map(index=>data.splice(index,1)[0])
        }else{
          filteredQuestions=[...data]
        }
       let shuffled=[...filteredQuestions].map((q,index)=>({
        ...q,
        originalIndex:index
       }))
        for (let i = shuffled.length-1; i > 0; i--) {
          const j=Math.floor(Math.random()*(i+1));
          [shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]]
        }
        const maxStart=Math.max(0,shuffled.length-parseInt(questonsLenghtSaved))
        const startIndex=Math.floor(Math.random()*(maxStart+1))
        const selectedQues=shuffled.slice(startIndex,startIndex+parseInt(questonsLenghtSaved))
        const selectedIndexes=selectedQues.map(q=>q.originalIndex).slice(0,parseInt(questonsLenghtSaved))
        setSelectedIndex(selectedIndexes)
        setData(selectedQues)
        setQuestionIndex(0)
        updateScore(selectedIndexes)
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
      else if(roomId ) {
        updateWholeScore(Number(roomId),scoreToBeSave)
        updateScore(selectedIndex)
        localStorage.setItem('AnswersChosedLive',JSON.stringify(selected))
      localStorage.setItem('QuestionsChosedLive',JSON.stringify(selectedIndex))
      localStorage.setItem('langused',`${questionlenght}`)
        navigate(`/liveresult/${roomId}`)
      }
        
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

<span key={index} onClick={()=>checkAnswer(val,questionNumber)} className={`h-[70px] text-left cursor-pointer border border-[#ffffff59] flex items-center text-white pl-5 pr-5 rounded-[13px] bg-gradient-to-br from-[#a1f2c] to-[#131720]/90 md:w-[310px] ${selected[questionNumber]===val?'shadow-[0_4px_10px_rgba(0,255,128,0.2)] border-3 border-green-700':''} `}>{val}</span>


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

export default livequiz