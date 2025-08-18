// import { addDoc, doc, getDoc, setDoc } from "firebase/firestore";
// import { db } from "../firebase/firebase"; // adjust path

// export async function ensureCompletedChallenges(userId: string) {
//   const userRef = doc(db, "users", userId);
//   const snap = await getDoc(userRef);

//   if (!snap.exists() || !snap.data()?.completedChallenges) {
//     await addDoc(userRef, {
//       completedChallenges: {
//         easy: [],
//         medium: [],
//         hard: []
//       },
//       completedLiveChallenges: {
//         easy: [],
//         medium: [],
//         hard: []
//       },
//       completedLocalQuiz: {
//         easy: [],
//         medium: [],
//         hard: []
//       }
//     }, { merge: true });
//     console.log("✅ completedChallenges field ensured");
//   }
// }

import { collection, doc, getDocs, query, updateDoc, where, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const ensureCompletedChallenges = async (username: string) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("name", "==", username));
    const snap = await getDocs(q);

    if (!snap.empty) {
      // Update existing user document
      const updates = snap.docs.map(async (docSnap) => {
        const ref = doc(db, "users", docSnap.id);

        await updateDoc(ref, {
          "completedLiveChallenges.javascript": [],
          "completedLiveChallenges.golang": [],
          "completedLiveChallenges.python": [],
          "completedLocalQuiz.easy": [],
          "completedLocalQuiz.medium": [],
          "completedLocalQuiz.hard": [],
          "completedChallenges.easy": [],
          "completedChallenges.medium": [],
          "completedChallenges.hard": []
        });
      });

      await Promise.all(updates);
      console.log("✅ Updated existing user document");
    } else {
      // Create a new user document if not found
      const newDocRef = doc(usersRef);
      await setDoc(newDocRef, {
        username,
        completedLiveChallenges: { easy: [], medium: [], hard: [] },
        completedLocalQuiz: { easy: [], medium: [], hard: [] },
        completedChallenges: { easy: [], medium: [], hard: [] }
      });
      console.log("✅ Created new user document");
    }
  } catch (error) {
    console.error("❌ Error updating Firestore:", error);
  }
};