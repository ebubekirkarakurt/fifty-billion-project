
export enum GameLevel {
  HUMAN = 1,
  CITY = 2,
  COUNTRY = 3,
  FUTURE = 4,
  FINAL = 5
}

export interface Project {
  id: string;
  name: string;
  cost: number;
  description: string;
  icon: string;
  comparison: string;
  level: GameLevel;
}

export interface ProjectHistory {
  projectId: string;
  name: string;
  cost: number;
  timestamp: number;
  level: GameLevel;
}

export interface GameState {
  balance: number;
  currentLevel: GameLevel;
  history: ProjectHistory[];
  isThinking: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
