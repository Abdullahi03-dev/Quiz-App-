import { useEffect} from 'react';
import { db } from '../firebase/firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  DocumentData
} from "../firebase/firebase";;
import { toast } from 'react-hot-toast';


const useRoomMessages = (roomCode: number, userKey: 'user1' | 'user2') => {
  useEffect(() => {

    const roomQuery = query(collection(db, 'rooms'), where('roomCode', '==', roomCode));

    const unsubscribe = onSnapshot(roomQuery, (querySnapshot) => {
      if (querySnapshot.empty) return;

      const roomDoc = querySnapshot.docs[0];
      const roomDocId = roomDoc.id;

      const roomRef = doc(db, 'rooms', roomDocId);

      const unsubDoc = onSnapshot(roomRef, (docSnap) => {
        if (!docSnap.exists()) return;

        const data = docSnap.data() as DocumentData;

       const otherUserKey=userKey==='user1'?'user2Messages':'user1Messages'

       const message=data[otherUserKey];
       if(message){
        toast.error(message)
       }
      });

      // Cleanup the inner listener when outer changes
      return () => unsubDoc();
    });

    return () => unsubscribe();
  }, [roomCode, userKey]);
};

export default useRoomMessages;