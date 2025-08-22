import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import {useAutoDeleteLocalStorageOnLeave} from '../../hooks/usePageLocalStorage'
import { Unsubscribe,DocumentData, db,collection,
  query,
  where,
  onSnapshot,
  getDocs,
   } from "../../firebase/firebase";        // ← adjust path if needed
import { Button } from "../../components/ui/button";
import toast from "react-hot-toast";

/* ---------- types ---------- */
interface RoomData {
  participants:string[];
  winner:string[];
  Onliners:string[];
}



const Codeclashresult = () => {
  

  const navigate = useNavigate();
  const { roomId } = useParams()
  const [data, setData] = useState<RoomData>({
    participants:[],
    winner:[],
    Onliners:[],
  });

  const [first, setFirst] = useState("ALL PLAYERS NEED TO FINISH");


  useEffect(() => { 
    const checkRoom = async () => { 
    if (!roomId) 
    return navigate('/codeclashsettings')
    
    // Query the room by room code
      const usersRef = collection(db, "Codeclash");
      const roomQuery = query(usersRef, where("roomCode", "==",parseInt(roomId)))
      const snapshot = await getDocs(roomQuery)
    
      if (snapshot.empty){
        toast.error('Room Not found')
       navigate('/codeclashsettings')
      }
          }
    checkRoom()
    }, [navigate])

  /* ---------- Firestore realtime listener ---------- */
  const listenToRoom = (roomCode: number): Unsubscribe => {
    const roomsRef = collection(db, "Codeclash");
    const q = query(roomsRef, where("roomCode", "==", roomCode));
    const unsub= onSnapshot(q, (snap) => {
console.log('snapshot fired:',snap.empty?'no documents':'gotten data')

      if (!snap.empty) {
        const docData = snap.docs[0].data() as DocumentData;
        console.log('Room data',docData)

        setData(() => ({
            participants:docData.participants,
            winner:docData.winner,
            Onliners:docData.Onliners,
        }));
        
      } else {
        console.error("Room not found");
      }
    });

    return unsub
  };

  
  /* ---------- mount: attach listener ---------- */
  useEffect(() => {
    if(!roomId) return
    const unsub = listenToRoom(parseInt(roomId));
    return () => unsub();               // cleanup
  }, []);                                // run once
   



  /* ---------- derive winner banner ---------- */
  useEffect(() => {
  // console.log(data.winner)
  // console.log(data.participants[0])
  if(data.Onliners.length===0&&data.winner.length===0){
       setFirst("You Both Loose!");
  }else{
    if (data.Onliners.length==0) {
      if (data.winner.length>=2) {
        setFirst(`IT'S A TIE –`);
      } else if (data.winner.includes(data.participants[0])&&data.winner.length==1) {
        setFirst(`WINNER IS ${data.participants[0]}`);
      } else {
        setFirst(`WINNER IS ${data.winner[1]}`);
      }
    } else {
      setFirst("ALL PLAYERS NEED TO FINISH");
    }
  }
    
  }, [
    data.winner,
    data.participants,
    data.Onliners
  ]);


  useEffect(() => {
    const handlePop = () => navigate("/categories", { replace: true });
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, [navigate]);




  /* ---------- UI --------- */
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-gray-200 px-4 py-10 pb-10">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-purple-500/5"></div>
      <div className="absolute md:top-20 md:left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="w-full max-w-4xl bg-slate-900/80 border-slate-800 backdrop-blur-sm rounded-2xl p-8 mb-10 ">
          <h1 className="text-3xl font-bold text-green-400 text-center mb-8">
            Code Clash Result
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Player 1 */}
            <div className="bg-slate-900/80 border-slate-800 backdrop-blur-sm p-6 rounded-xl border  ">
              <h3 className="text-green-400 text-xl font-semibold mb-2">
                Player 1: {data.participants[0]??'Loading...'}
              </h3>
              <p className="mb-1">Language: Javascript</p>
              <p className="mb-1">
                Time:10 min
              </p>
              <p className="mb-1">
                Status:{" "}
                {data.Onliners.includes(data.participants[0])
                  ? "WAITING FOR PLAYER 1 TO FINISH...."
                  : `Finished`}
              </p>
            </div>

            {/* Player 2 */}
            <div className="p-6 rounded-xl border bg-slate-900/80 border-slate-800 backdrop-blur-sm">
              <h3 className="text-green-400 text-xl font-semibold mb-2">
                Player 2: {data.participants[1]??'Loading...'}
              </h3>
              <p className="mb-1">Language: Javascript</p>
              <p className="mb-1">
                Time: 10 min
              </p>
              <p className="mb-1">
                Status:{" "}
                {data.Onliners.includes(data.participants[1])
                  ? "WAITING FOR PLAYER2 TO FINISH...."
                  : `Finished`}
              </p>
            </div>
          </div>

          <div className="bg-green-400/10 border border-green-400 text-green-300 font-semibold text-center py-4 px-6 rounded-xl text-lg">
            🏆{first}
          </div>

          {/* <Button
            className="mt-4 mx-auto cursor-pointer"
          >
            
          </Button> */}
          <Button size="lg" variant="outline" className="border-slate-700 bg-slate-700 text-white hover:bg-slate-800 mt-4"
            type="button"
            onClick={() => navigate("/categories")}

          >
              Back Dashboard
            </Button>
            
        </div>
      </div>

    </>
  );
};

export default Codeclashresult;
