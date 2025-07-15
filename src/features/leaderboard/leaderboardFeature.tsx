// import { db, collection,getDocs} from "../../firebase/firebase";
// import { useEffect, useState } from "react"
// interface User{
//   name:string;
//   email:string;
//   userId:string;
//   scores:{
//     javascript:number;
//   golang:number;
//   python:number;
//   }
  
// }
// const Leaderboard = () => {
//   const [data,setData]=useState<User[]>([])
//   const [loading,setLoading]=useState(true)


//   useEffect(()=>{
//     const fetchUsers=async()=>{
//         try{
//             const querySnapshot=await getDocs(collection(db,'users'))
//             const usersData:User[]=querySnapshot.docs.map(doc=>({
//               id:doc.id,
//               ...(doc.data() as Omit<User,'id'>)
//             }))
//             setData(usersData)
//         }catch(err){
//               console.log(err)
//         }finally{
//           setLoading(false)
//         }
//       }
//       fetchUsers()
//   },[])


//   const sortedData = data
//   .map(player => ({
//     ...player,
//     totalScore: Object.values(player.scores).reduce((a, b) => a + b, 0)
//   }))
//   .sort((a, b) => b.totalScore - a.totalScore);
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-950  text-gray-200 px-4 py-10">
//       <div className='absolute top-20 left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl'></div>
//       <div className='absolute bottom-20 right-20  w-96 h-96 bg-purple-500/10 rounded-full blur-3xl'></div>
//       <div className="w-full max-w-6xl bg-900/80 rounded-2xl border p-8">



//         <h1 className="text-3xl font-bold text-green-400 text-center mb-8">
//           Quiz Leaderboard
//         </h1>
// {loading?(<p>Loading....</p>):(


// <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent scrollbar-smooth snap-x snap-mandatory px-2">
//           <table className="w-full text-left border-separate border-spacing-y-4">
//             <thead>
//               <tr className="text-green-400 text-sm md:text-base">
//                 <th className="w-20">Rank</th>
//                 <th>Name</th>
//                 <th>Languages & Scores</th>
//                 <th className="text-right">Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {sortedData.map((player:any, index:number) => (
//                 <tr key={index} className="bg-slate-900/80 rounded-lg text-sm md:text-base">
//                   <td className="py-3 px-4 font-bold text-green-300">
//                     {index + 1 === 1
//                       ? '🥇 1st'
//                       : index + 1 === 2
//                       ? '🥈 2nd'
//                       : index + 1 === 3
//                       ? '🥉 3rd'
//                       : `${index + 1}th`}
//                   </td>
//                   <td className="py-3 px-4">{player.name}</td>
//                   <td className="py-3 px-4 flex flex-wrap gap-2">
//                     {Object.entries(player.scores).map(([lang, score], i) => (
//                       <span
//                         key={i}
//                         className="bg-green-500/10 border border-green-400 text-green-300 px-3 py-1 rounded-full text-xs md:text-sm"
//                       >
//                         {lang}: {score as number}
//                       </span>
//                     ))}
//                   </td>
//                   <td className="py-3 px-4 text-right text-green-400 font-semibold">
//                     {player.totalScore}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

// )}
        
//       </div>
//     </div>
//   );
// };

// export default Leaderboard;



// import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { ArrowLeft, Trophy, Medal, Crown, TrendingUp, Users } from "lucide-react";
import { db, collection,getDocs} from "../../firebase/firebase";
import { useEffect, useState } from "react"
interface User{
  name:string;
  email:string;
  userId:string;
  scores:{
    javascript:number;
  golang:number;
  python:number;
  }
  
}
//  
const Leaderboards = () => {
  // const [selectedCategory, setSelectedCategory] = useState("overall");
  // const [selectedPeriod, setSelectedPeriod] = useState("all-time");
  const [data,setData]=useState<User[]>([])
    const [loading,setLoading]=useState(true)
  
  
    useEffect(()=>{
      const fetchUsers=async()=>{
          try{
              const querySnapshot=await getDocs(collection(db,'users'))
              const usersData:User[]=querySnapshot.docs.map(doc=>({
                id:doc.id,
                ...(doc.data() as Omit<User,'id'>)
              }))
              setData(usersData)
          }catch(err){
                console.log(err)
          }finally{
            setLoading(false)
          }
        }
        fetchUsers()
    },[])
  
  
    const sortedData = data
    .map(player => ({
      ...player,
      totalScore: Object.values(player.scores).reduce((a, b) => a + b, 0)
    }))
    .sort((a, b) => b.totalScore - a.totalScore);
    const FirstThree=sortedData.slice(0,3)
    const RestData=sortedData.slice(3)

  // Mock leaderboard data with language-specific scores
  const leaderboardData = [
    {
      rank: 1,
      username: "CodeMaster2024",
      totalScore: 24850,
      languageScores: {
        javascript: 5420,
        python: 4890,
        react: 5240,
        nodejs: 4600,
        typescript: 4700
      },
      country: "🇺🇸",
      level: "Grandmaster",
      joinedDate: "Jan 2024"
    }
  ];
console.log(leaderboardData)
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2: return <Medal className="w-5 h-5 text-gray-300" />;
      case 3: return <Medal className="w-5 h-5 text-orange-400" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-gray-400 font-bold text-sm">#{rank+3}</span>;
    }
  };

  const getTotalScore=(score:Record<string,number>)=>{
    return Object.values(score).reduce((a, b) => a + b, 0)
  }
const getLevel = (score: number) => {
    if(score>=2400) return 'GrandMaster';
    if(score>=2399) return 'Master';
    if(score>=2099) return 'Expert';
    if(score>=1799) return 'Advanced';
    if(score>=1499) return 'Intermediate';
    return 'Beginner'
  };
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "grandmaster": return "border-yellow-500 text-yellow-300 bg-yellow-500/10";
      case "master": return "border-purple-500 text-purple-300 bg-purple-500/10";
      case "expert": return "border-red-500 text-red-300 bg-red-500/10";
      case "advanced": return "border-blue-500 text-blue-300 bg-blue-500/10";
      case "intermediate": return "border-green-500 text-green-300 bg-green-500/10";
      default: return "border-gray-500 text-gray-300 bg-gray-500/10";
    }
  };

  

  // const topPerformers = leaderboardData.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
         <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-purple-500/5"></div>
      <div className="absolute md:top-20 md:left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>

      {loading?'LOADING...':''}
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap">
          <div className="flex items-center gap-4">
            <Button 
              asChild
              variant="outline" 
              size="icon"
              className="border-slate-700 bg-slate-800 text-white hover:bg-slate-800"
            >
              <Link to="/categories">
                <ArrowLeft className="w-4 h-4 bg-slate-800" />
              </Link>
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">
                Global Leaderboards
              </h1>
              <p className="text-gray-400 text-lg mt-2">See how you rank against developers worldwide</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-800/50 w-[100%] mt-3 rounded-lg px-4 py-2 ">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span className="text-white">Live Rankings</span>
          </div>

        </div>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {FirstThree.map((player, index) => (
            <Card 
              key={index}
              className={`bg-slate-900/80 border backdrop-blur-sm ${
                index+1 === 1 ? 'border-yellow-500/50 order-2 md:order-1 scale-105' :
                index+1 == 2 ? 'border-gray-300/50 order-1 md:order-0' :
                'border-orange-400/50 order-3 md:order-2'
              }`}
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                  index+1 === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                  index+1 === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                  'bg-gradient-to-br from-orange-400 to-red-500'
                }`}>
                  {getRankIcon(index+1)}
                </div>
                <CardTitle className="text-white text-lg">{player.name}</CardTitle>
                <div className="flex items-center justify-center gap-1">
                  {/* <span className="text-sm">{'Nigeria'}</span> */}
                  <Badge variant="outline" className={getLevelColor(getLevel(getTotalScore(player.scores)))}>
                    {getLevel(getTotalScore(player.scores))}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="text-center space-y-3">
                <div>
                  <p className="text-2xl font-bold text-white">{getTotalScore(player.scores)}</p>
                  <p className="text-gray-400 text-sm">Total Score</p>
                </div>
                
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(player.scores).slice(0, 5).map(([lang, score]) => (
                      <div key={lang} className="bg-slate-800/50 rounded px-2 py-1">
                        <div className="text-emerald-400 font-semibold">{score}</div>
                        <div className="text-gray-400 capitalize">{lang}</div>
                      </div>
                    ))}

                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full Leaderboard Table */}
        <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-emerald-400" />
              Complete Rankings
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-gray-300">Rank</TableHead>
                  <TableHead className="text-gray-300">Player</TableHead>
                  <TableHead className="text-gray-300">Total Score</TableHead>
                  <TableHead className="text-gray-300">Language Scores</TableHead>
                  <TableHead className="text-gray-300">Level</TableHead>
                  <TableHead className="text-gray-300">Country</TableHead>
                </TableRow>
              </TableHeader>
              
              <TableBody>
                {RestData.map((player,index) => (
                  <TableRow 
                    key={index} 
                    className={`border-slate-700 ${
                      true ? 'bg-emerald-500/10 border-emerald-500/30' : 'hover:bg-slate-800/50'
                    }`}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {getRankIcon(index+1)}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className={`font-medium ${true ? 'text-emerald-300' : 'text-white'}`}>
                            {player.name}
                            {true && (
                              <Badge variant="outline" className="ml-2 border-emerald-500 text-emerald-300 bg-emerald-500/10 text-xs">
                                You
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell className={`font-bold text-xl ${true ? 'text-emerald-300' : 'text-white'}`}>
                      {getTotalScore(player.scores)}
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {Object.entries(player.scores).slice(0, 5).map(([lang, score]) => (
                      <div key={lang} className="bg-slate-800/50 rounded px-2 py-1">
                        <div className="text-emerald-400 font-semibold">{score}</div>
                        <div className="text-gray-400 capitalize">{lang}</div>
                      </div>
                    ))}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge variant="outline" className={getLevelColor(getLevel(getTotalScore(player.scores)))}>
                      {getLevel(getTotalScore(player.scores))}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <Card className="bg-gradient-to-r from-emerald-500/10 to-green-600/10 border-emerald-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">🚀 Ready to Climb the Rankings?</h3>
              <p className="text-gray-300 mb-4">
                Take more quizzes, improve your accuracy, and compete with developers worldwide!
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  asChild
                  className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white"
                >
                  <Link to="/categories">
                    <Trophy className="w-4 h-4 mr-2" />
                    Take Quiz
                  </Link>
                </Button>
                
                <Button 
                  asChild
                  variant="outline" 
                  className="border-purple-500 text-purple-300 bg-slate-800 hover:bg-purple-500/10"
                >
                  <Link to="/livesettings">
                    <Users className="w-4 h-4 mr-2" />
                   Play Multiplayer
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboards;
