import { IGroupInitial } from "../interfaces/groupInitial.interface";
import { IGroupResult } from "../interfaces/groupResult.interface";
import { IParticipantForm } from "../interfaces/participantForm.interface";

export interface IParticipantAndGroup {
  participant: IParticipantForm;
  group: IGroupResult;
  groupInitial?: IGroupInitial;
}