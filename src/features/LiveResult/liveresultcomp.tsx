import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import {useAutoDeleteLocalStorageOnLeave} from '../../hooks/usePageLocalStorage'
import { Unsubscribe,DocumentData, db,collection,
  query,
  where,
  onSnapshot,
   } from "../../firebase/firebase";        // ← adjust path if needed
import { Button } from "../../components/ui/button";

/* ---------- types ---------- */
interface RoomData {
  quizHasStarted: boolean;
  languageChoosed: string;
  questtionList: number;
  time: number;
  userOneJoined: boolean;
  userOneName: string;
  userOneOnline: boolean;
  userOneScore: number;
  userTwoJoined: boolean;
  userTwoName: string;
  userTwoOnline: boolean;
  userTwoScore: number;
}


/* ---------- component ---------- */
const LiveResult = () => {
  

  const navigate = useNavigate();

  /* initial state identical to your previous object  */
  const [data, setData] = useState<RoomData>({
    quizHasStarted: false,
    languageChoosed: "",
    questtionList: 0,
    time: 0,
    userOneJoined: false,
    userOneName: "",
    userOneOnline: true,
    userOneScore: 0,
    userTwoJoined: false,
    userTwoName: "",
    userTwoOnline: true,
    userTwoScore: 0,
  });

  const [first, setFirst] = useState("ALL PLAYERS NEED TO FINISH");

  /* ---------- Firestore realtime listener ---------- */
  const listenToRoom = (roomCode: number): Unsubscribe => {
    const roomsRef = collection(db, "Rooms");
    const q = query(roomsRef, where("roomCode", "==", roomCode));
    const unsub= onSnapshot(q, (snap) => {
console.log('snapshot fired:',snap.empty?'no documents':'gotten data')

      if (!snap.empty) {
        const docData = snap.docs[0].data() as DocumentData;
        console.log('Room data',docData)

        setData((prev) => ({
          ...prev,
          /* bring in only the fields you store in Firestore */
          languageChoosed : docData.languageChoosed,
          questtionList   : docData.questtionList,
          time            : docData.time,
          userOneName     : docData.userOneName,
          userTwoName     : docData.userTwoName,
          userOneScore    : docData.userOneScore,
          userTwoScore    : docData.userTwoScore,
          userOneOnline   : docData.userOneOnline,
          userTwoOnline   : docData.userTwoOnline,
        }));
      } else {
        console.error("Room not found");
      }
    });

    return unsub
  };

  useEffect(()=>{
    const saved1=localStorage.getItem('resultCode');
     if(saved1!==null){
         localStorage.removeItem('resultCode')
         return
     }
     },[])
useEffect(()=>{
  const handlepop=()=>{
    navigate('/categories')
  }
  window.addEventListener('popstate',handlepop)
  return()=>{
    window.removeEventListener('popstate',handlepop)
  }
},[navigate])
  /* ---------- mount: attach listener ---------- */
  useEffect(() => {
    const saved = localStorage.getItem("resultCode");
    if (!saved) return;
    const unsub = listenToRoom(parseInt(saved));
    return () => unsub();               // cleanup
  }, []);                                // run once
   
  /* ---------- derive winner banner ---------- */
  useEffect(() => {
    if (!data.userOneOnline && !data.userTwoOnline) {
      if (data.userOneScore === data.userTwoScore) {
        setFirst(`IT'S A TIE – both scored ${data.userOneScore}`);
      } else if (data.userOneScore > data.userTwoScore) {
        setFirst(`WINNER IS ${data.userOneName} score is ${data.userOneScore}`);
      } else {
        setFirst(`WINNER IS ${data.userTwoName} score is ${data.userTwoScore}`);
      }
    } else {
      setFirst("ALL PLAYERS NEED TO FINISH");
    }
  }, [
    data.userOneOnline,
    data.userTwoOnline,
    data.userOneScore,
    data.userTwoScore,
    data.userOneName,
    data.userTwoName,
  ]);
  // useAutoDeleteLocalStorageOnLeave('Roomcode')


  /* ---------- block back-button to dashboard ---------- */
  useEffect(() => {
    const handlePop = () => navigate("/categories", { replace: true });
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, [navigate]);

  /* ---------- purge localStorage on first render ---------- */
  useEffect(() => {
    ["LiveQuizState", "HasQuizStart"].forEach((key) =>
      localStorage.removeItem(key)
    );
  }, []);

  /* ---------- UI --------- */
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-gray-200 px-4 py-10 pb-10">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-purple-500/5"></div>
      <div className="absolute md:top-20 md:left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="w-full max-w-4xl bg-slate-900/80 border-slate-800 backdrop-blur-sm rounded-2xl p-8 mb-10 ">
          <h1 className="text-3xl font-bold text-green-400 text-center mb-8">
            Multiplayer Quiz Result
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Player 1 */}
            <div className="bg-slate-900/80 border-slate-800 backdrop-blur-sm p-6 rounded-xl border  ">
              <h3 className="text-green-400 text-xl font-semibold mb-2">
                Player 1: {data.userOneName}
              </h3>
              <p className="mb-1">Language: {data.languageChoosed}</p>
              <p className="mb-1">
                Time:{" "}
                {`${Math.floor(data.time / 60)} min : ${String(
                  data.time % 60
                ).padStart(2, "0")}`}
              </p>
              <p className="mb-1">
                Score:{" "}
                {data.userOneOnline
                  ? "WAITING FOR PLAYER 1 TO FINISH...."
                  : `${data.userOneScore}`}
              </p>
            </div>

            {/* Player 2 */}
            <div className="p-6 rounded-xl border bg-slate-900/80 border-slate-800 backdrop-blur-sm">
              <h3 className="text-green-400 text-xl font-semibold mb-2">
                Player 2: {data.userTwoName}
              </h3>
              <p className="mb-1">Language: {data.languageChoosed}</p>
              <p className="mb-1">
                Time:{" "}
                {`${Math.floor(data.time / 60)} min : ${String(
                  data.time % 60
                ).padStart(2, "0")}`}
              </p>
              <p className="mb-1">
                Score:{" "}
                {data.userTwoOnline
                  ? "WAITING FOR PLAYER2 TO FINISH...."
                  : `${data.userTwoScore}`}
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

export default LiveResult;
