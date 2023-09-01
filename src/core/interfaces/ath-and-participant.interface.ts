import { IAth } from "./ath.interface";
import { IParticipantForm } from "./participantForm.interface";

export interface IAthAndParticipant {
  ath: IAth;
  participant: IParticipantForm;
}