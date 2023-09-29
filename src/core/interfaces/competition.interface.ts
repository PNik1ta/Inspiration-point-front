import { IAth } from "./ath.interface";
import { IBracketInitial } from "./bracketInitial.interface";
import { IBracketResult } from "./bracketResult.interface";
import { ICompetitionResult } from "./competition-result.interface";
import { IFormulae } from "./formular.interface";
import { IGroup } from "./group.interface";
import { IGroupInitial } from "./groupInitial.interface";
import { IGroupResult } from "./groupResult.interface";
import { IInfo } from "./info.interface";
import { INewCompetitionForm } from "./newCompetitionForm.interface";
import { IParticipantForm } from "./participantForm.interface";
import { IRef } from "./ref.interface";

export interface ICompetition {
  _id?: string;
  newCompetitionForm: INewCompetitionForm;
  participantFormList: IParticipantForm[];
  groups: IGroup[]
  athList: IAth[];
  refList: IRef[];
  formulae: IFormulae;
  groupsInitial: IGroupInitial[];
  groupsResults: IGroupResult[];
  bracketsInitial: IBracketInitial[];
  bracketsResults: IBracketResult[];
  info: IInfo[];
  competitionResults: ICompetitionResult[];
}