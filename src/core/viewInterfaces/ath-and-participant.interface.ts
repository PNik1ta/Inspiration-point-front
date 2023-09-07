import { IAth } from "../interfaces/ath.interface";
import { IParticipantForm } from "../interfaces/participantForm.interface";

export interface IAthAndParticipant {
  ath: IAth;
  participant: IParticipantForm;
}