import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { Home, RotateCcw, CheckCircle, XCircle, Clock } from "lucide-react";
import { useEffect, useState } from "react";
interface QuestionProps{
    question:string;
    options:string[];
    correctAnswer:string[];
  }
export default function QuizReview() {
    const saveData= JSON.parse(localStorage.getItem('quizSettings')||'{}')
    const AnswersChosed= JSON.parse(localStorage.getItem('AnswersChosed')||'{}')
    const QuestionsChosed:number[]= JSON.parse(localStorage.getItem('QuestionsChosed')||'{}')
    const [data,setData]=useState<QuestionProps[]>([])
    const [scoreArray,setScoreArray]=useState<boolean[]>([])
    const [keys,setKeys]=useState<number[]>([])
  const navigate = useNavigate();

  const handleRetakeQuiz = () => {
    navigate('/settings');
  };
  const handleBackHome = () => {
    navigate('/categories');
  };


  useEffect(()=>{
      let filename=''
      if(saveData.languageChoosed === null||saveData.questonsLenghtSaved===null){
        navigate(-1)
      }else{
        // setQuestionLenght(parseInt(saveData.questonsLenghtSaved))
         filename=`data/${saveData.languageChoosed}/${saveData.languageChoosed}${saveData.difficultyLevel}.json`;
      }
      fetch(`${filename}`)
      .then((response)=>response.json() as Promise<QuestionProps[]>)
      .then((data)=>{
            const selectedQuestions:QuestionProps[]=QuestionsChosed.map(i=>data[i])
            setData(selectedQuestions)
            const numericKeys=Object.keys(AnswersChosed).map(key=>Number(key))
            setKeys(numericKeys)
            setScoreArray(Object.values(AnswersChosed))

      })
      .catch((err)=>{
          console.log(err)
      })
    },[])

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
            <Card key={question} className="bg-slate-900/80 border-slate-800 backdrop-blur-sm">
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
