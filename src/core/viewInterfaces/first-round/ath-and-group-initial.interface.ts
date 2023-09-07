import { IAth } from "../../interfaces/ath.interface";
import { IGroupInitial } from "../../interfaces/groupInitial.interface";
import { IParticipantForm } from "../../interfaces/participantForm.interface";


export interface IAthAndGroupInitial {
  groupInitial: IGroupInitial;
  ath: IAth;
  participantForm: IParticipantForm;
}