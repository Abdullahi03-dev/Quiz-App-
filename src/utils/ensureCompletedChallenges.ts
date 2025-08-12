import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase"; // adjust path

export async function ensureCompletedChallenges(userId: string) {
  const userRef = doc(db, "users", userId);
  const snap = await getDoc(userRef);

  if (!snap.exists() || !snap.data()?.completedChallenges) {
    await setDoc(userRef, {
      completedChallenges: {
        easy: [],
        medium: [],
        hard: []
      }
    }, { merge: true });
    console.log("✅ completedChallenges field ensured");
  }
}
