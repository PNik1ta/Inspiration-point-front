import { GroupResultStatus } from "../enums/group-result-status.enum";

export interface IGroupResult {
  _id?: string;
  nickname?: number; 
  coefficient?: number;
  indicator?: number;
  status?: GroupResultStatus;
  rankAfterPools?: number;
  bouts?: number;
  wins?: number;
  td?: number;
  tr?: number;
  placeInPool?: number;
}