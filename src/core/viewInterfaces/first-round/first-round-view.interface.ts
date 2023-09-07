import { IGroup } from "../../interfaces/group.interface";
import { IFirstRoundViewRow } from "./first-round-view-row.interface";

export interface IFirstRoundView {
  group: IGroup;
  firstRoundViewRows: IFirstRoundViewRow[];
}