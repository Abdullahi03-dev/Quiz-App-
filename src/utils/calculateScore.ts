export type Difficulty = "easy" | "medium" | "hard";

/**
 * Calculates the raw score of a quiz attempt (max 600).
 */
export function calculateFinalScore(
  correctAnswers: number,
  totalQuestions: number,
  difficulty: Difficulty
): number {
  if (totalQuestions === 0) return 0;

  const difficultyMultiplierMap: Record<Difficulty, number> = {
    easy: 0.5,
    medium: 1.0,
    hard: 1.5,
  };

  const baseScore = (correctAnswers / totalQuestions) * 50;
  const adjustedScore = baseScore * difficultyMultiplierMap[difficulty];

  return Math.round(Math.min(600, adjustedScore)); // cap score to 600
}