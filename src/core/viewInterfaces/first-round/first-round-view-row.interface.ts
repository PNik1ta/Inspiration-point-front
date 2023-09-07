import { IGroupResult } from "../../interfaces/groupResult.interface";
import { IAthAndGroupInitial } from "./ath-and-group-initial.interface";
import { IInfoViewFirstRound } from "../info-view-first-round.interface";

export interface IFirstRoundViewRow {
  ath: IAthAndGroupInitial;
  infoArray: IInfoViewFirstRound[];
  result: IGroupResult;
}