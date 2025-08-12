import { useEffect, useState } from "react"
import {  useNavigate } from 'react-router-dom';
// import Footer from "../../components/footer";
import { calculateFinalScore,Difficulty } from "../../utils/calculateScore";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Progress } from "../..//components/ui/progress";
import { Badge } from "../../components/ui/badge";
import { Trophy, Target, Brain, Home, RotateCcw, TrendingUp } from "lucide-react";
import { Button } from "../../components/ui/button";
const localResultComp = () => {
const navigate=useNavigate()
const [score,setScore]=useState<number>(0)
const [category,setCategory]=useState<string>('')
const [percentage,setPercentage]=useState(0)
// const [username,setUserName]=useState<string>('')
const [difficultyLevel,setDifficultyLevel]=useState('')
const [questonsLenght,setQuestonsLenght]=useState('')



        useEffect(()=>{
            const handlepop=()=>{
              navigate('/categories',{replace:true})
            }
            window.addEventListener('popstate',handlepop)
            return()=>{
              window.removeEventListener('popstate',handlepop)
            }
          },[navigate])






useEffect(()=>{
    // localStorage.removeItem('HasQuizStart')
    const saveData= JSON.parse(localStorage.getItem('quizSettings')||'{}')
    const scoreSaved =localStorage.getItem('scoreSaved')
    if(scoreSaved!==null&&saveData!==null){
        setCategory(saveData.languageChoosed)
        setScore(parseInt(scoreSaved))
        setDifficultyLevel(saveData.difficultyLevel)
        setQuestonsLenght(saveData.questonsLenghtSaved)
    }else{
      alert('error')
    }

},[])







useEffect(()=>{
      if(score!==null&&questonsLenght!==null)
      {
        setPercentage((score/Number(questonsLenght))*100)
      }
},[score,questonsLenght])


  const getScoreColor = () => {
    if (percentage>=90) return "text-emerald-400";
    if (percentage >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  const getPerformanceLevel = () => {
    // const 
    if (percentage>=90) return { level: "Excellent", color: "bg-emerald-500" };
    if (percentage >= 80) return { level: "Great", color: "bg-green-500" };
    if (percentage >= 70) return { level: "Good", color: "bg-yellow-500" };
    if (percentage >= 60) return { level: "Fair", color: "bg-orange-500" };
    return { level: "Needs Improvement", color: "bg-red-500" };
  };

  const performance = getPerformanceLevel();

  
  return (
<>

<div className="min-h-screen bg-slate-950 text-white p-6">
<div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-purple-500/5"></div>
      <div className="absolute md:top-20 md:left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">
            Quiz Complete!
          </h1>
          <p className="text-gray-400 text-lg">Here's how you performed</p>
        </div>

        {/* Main Results */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Score Card */}
          <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">{score!==0?((score/Number(questonsLenght))*100):'0'}%</span>
              </div>
              <CardTitle className={`text-3xl font-bold ${getScoreColor()}`}>
              {
                score!==0?
              calculateFinalScore(
              score,
             Number(questonsLenght),
             difficultyLevel as Difficulty
            ):0} Points
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Badge className={`${performance.color} text-white px-4 py-2 text-lg`}>
                  {performance.level}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Accuracy</span>
                  <span className="text-white font-medium">{(score/Number(questonsLenght))*100}%</span>
                </div>
                <Progress 
                  value={(score/Number(questonsLenght))*100}
                  className="h-3 bg-slate-800"
                />
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-400" />
                Performance Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                  <Brain className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{score}</div>
                  <div className="text-gray-400 text-sm">Correct</div>
                </div>
                
                <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                  <Target className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{questonsLenght}</div>
                  <div className="text-gray-400 text-sm">Total</div>
                </div>
                
                {/* <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{results.timeSpent}</div>
                  <div className="text-gray-400 text-sm">Time</div>
                </div> */}
                
                <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{difficultyLevel}</div>
                  <div className="text-gray-400 text-sm">Level</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quiz Details */}
        <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="text-white">Quiz Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="border-emerald-500 text-emerald-300 bg-emerald-500/10">
                💻 {category}
              </Badge>
              <Badge variant="outline" className="border-blue-500 text-blue-300 bg-blue-500/10">
                📚 Programming Language              </Badge>
              <Badge variant="outline" className="border-purple-500 text-purple-300 bg-purple-500/10 capitalize">
                ⚡ {difficultyLevel}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            asChild
            className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-6 text-lg"
          >
            <Link to="/categories">
              <RotateCcw className="w-5 h-5 mr-2" />
              Take Another Quiz
            </Link>
          </Button>
        
          
          <Button 
            asChild
            variant="outline" 
            className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-6 text-lg"
          >
            <Link to="/verifyanswers">
              <Home className="w-5 h-5 mr-2" />
              Check Answers
            </Link>
          </Button>


          <Button 
            asChild
            variant="outline" 
            className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-6 text-lg"
          >
            <Link to="/leaderboard">
              <Home className="w-5 h-5 mr-2" />
              View Leaderboard
            </Link>
          </Button>
        </div>

        {/* Motivational Message */}
        <Card className="bg-gradient-to-r from-emerald-500/10 to-green-600/10 border-emerald-500/30 backdrop-blur-sm mt-8">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">
              {Number(questonsLenght)-score<= 2 ? "Excellent Work! 🎉" :Number(questonsLenght)-score<= 4 ? "Good Job! Keep Learning! 📚" : "Don't Give Up! Practice Makes Perfect! 💪"}
            </h3>
            <p className="text-gray-300">
              {score >= 80 
                ? "You've mastered this challenge! Ready for a harder challenge?" 
                : score >= 60 
                ? "You're on the right track. A few more practice sessions and you'll be an expert!"
                : "Every expert was once a beginner. Keep practicing and you'll improve!"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>

{/* <Footer/> */}
</>


  )
}

export default localResultComp