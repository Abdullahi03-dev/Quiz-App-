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
const Leaderboard = () => {
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
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950  text-gray-200 px-4 py-10">
      <div className='absolute top-20 left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl'></div>
      <div className='absolute bottom-20 right-20  w-96 h-96 bg-purple-500/10 rounded-full blur-3xl'></div>
      <div className="w-full max-w-6xl bg-900/80 rounded-2xl border p-8">



        <h1 className="text-3xl font-bold text-green-400 text-center mb-8">
          Quiz Leaderboard
        </h1>
{loading?(<p>Loading....</p>):(


<div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent scrollbar-smooth snap-x snap-mandatory px-2">
          <table className="w-full text-left border-separate border-spacing-y-4">
            <thead>
              <tr className="text-green-400 text-sm md:text-base">
                <th className="w-20">Rank</th>
                <th>Name</th>
                <th>Languages & Scores</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((player:any, index:number) => (
                <tr key={index} className="bg-slate-900/80 rounded-lg text-sm md:text-base">
                  <td className="py-3 px-4 font-bold text-green-300">
                    {index + 1 === 1
                      ? '🥇 1st'
                      : index + 1 === 2
                      ? '🥈 2nd'
                      : index + 1 === 3
                      ? '🥉 3rd'
                      : `${index + 1}th`}
                  </td>
                  <td className="py-3 px-4">{player.name}</td>
                  <td className="py-3 px-4 flex flex-wrap gap-2">
                    {Object.entries(player.scores).map(([lang, score], i) => (
                      <span
                        key={i}
                        className="bg-green-500/10 border border-green-400 text-green-300 px-3 py-1 rounded-full text-xs md:text-sm"
                      >
                        {lang}: {score as number}
                      </span>
                    ))}
                  </td>
                  <td className="py-3 px-4 text-right text-green-400 font-semibold">
                    {player.totalScore}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

)}
        
      </div>
    </div>
  );
};

export default Leaderboard;