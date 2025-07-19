import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  collection, query, where, getDocs } from "firebase/firestore";
import toast from 'react-hot-toast';
import { db } from '../firebase/firebase';

const useCheckRoomStatus = (userKey: "userOneOnline" | "userTwoOnline") => {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState<boolean | null>(null); // null means still checking

  useEffect(() => {
    const checkUserStatus = async () => {
      const roomCode = localStorage.getItem("Roomcode");

      if (!roomCode) {
        toast.error("No Room Code found.");
        navigate("/categories");
        return;
      }

      try {
        const q = query(collection(db, "Rooms"), where("roomCode", "==", Number(roomCode)));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const roomData = querySnapshot.docs[0].data();
          const isOnline = roomData[userKey]; // 👈 dynamic key

          if (!isOnline) {
            toast.error("You are disqualified or offline.");
            navigate("/categories");
          } else {
            setAllowed(true);
          }
        } else {
          toast.error("Room not found.");
          navigate("/categories");
        }
      } catch (err) {
        console.error("Error verifying user online status:", err);
        toast.error("Error occurred. Try again.");
        navigate("/categories");
      }
    };

    checkUserStatus();
  }, [navigate, userKey]);

  return allowed;
};

export default useCheckRoomStatus;