import { useState, useEffect, useRef } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { Home, Send, Clock, Users } from "lucide-react";
import useUsername from "../../hooks/useUsername";
import Loader from "../../components/loader";
import {  arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, increment,query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import toast from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
// import { useToast } from "../../hooks/use-toast";

// Mock data
const mockPlayers = [
  { id: 1, name: "Swag", score: 850, status: "solving", avatar: "🔥" },
  { id: 2, name: "DevNinja", score: 720, status: "submitted", avatar: "⚡" }
];

export default function codeClashGame() {
  const {username}=useUsername()
  const { roomId } = useParams()
  const navigate = useNavigate();
  const [mockChallenge, setMockChallenge] = useState<any>(null) 
  const [selectedLanguage,setselectedLanguage]=useState<string>('')
  const [time,setTime]=useState<number|null>(null)
  const [code, setCode] = useState(``);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [players, setPlayers] = useState<[]>([]);
  const [questionId,setQuestionId]=useState<string[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval>|null>(null);




 const UpdateUserScore=async()=>{
  if (!username) return;
  const usersRef = collection(db, "users");
        const roomQuery = query(usersRef, where("name", "==",username));
        const snapshot = await getDocs(roomQuery);
    
        if (snapshot.empty) return console.log('Room not found');
    
        const roomDoc = snapshot.docs[0];

        await updateDoc(roomDoc.ref,{
          [`scores.JavaScript`]:increment((10)),
        })
 }

 const UpdateUserQuestionId=async(difficulty:string,id:any)=>{
  if (!username) return;
  const usersRef = collection(db, "users");
        const roomQuery = query(usersRef, where("name", "==",username));
        const snapshot = await getDocs(roomQuery);
    
        if (snapshot.empty) return console.log('Room not found');
    
        const roomDoc = snapshot.docs[0];

        await updateDoc(roomDoc.ref,{
          [`completedChallenges.${difficulty}`]:arrayUnion(id)
        })
 }



  const UpdateFirebase= async(passedAll:boolean)=>{
    if (!roomId) return;
    const usersRef = collection(db, "Codeclash");
          const roomQuery = query(usersRef, where("roomCode", "==", parseInt(roomId)));
          const snapshot = await getDocs(roomQuery);
      
          if (snapshot.empty) return console.log('Room not found');
      
          const roomDoc = snapshot.docs[0];
          const currentUser = username;
          await updateDoc(roomDoc.ref, {
            Onliners: arrayRemove(currentUser),
            status:'closed'
          });
      
          if (passedAll) {
            UpdateUserScore()
            await updateDoc(roomDoc.ref, {
              winner: arrayUnion(currentUser),
            });
          }
          else{
            // alert('wrong')
          }
      
          navigate(`/codeclashresult/${roomId}`);
  
  }
  

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        toast.error('Disqualified');
  UpdateFirebase(false)
      }
    };
  
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);



  useEffect(() => { 
    const checkRoom = async () => { 
    if (!roomId) 
    return navigate('/codeclashsettings')
    
    // Query the room by room code
      const usersRef = collection(db, "Codeclash");
      const roomQuery = query(usersRef, where("roomCode", "==",parseInt(roomId)))
      const snapshot = await getDocs(roomQuery)
    
      if (snapshot.empty){
        toast.error('Not Found')
       navigate('/codeclashsettings')
      }
      

      const roomDoc = snapshot.docs[0]
      const roomData = roomDoc.data()
    
      // // Check participant count+/
      if (roomData.status==='ready') {
        setPlayers(roomData.participants)
        setselectedLanguage(roomData.difficulty)
        setTime(roomData.time)
        const difficulty = roomData.difficulty; // get level here

    // Get current logged-in user
    const authUnsub = onAuthStateChanged(auth, async (user:any) => {
      if (!user) return;

      // Fetch this user’s completed challenges for this difficulty
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const completedIds = userSnap.data().completedChallenges?.[difficulty] || [];
        setQuestionId(completedIds);
      }
    });

    return () => authUnsub();
        // alert('Waiting for opponent to join...')
      }
    return navigate('/codeclashsettings')
     
      
    }
    
    checkRoom()
    
    }, [roomId, navigate])


useEffect(()=>{
   let filename=''
      // Fetch the question
      try
      {
        if(selectedLanguage===null)
        {
          navigate(-1)
        }else{
          // console.log(selectedLanguage)
          filename=`/data/codeclash/${selectedLanguage}.json`
          // console.log(selectedLanguage)
          console.log(filename)
          // alert(selectedLanguage)
        }
      fetch(`${filename}`)
      .then((response)=>response.json() as Promise<Record<string, string>>)
      .then((data)=>{           
        if(Array.isArray(data)&&Array.isArray(questionId)){
           const filteredQuestions = data.filter((q:any) => !questionId.includes(q.id));
        const randomQ = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
        setMockChallenge(randomQ)
        // alert(randomQ.id)
        
        }
      })
      }catch(e){
        console.log(e)
        console.log(data)
      }
},[selectedLanguage])


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
    if(intervalRef.current!==null){
      UpdateFirebase(false)
      clearInterval(intervalRef.current); // cleanup

  }
    console.log("Time's up!");
    toast.error("Time's Up!")
    {}
    // Add: auto-submit quiz, disable button, show modal, etc.
  }
}, [time]);

// Format time as MM:SS
const formatTime = (secs:number) => {
  const minutes = Math.floor(secs / 60);
  const seconds = secs % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};



if(mockChallenge===null||players==null){
      return <Loader/>
    }








    const handleSubmit = async () => {
      setIsSubmitting(true);
      console.log(code)
    
      try {
        if (!mockChallenge || !roomId) return;
    
        let passedAll = true;
    
        for (const test of mockChallenge.testCases) {
          try {
            // Parse the input string into real JS values
            console.log(test.input)
            const args = test.input;
            const expectedOutput = test.output.trim();
            
            // Create a new function from the user code
            const codeName=mockChallenge.starterCode
            const match=codeName.match(/function\s+([a-zA-Z0-9_$]+)\s*\(/);

            
            const userFunction = new Function(`${code}; return ${match[1]}(...arguments);`);
    
            const result = userFunction(...args);
    
            if (String(result).trim() !== expectedOutput) {
              passedAll = false;
              break;
            }
    
          } catch (err) {
            console.error("Test case error:", err);
            passedAll = false;
            break;
          }
        }
    
        // Update Firebase
        UpdateFirebase(passedAll)
        UpdateUserQuestionId(selectedLanguage,mockChallenge.id)
      } catch (err) {
        console.error(err);
        alert("Something went wrong while submitting.");
      }
      //  finally {
      //   setIsSubmitting(false);
      // }
    };


  return (
    <div className="min-h-screen bg-slate-950 text-foreground">
      {/* Header */}
      <div className="border-b border-muted/20 bg-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-green-600">sq
              
                Code Clash
              </h1>
              <Badge variant="outline" className="border-green-500/50 text-green-400">
                Room: {roomId}
              </Badge>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Timer */}
              <div className="flex items-center gap-2 bg-muted/20 rounded-lg px-4 py-2">
                <Clock className="h-5 w-5 text-green-400" />
                <span className="font-mono text-lg font-semibold text-green-400">
                <h2 className="text-white">Time Left: {time !=null  ? formatTime(time) : "Time's up!"}</h2>
                </span>
              </div>
              
              {/* Status */}
              {/* {getStatusDisplay()} */}
              
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                size="sm"
                className="border-green-500/50 text-green-400 hover:bg-green-500/10"
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Editor Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Challenge Info */}
          <Card className="border-green-500/20 bg-slate-900/80 border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
    
                {/* <span className="text-white">{mockChallenge.title}</span> */}
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                    {mockChallenge.difficulty}
                  </Badge>
                  <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                    {mockChallenge.points} pts
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-white">
                {mockChallenge.description}
              </p>
            </CardContent>
          </Card>

          {/* Code Editor */}
          <Card className="border-muted/20 bg-slate-900/80 border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-green-600">Code Editor</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border border-muted/20 rounded-lg overflow-hidden">
                <Editor
                  height="500px"
                  defaultLanguage="javascript"
                  value={mockChallenge.starterCode}
                  onChange={(value) => setCode(value || "")}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 16, bottom: 16 },
                  }}
                />
              </div>
              
              {/* Submit Button */}
              <div className="p-4">
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  // disabled={isSubmitting || timeLeft === 0}
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Send className="h-5 w-5 mr-2" />
                  {isSubmitting ? "Submitting..." : "Submit Solution"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-muted/20 bg-slate-900/80 backdrop-blur-sm sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-white">
                <Users className="h-5 w-5 text-green-400 " />
                Live Players

              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {players.map((player, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? 'bg-yellow-500 text-black' :
                        index === 1 ? 'bg-gray-400 text-black' :
                        index === 2 ? 'bg-amber-600 text-black' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium text-white">{player}</span>
                      <span className="text-lg">{mockPlayers[0].avatar}</span>
                    </div>
                    <div className="text-right">
                      {/* <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          player.status === 'submitted' 
                            ? 'border-green-500/50 text-green-400' 
                            : 'border-yellow-500/50 text-yellow-400'
                        }`}
                      >
                        {player.status}
                      </Badge> */}
                    </div>
                  </div>
                  {index < players.length - 1 && <Separator className="opacity-30" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}