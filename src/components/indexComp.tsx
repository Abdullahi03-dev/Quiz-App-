
import { ensureCompletedChallenges } from "../utils/ensureCompletedChallenges";
import useUsername from "../hooks/useUsername";
import {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Brain, Zap, Trophy, Users, Gamepad2, Crown, ArrowRight, Sparkles, Target, Globe } from "lucide-react";
const Index = () => {
  const {username}=useUsername()
  
  useEffect(() => {
    if (username) {
      alert(username)
      ensureCompletedChallenges(username);
    }
  }, [username]);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: Brain,
      title: "Normal Quiz",
      description: "Challenge yourself with thousands of questions across multiple categories. Perfect your knowledge at your own pace.",
      color: "from-emerald-400 to-green-600",
      // bgGradient: "from-emerald-500/10 to-green-500/5"
    },
    {
      icon: Zap,
      title: "PvP Quiz Battle",
      description: "Face off against players worldwide in real-time quiz battles. Fast-paced, competitive, and thrilling!",
      color: "from-yellow-400 to-orange-500",
      // bgGradient: "from-yellow-500/10 to-orange-500/5"
    },
    {
      icon: Trophy,
      title: "Global Leaderboard",
      description: "Climb the ranks and prove you're the ultimate quiz master. Compete with millions of players worldwide.",
      color: "from-purple-400 to-pink-500",
      // bgGradient: "from-purple-500/10 to-pink-500/5"
    }
  ];

  const stats = [
    { label: "Active Players", value: "2.5M+", icon: Users },
    { label: "Quiz Questions", value: "100K+", icon: Target },
    { label: "Countries", value: "180+", icon: Globe },
    { label: "Daily Battles", value: "50K+", icon: Gamepad2 }
  ];


//   const {user}=useAuth()



//   const navigate=useNavigate()
//   useEffect(()=>{
// if(!user){
//   return
// } else{
//     navigate('/categories')
// }
//   },[])



  return (
    <div className="min-h-screen bg-slate-950  text-white overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4 backdrop-blur-sm bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
             AbdullThon
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/signin">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-slate-800">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white border-0">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-32">       
        <div className="relative max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20">
            <Sparkles className="w-4 h-4 mr-2" />
            The Ultimate Quiz Experience
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Challenge Your
            <span className="block bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
              Brain & Compete
            </span>
            Globally
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join millions of players in the most addictive quiz platform. Test your coding knowledge, 
            battle friends, and climb the global leaderboards in real-time multiplayer quizzes.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 items-center">
            <Link to="/categories">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white border-0 px-3 py-4 text-lg  w-[250px]">
                Explore Categories
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-slate-700 bg-slate-700 text-white hover:bg-slate-800 px-3 py-4 text-lg w-[200px] ">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="px-6 py-20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-slate-800 text-slate-300 border-slate-700">
              <Crown className="w-4 h-4 mr-2" />
              Premium Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Three Ways to 
              <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent"> Dominate</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose your battle style and prove your intellectual supremacy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className={`relative bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-all duration-300 cursor-pointer group overflow-hidden ${
                  hoveredFeature === index ? 'scale-105 shadow-2xl' : ''
                }`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <CardContent className="relative p-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-6">{feature.description}</p>
                  <Button 
                    variant="ghost" 
                    className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 p-0 group/btn"
                  >
                    <Link to='categories'>
                    Learn More 
                    </Link>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/5"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Become a
            <span className="block bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Quiz Legend?
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Join the ultimate quiz community and start your journey to intellectual greatness today.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white border-0 px-12 py-4 text-lg group">
              Join Now - It's Free
              <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-slate-800 bg-slate-950/80">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
            AbdullThon
            </span>
          </div>
          <p className="text-gray-400">
            © 2024 AbdullThon. Elevating minds, one question at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;


 