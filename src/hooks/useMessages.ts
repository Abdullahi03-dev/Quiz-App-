import { useEffect } from "react";
import { DocumentData, collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import toast from "react-hot-toast";

const useRoomMessages = (roomCode: number, fieldName: string) => {
  useEffect(() => {
    if (!roomCode || !fieldName) return;

    const roomsRef = collection(db, "Rooms");
    const q = query(roomsRef, where("roomCode", "==", roomCode));

    const unsubscribe = onSnapshot(q, (docSnap) => {
      if (!docSnap.empty) return;

      const data = docSnap.docs[0].data() as DocumentData;
      const fieldValue = data?.[fieldName];

      if (typeof fieldValue === "string" && fieldValue.trim() !== "") {
        toast(fieldValue, { icon: "🚫", duration: 5000 });
      }
    });

    return () => unsubscribe();
  }, [roomCode, fieldName]);
};

export default useRoomMessages;