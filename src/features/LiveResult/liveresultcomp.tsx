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

        /* one clean state update instead of many */
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

  /* ---------- mount: attach listener ---------- */
  useEffect(() => {
    const saved = localStorage.getItem("Roomcode");
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
      <div className="min-h-screen flex items-center justify-center bg-[#121212] text-gray-200 px-4 py-10 pb-10">
        <div className="w-full max-w-4xl bg-[#1e1e1e] rounded-2xl shadow-xl shadow-green-500/10 p-8 mb-10">
          <h1 className="text-3xl font-bold text-green-400 text-center mb-8">
            Multiplayer Quiz Result
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Player 1 */}
            <div className="bg-[#2a2a2a] p-6 rounded-xl border border-gray-700">
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
                  : `${data.userOneScore}/${data.questtionList}`}
              </p>
            </div>

            {/* Player 2 */}
            <div className="bg-[#2a2a2a] p-6 rounded-xl border border-gray-700">
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
                  : `${data.userTwoScore}/${data.questtionList}`}
              </p>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-400 text-green-300 font-semibold text-center py-4 px-6 rounded-xl text-lg">
            🏆{first}
          </div>

          <Button
            type="button"
            className="mt-4 mx-auto cursor-pointer"
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