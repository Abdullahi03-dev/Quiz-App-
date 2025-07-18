import { useEffect, useRef } from 'react';
import { db } from '../firebase/firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  DocumentData
} from "../firebase/firebase";;
import { toast } from 'react-hot-toast';

type Message = {
  text: string;
  sender: string;
  timestamp: string;
  type?: string;
};

const useRoomMessages = (roomCode: number, userKey: 'user1' | 'user2') => {
  const messageCount = useRef(0);
getDoc
  useEffect(() => {
    // Step 1: Find the document ID with roomCode
    const roomQuery = query(collection(db, 'rooms'), where('roomCode', '==', roomCode));

    const unsubscribe = onSnapshot(roomQuery, (querySnapshot) => {
      if (querySnapshot.empty) return;

      const roomDoc = querySnapshot.docs[0];
      const roomDocId = roomDoc.id;

      // Step 2: Now listen to that document by ID
      const roomRef = doc(db, 'rooms', roomDocId);

      const unsubDoc = onSnapshot(roomRef, (docSnap) => {
        if (!docSnap.exists()) return;

        const data = docSnap.data() as DocumentData;
        const user1Messages = data.messages?.user1 || [];
        const user2Messages = data.messages?.user2 || [];
        const allMessages = [...user1Messages, ...user2Messages];

        if (messageCount.current === 0) {
          messageCount.current = allMessages.length;
          return;
        }

        if (allMessages.length > messageCount.current) {
          const newOnes = allMessages.slice(messageCount.current);
          messageCount.current = allMessages.length;

          newOnes.forEach((msg: Message) => {
            if (msg.sender !== userKey) {
              toast(` ${msg.text}`);
            }
          });
        }
      });

      // Cleanup the inner listener when outer changes
      return () => unsubDoc();
    });

    return () => unsubscribe();
  }, [roomCode, userKey]);
};

export default useRoomMessages;