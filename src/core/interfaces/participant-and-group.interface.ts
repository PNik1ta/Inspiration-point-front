import { IGroupResult } from "./groupResult.interface";
import { IParticipantForm } from "./participantForm.interface";

export interface IParticipantAndGroup {
  participant: IParticipantForm;
  group: IGroupResult;
}