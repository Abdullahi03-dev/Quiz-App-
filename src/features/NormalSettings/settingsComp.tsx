// // import React from 'react'
// import { useState ,useEffect} from "react"
// import RangeSlider from "../../components/rangeSlider"
// import SettingsCheckboxes from "../../components/settingsCheckboxes"
// import '../../assets/css/classes.css'
// import toast from "react-hot-toast"
// import { useNavigate } from "react-router-dom"
// const settingsComp = () => {
//   const navigate=useNavigate()
//   const [selected,setSelected]=useState<string| null>(null)
//   const [selectedLang,setSelectedLang]=useState<string| null>(null)
//   const [selectedid,setSelectedid]=useState<string>("")
//   const [selectedidLang,setSelectedidLang]=useState<string>("")
//   const min=5;
//   const max=20;
//     const [value,setValue]=useState<number>(min)
//     const handlechange=(e:any)=>{
//         setValue(Number(e.target.value))
//     }
//      const percent=((value-min)/(max-min))*100 
  

//         const handlecheck=(e:React.ChangeEvent<HTMLInputElement>)=>{
//                 setSelected(e.target.value);
//                 setSelectedid(e.target.id);
//         }
//         const handlecheckLang=(e:React.ChangeEvent<HTMLInputElement>)=>{
//           setSelectedLang(e.target.value);
//           setSelectedidLang(e.target.id);
//   }
  
//      const handleClick=()=>{
//       if(selected&&selectedLang){
//         localStorage.setItem('difficultyLevel',selectedid)
//         localStorage.setItem('languageChoosed',selectedidLang)
//         localStorage.setItem('questonsLenght',`${value}`)
//         localStorage.setItem('HasQuizStart','true')
//           navigate('/quiz')
//       }
//       else{
//         toast.error('CHOOSE ALL SETTINgLogic')
//       }
//      }



//      useEffect(()=>{
  
//       const saved=localStorage.getItem("quizSettings");
//     const scoreSaved =localStorage.getItem('scoreSaved')
//       if(saved!=null||scoreSaved!=null){
//         localStorage.removeItem('quizSettings')
//         localStorage.removeItem('scoreSaved')
//         return
//       }
//      },[])



//   return (
//     <>
//     <section className='bg-slate-950 h-[100vh]'>
//     <div className='absolute inset-0 bg-gradient-to-br from emerald-500/5 via transparent to-purple-500/5'></div>
//       <div className='absolute top-20 left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl'></div>
//       <div className='absolute bottom-20 right-20  w-96 h-96 bg-purple-500/10 rounded-full blur-3xl'></div>
// <div className="w-[340px] bg-gradient-to-br from-[#a1f2c] to-black/80 rounded-[6px] relative left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] h-[390px]">
// <span className='flex items-center justify-center pt-3.5'>
//       <h1 className='inline-block text-center font-bold text-4xl text-[#00ff7f] drop-shadow-[0_0_10px_rgba(34,197,94,0.8)] pr-5 font-dmsans'>Quiz</h1><h1 className='font-bold text-4xl text-white inline-block'>Setup</h1>
//       </span>
      
// <SettingsCheckboxes selected={selected} selectedLang={selectedLang} handlecheck={handlecheck} handlecheckLang={handlecheckLang} />


// <RangeSlider value={value} handlechange={handlechange} percent={percent}/>

// <div className="pt-5">
// <button className="text-black font-bold bg-[#00ff7f] w-[300px] h-10 rounded-lg block mx-auto cursor-pointer" onClick={handleClick}>Start Quiz</button>
  
// </div>
// </div>

//     </section>
    
//     </>
//   )
// }

// export default settingsComp




import { useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { ArrowLeft, Settings, Code, Zap, Target } from "lucide-react";
import { toast } from "react-hot-toast";

const QuizSettings = () => {
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
    { value: "go", label: "Go", icon: "🔵" }
    // { value: "rust", label: "Rust", icon: "🦀" },
    // { value: "swift", label: "Swift", icon: "🍎" }
  ];

  const categories = [
    { value: "general", label: "Do not shuffle ", icon: "" },
    { value: "algorithms", label: "Shuffle only questions", icon: "" },
    { value: "web", label: "Shuffle only answers", icon: "" },
    { value: "mobile", label: "Shuffle both", icon: "" }
  ];
  useEffect(()=>{
  
    const saved=localStorage.getItem("quizSettings");
    const saved2=localStorage.getItem("quizState");
  const scoreSaved =localStorage.getItem('scoreSaved')
    if(saved!=null||saved2!=null||scoreSaved!=null){
      localStorage.removeItem('quizSettings')
      localStorage.removeItem('scoreSaved')
      localStorage.removeItem('quizState')
      return
    }
   },[])
  const navigate=useNavigate()
  const handleStartQuiz = () => {
    if (!settingLogic.language || !settingLogic.category) {
      toast.error("Please select both programming language and category!");
      return;
    }
    toast.success("Starting your quiz adventure!");
    localStorage.setItem('quizSettings',JSON.stringify( {
      questonsLenghtSaved:settingLogic.questionCount,
      difficultyLevel:settingLogic.difficulty,
      languageChoosed:settingLogic.language,
      HasQuizStart:'true'
    }))
    navigate('/quiz')
    
    // // Navigate to quiz page with settingLogic
    navigate('/quiz');
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
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white border-0 py-6 text-lg font-semibold"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Start Quiz Adventure
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