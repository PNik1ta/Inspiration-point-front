import { IAth } from "../interfaces/ath.interface";
import { IBracketInitial } from "../interfaces/bracketInitial.interface";
import { IBracketResult } from "../interfaces/bracketResult.interface";
import { IFormulae } from "../interfaces/formular.interface";
import { IGroupInitial } from "../interfaces/groupInitial.interface";
import { IGroupResult } from "../interfaces/groupResult.interface";
import { IInfo } from "../interfaces/info.interface";
import { INewCompetitionForm } from "../interfaces/newCompetitionForm.interface";
import { IParticipantForm } from "../interfaces/participantForm.interface";
import { IRef } from "../interfaces/ref.interface";


export interface UpdateCompetitionResultDto {
  newCompetitionForm: INewCompetitionForm;
  participantFormList: IParticipantForm[];
  athList: IAth[];
  refList: IRef[];
  formulae: IFormulae;
  groupsInitial: IGroupInitial[];
  groupsResults: IGroupResult[];
  bracketsInitial: IBracketInitial[];
  bracketsResults: IBracketResult[];
  info: IInfo[];
}