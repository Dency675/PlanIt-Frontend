export interface OverviewComponentDataResponse {
  totalCount: number;
  completeStoryCount: number;
  incompleteUserStoryCount: number;
  participantCount: number;
}

export interface SessionDetailsResponse {
  sessionTitle: string;
  productOwnerName: string;
  projectManagerName: string;
  createDateTime: string;
  estimationName: string;
  scrumMasterName: string;
  participantCount: number;
}
export interface SessionDetailsResponsesData {
  data: SessionDetailsResponse;
}

export interface SessionDetailsResponsesParent {
  sessionData: SessionDetailsResponsesData;
}

export interface BarChartComponentResponse {
  userStoryId: number;
  storyPointResult: number;
}
export interface BarChartComponentResponsesData {
  data: BarChartComponentResponse;
}

export interface BarChartComponentResponsesParent {
  barChartData: BarChartComponentResponsesData;
}

export interface ParticipantDataListResponse {
  userName: string;
}

export interface ParticipantDataListResponsesData {
  data: ParticipantDataListResponse;
}

export interface ParticipantDataListResponsesParent {
  participantData: ParticipantDataListResponsesData;
}
