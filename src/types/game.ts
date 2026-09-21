export type Category = 'science' | 'history' | 'culture';

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert';

export interface Question {
  id: string;
  text: string;
  category: Category;
  difficulty: DifficultyLevel;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface AnimalMascot {
  id: string;
  name: string;
  species: string;
  emoji: string;
  title: string;
  trait: string;
  pullStyle: string;
  tagline: string;
  accentColor: string;
  bgGradient: string;
}

export interface Team {
  id: 'red' | 'blue';
  name: string;
  color: string;
  accentColor: string;
  mascot: AnimalMascot;
  roundsWon: number;
  currentDifficulty: DifficultyLevel;
  totalCorrect: number;
  totalAnswered: number;
  fastestAnswerTime: number | null; // seconds
}

export type GameMode = 'turn_based' | 'simultaneous';

export type OpponentMode = 'pvp' | 'ai'; // 'pvp' = Chơi với người, 'ai' = Chơi với máy

export type BotDifficulty = 'easy' | 'medium' | 'hard' | 'expert';

export type GameStatus = 'menu' | 'playing' | 'round_end' | 'match_end' | 'paused';

export interface RoundResult {
  roundNumber: number;
  winnerId: 'red' | 'blue' | 'draw';
  winnerName: string;
  finalRopePosition: number;
  redCorrect: number;
  blueCorrect: number;
  difficultyUpgradedTeam?: 'red' | 'blue' | 'both';
  newDifficultyLevel?: DifficultyLevel;
}

export interface GameSettings {
  questionTimeLimit: number; // in seconds (e.g., 15)
  roundTimeLimit: number; // in seconds (e.g., 90, 0 = unlimited until rope pulled across boundary)
  maxRounds: number; // e.g., 3 (first to 2) or 5 (first to 3)
  winRopeThreshold: number; // rope position threshold, e.g. 40 (out of 50)
  pullPowerPerAnswer: number; // units of rope pull per correct answer (e.g. 12)
  categories: Category[];
  soundEnabled: boolean;
  gameMode: GameMode;
  opponentMode: OpponentMode;
  botDifficulty: BotDifficulty;
}
