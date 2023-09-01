import { GroupResultStatus } from "../enums/group-result-status.enum";

export interface IBracketResult {
  _id?: string;
  nickname?: number;
  rankAfterBrackets?: number;
  status?: GroupResultStatus;
}