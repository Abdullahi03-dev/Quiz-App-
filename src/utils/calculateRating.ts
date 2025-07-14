// import { Difficulty } from "./calculateScore";

// /**
//  * Calculates the rating gain/loss based on quiz performance.
//  */
// export function calculateRatingChange(
//   quizScore: number,
//   difficulty: Difficulty,
//   currentRating: number
// ): number {
//   const baseGainMap: Record<Difficulty, number> = {
//     easy: 10,
//     medium: 15,
//     hard: 25,
//   };

//   const performance = quizScore / 600; // max quizScore is 600
//   const baseGain = baseGainMap[difficulty];

//   const ratingChange = performance * baseGain;

//   return Math.round(ratingChange); // could be 0 to 25 (hard)
// }