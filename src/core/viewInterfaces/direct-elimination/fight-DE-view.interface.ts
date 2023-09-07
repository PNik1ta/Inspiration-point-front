import { IParticipantDEView } from "./participant-DE-view.interface";

export interface IFightDEView {
  matchBr: number;
  leftParticipant: IParticipantDEView;
  rightParticipant: IParticipantDEView;
  leftParticipantNickname?: number;
  rightParticipantNickname?: number;
  leftRankBr?: number;
  rightRankBr?: number;
}