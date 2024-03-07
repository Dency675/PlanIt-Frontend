export enum GameType {
  Fibonacci = "Fibonacci",
  ShortFibonacci = "ShortFibonacci",
  TShirt = "TShirt",
  TShirtAndNumber = "TShirtAndNumber",
  Custom = "Custom",
}

export interface CommentBoxProps {
  selectedUserStoryId: number;
  setScore: React.Dispatch<React.SetStateAction<string>>;
  setCommentValue: React.Dispatch<React.SetStateAction<string>>;
  commentValue: string;
  score: string;
}

export interface CustomButtonGroupProps {
  onStartTimer: () => void;
  stopTimer: () => void;
  isUserStrorySelected: boolean;
  sessionId: string;
  setIsUserStrorySelected: React.Dispatch<React.SetStateAction<boolean>>;
  setIsStartButtonStarted: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUserStoryId: number;
  commentValue: string;
  score: string;
  setScore: React.Dispatch<React.SetStateAction<string>>;
  setCommentValue: React.Dispatch<React.SetStateAction<string>>;
  setIsUserStorySelectEnable: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface userStoryType {
  roundNumber: number;
  storyPointResult: number;
  userStory: string;
  userStoryId: string;
  userStoryMappingId: string;
}

export interface selectedUserStoryType {
  selectedUserStoryId: number;
  userStoryList: userStoryType[];
}

export interface propType {
  userId: string;
  sessionId: string;
  scrumMasterId: string;
  timer: string;
  estimationId: number;
  teamId: number;
  setCurrentUserStoryId: React.Dispatch<React.SetStateAction<number>>;
}

export interface userStoryType {
  roundNumber: number;
  storyPointResult: number;
  userStory: string;
  userStoryId: string;
  userStoryMappingId: string;
}

export interface PieChartResultPropType {
  scoreCounts: { [key: string]: number };
  score: { [key: string]: string };
}

export interface ResultTablePropType {
  sessionId: string;
  currentUserStoryId: number;
}

export interface Participant {
  name: string;
  status: boolean;
  teamMemberId: string;
}

export interface UserData {
  userName: string;
  roleId: number;
  teamMemberId: number;
  status: boolean;
}

export interface UserDataWithScore {
  userName: string;
  roleId: number;
  teamMemberId: number;
  score: {
    userStorySessionMappingId: number;
    storyPoint: string;
  }[];
}

export interface ResultTableBoxPropType {
  sessionId: string;
  currentUserStoryId: number;
  setScoreCounts: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
  setScore: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

export interface TimerProps {
  isRunning: boolean;
  timer: string;
}

export interface sessionIdType {
  sessionId: string;
  setSelectedUserStoryId: React.Dispatch<React.SetStateAction<number>>;
  userStoryList: userStoryType[];
  isUserStorySelectEnable: boolean;
}

export interface votingCardsPropType {
  estimationId: number;
  selectedUserStoryId: number;
  teamId: number;
  sessionId: string;
}

export interface scaleDataProps {
  scaleName: string;
  scaleValue: number;
}

export interface AddParticipantScoresRequest {
  teamMemberId: string;
  userStorySessionMappingId: number;
  storyPoint: string;
}
