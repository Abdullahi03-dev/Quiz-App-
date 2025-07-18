import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const useCheckRoomStatus = () => {
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    const checkRoom = async () => {
      const roomCode = localStorage.getItem('roomCode');
      if (!roomCode) return;

      const q = query(collection(db, 'Rooms'), where('roomCode', '==', roomCode));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();

        const userOneOnline = docData.player1Online;
        const userTwoOnline = docData.player2Online;

        if (
          (userOneOnline === false && userTwoOnline === false)
        ) {
          navigate('/categories'); // replace with your actual route
        }
      }
    };

    checkRoom();
  }, []);
};

export default useCheckRoomStatus;