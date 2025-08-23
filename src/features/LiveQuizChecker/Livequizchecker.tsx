import { useNavigate,useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { Home, RotateCcw, CheckCircle, XCircle, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import toast from "react-hot-toast";
interface QuestionProps{
    question:string;
    options:string[];
    correctAnswer:string[];
  }
export default function QuizReview() {
  const {roomId}=useParams()
    const AnswersChosed=JSON.parse(localStorage.getItem('AnswersChosedLive')||'{}')
    const QuestionsChosed=JSON.parse(localStorage.getItem('QuestionsChosedLive')||'{}')
    // const [AnswersChosed,setAnswersChosed]=useState<{[key:number]:string}>({})
    // const [QuestionsChosed,setQuestionsChosed]=useState<number[]>([])
    const [languageChoosed,setlanguageChoosed]=useState<string>('')
    const [questonsLenghtSaved,setquestonsLenghtSaved]=useState<string>('')
    const [data,setData]=useState<QuestionProps[]>([])
    const [scoreArray,setScoreArray]=useState<string[]>([])
    const [keys,setKeys]=useState<number[]>([])
  const navigate = useNavigate();

  const handleRetakeQuiz = () => {
    navigate('/livesettings');
  };
  const handleBackHome = () => {
    navigate('/categories');
  };

  const getDocuments = async (roomCode: number): Promise<void> => {
    const usersRef = collection(db, "Rooms");
    const q = query(usersRef, where("roomCode", "==", roomCode));
    const querySnapshot = await getDocs(q);
    if(!querySnapshot.empty){
      const doc=querySnapshot.docs[0];
      const data= doc.data()
      setlanguageChoosed(data.languageChoosed)
      setquestonsLenghtSaved(data.questtionList)
    }else{
      console.log('error')
      toast.error('Room Does Not Exist')
      navigate('/categories')
    }
  };

  useEffect(()=>{
    if(!roomId) return 
      getDocuments(Number(roomId))
  },[roomId,navigate])
  
  useEffect(() => {
    if (
      Object.keys(AnswersChosed).length === 0 ||
      !languageChoosed ||
      !questonsLenghtSaved
    )
      return;
 
    const filename = `/data/liveQuiz/${languageChoosed}.json`;
   console.log(filename)
    fetch(filename)
      .then((response) => response.json() as Promise<QuestionProps[]>)
      .then((jsonData) => {
        const selectedQuestions: QuestionProps[] = QuestionsChosed.map(
          (i:any) => jsonData[i]
        );
        setData(selectedQuestions);
        const numericKeys = Object.keys(AnswersChosed).map((key) =>
          Number(key)
        );
        setKeys(numericKeys);
        setScoreArray(Object.values(AnswersChosed));
        console.log('Loaded quiz file:', filename);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
      });
  }, [
    JSON.stringify(AnswersChosed),
    languageChoosed,
    questonsLenghtSaved,
    JSON.stringify(QuestionsChosed),
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-foreground p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-green-400 ">
            Quiz Review
          </h1>
          <p className="text-muted-foreground">
            Review your answers and learn from mistakes
          </p>
        </div>

        {/* Questions Review */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-green-400">
            <Clock className="h-6 w-6 text-green-400" />
            
            Answer Review
          </h2>
          
          {data.map((question:any, index:number) => {
            const matchindex=keys.indexOf(index+1)
            return(
            <Card key={index} className="bg-slate-900/80 border-slate-800 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start gap-3">
                  {scoreArray[matchindex]==question.correctAnswer ? (
                    <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-400 mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs text-white border border-green-400">
                        Question {index + 1}
                      </Badge>
                      <Badge 
                        variant={scoreArray[matchindex]==question.correctAnswer ? "default" : "destructive"}
                        className={scoreArray[matchindex]==question.correctAnswer ? "bg-green-500/20 text-green-400 border-green-500/50" : ""}
                      >
                        {scoreArray[matchindex]==question.correctAnswer ? "Correct" : "Incorrect"}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-medium text-white">{question.question}</h3>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-green-400">Correct Answer:</p>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <p className="text-green-300">{question.correctAnswer}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-blue-400">Your Answer:</p>
                    <div className={`p-3 rounded-lg border ${
                     scoreArray[matchindex]==question.correctAnswer
                        ? "bg-green-500/10 border-green-500/20" 
                        : "bg-red-500/10 border-red-500/20"
                    }`}>
                      <p className={scoreArray[index]!==question.correctAnswer ? "text-green-300" : "text-red-300"}>
                        {matchindex!==-1?scoreArray[matchindex]:'No Selected Answer'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
)})}
        </div>

        <Separator className="my-8" />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleRetakeQuiz}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            Retake Quiz
          </Button>
          <Button
            onClick={handleBackHome}
            variant="outline"
            size="lg"
            className="border-green-500/50 text-green-400 cursor-pointer"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
