import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { ArrowLeft, Settings, Code, Zap, Target } from "lucide-react";
import { toast } from "react-hot-toast";
import useUsername from "../../hooks/useUsername";
import { addDoc, collection,getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
// import { getAuth } from "firebase/auth";

const QuizSettings = () => {
  const {username}=useUsername()
  // const auth=getAuth()
  // const user=auth.currentUser
  const [Loading,setloading] =useState(false)
  const [settingLogic, setSettings] = useState({
    questionCount: "10",
    difficulty: "medium",
    category: "",
    language: ""
  });

  const programmingLanguages = [
    { value: "javascript", label: "JavaScript", icon: "🟨" },
    { value: "python", label: "Python", icon: "🐍" },
    { value: "java", label: "Java", icon: "☕" },
    { value: "react", label: "React", icon: "⚡" },
    // { value: "cpp", label: "C++", icon: "⚡" },
    // { value: "csharp", label: "C#", icon: "💎" },
    // { value: "php", label: "PHP", icon: "🐘" },
    // { value: "ruby", label: "Ruby", icon: "💎" },
    { value: "golang", label: "Go", icon: "🔵" }
    // { value: "rust", label: "Rust", icon: "🦀" },
    // { value: "swift", label: "Swift", icon: "🍎" }
  ];

  const categories = [
    { value: "general", label: "Do not shuffle ", icon: "" },
    { value: "algorithms", label: "Shuffle only questions", icon: "" },
    { value: "web", label: "Shuffle only answers", icon: "" },
    { value: "mobile", label: "Shuffle both", icon: "" }
  ];
  const navigate=useNavigate()



  const handleStartQuiz = async () => {
    if (!settingLogic.language || !settingLogic.category) {
      toast.error("Please select both programming language and category!");
      return;
    }
    setloading(true)
    toast.success("Starting your quiz adventure!");
    if(!username) return
// alert(username)
const usersRef = collection(db, "users");
const sessionRef = query(usersRef, where("name", "==", username));
      const querySanpshot=await getDocs(sessionRef)

      if(!querySanpshot.empty){
        querySanpshot.forEach(async(userdoc)=>{

          const subcollection=collection(userdoc.ref,'sessions');

       const sessionId=await addDoc(subcollection,{
      questonsLenghtSaved:settingLogic.questionCount,
      difficultyLevel:settingLogic.difficulty,
      languageChoosed:settingLogic.language,
      HasQuizEnd:false,
      score:null
    })
    navigate(`/quiz/${sessionId.id}`)
        })
       
      }else{
        setloading(false)
        console.log('no user found')
      }
     
    
    
    // localStorage.setItem('quizSettings',JSON.stringify( {
    
    // }))
    
  };




  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
     <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-purple-500/5"></div>
      <div className="absolute md:top-20 md:left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-4xl mx-auto">
        <Link 
          to="/categories" 
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Settings className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">
            Quiz SettingLogic
          </h1>
          <p className="text-gray-400 text-lg">Customize your quiz experience</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Question Count & Difficulty */}
          <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-400" />
                Quiz Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-white text-base font-medium">Number of Questions</Label>
                <RadioGroup 
                  value={settingLogic.questionCount} 
                  onValueChange={(value) => setSettings(prev => ({ ...prev, questionCount: value }))}
                  className="grid grid-cols-3 gap-3"
                >
                  {["10", "15", "20", "25", "35", "40"].map((count) => (
                    <div key={count} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value={count} 
                        id={`q-${count}`}
                        className="border-slate-600 text-emerald-500 focus:ring-emerald-500"
                      />
                      <Label htmlFor={`q-${count}`} className="text-gray-300 cursor-pointer">
                        {count}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-white text-base font-medium">Difficulty Level</Label>
                <RadioGroup 
                  value={settingLogic.difficulty} 
                  onValueChange={(value) => setSettings(prev => ({ ...prev, difficulty: value }))}
                  className="space-y-3"
                >
                  {[
                    { value: "easy", label: "Easy", desc: "Perfect for beginners", icon: "🟢" },
                    { value: "medium", label: "Medium", desc: "Balanced challenge", icon: "🟡" },
                    { value: "hard", label: "Hard", desc: "For experienced developers", icon: "🔴" }
                  ].map((level) => (
                    <div key={level.value} className="flex items-center space-x-3 p-3 rounded-lg border border-slate-700 hover:border-emerald-500/50 transition-colors">
                      <RadioGroupItem 
                        value={level.value} 
                        id={level.value}
                        className="border-slate-600 text-emerald-500 focus:ring-emerald-500"
                      />
                      <Label htmlFor={level.value} className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{level.icon}</span>
                          <div>
                            <div className="text-white font-medium">{level.label}</div>
                            <div className="text-gray-400 text-sm">{level.desc}</div>
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Language & Category Selection */}
          <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Code className="w-5 h-5 text-emerald-400" />
                Topic Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-white text-base font-medium">Programming Language</Label>
                <Select value={settingLogic.language} onValueChange={(value) => setSettings(prev => ({ ...prev, language: value }))}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white focus:border-emerald-500">
                    <SelectValue placeholder="Choose your language" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {programmingLanguages.map((lang) => (
                      <SelectItem 
                        key={lang.value} 
                        value={lang.value}
                        className="text-white hover:bg-slate-700 focus:bg-slate-700"
                      >
                        <div className="flex items-center gap-2">
                          <span>{lang.icon}</span>
                          {lang.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-white text-base font-medium">Shuffle Mode</Label>
                <Select value={settingLogic.category} onValueChange={(value) => setSettings(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white focus:border-emerald-500">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {categories.map((category) => (
                      <SelectItem 
                        key={category.value} 
                        value={category.value}
                        className="text-white hover:bg-slate-700 focus:bg-slate-700"
                      >
                        <div className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          {category.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-6">
                <Button 
                  onClick={()=>handleStartQuiz()}
                  disabled={Loading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white border-0 py-6 text-lg font-semibold"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  {Loading?`Start Quiz Adventure`:'Starting'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected SettingLogic Preview */}
        {(settingLogic.language || settingLogic.category) && (
          <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-sm mt-6">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-3">Quiz Preview</h3>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full">
                  {settingLogic.questionCount} Questions
                </div>
                <div className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full capitalize">
                  {settingLogic.difficulty} Difficulty
                </div>
                {settingLogic.language && (
                  <div className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">
                    {programmingLanguages.find(l => l.value === settingLogic.language)?.label}
                  </div>
                )}
                {settingLogic.category && (
                  <div className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full">
                    {categories.find(c => c.value === settingLogic.category)?.label}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default QuizSettings;