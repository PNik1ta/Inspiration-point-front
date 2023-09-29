import { IGroup } from "../../interfaces/group.interface";
import { IGroupInitial } from "../../interfaces/groupInitial.interface";
import { IFirstRoundViewRow } from "./first-round-view-row.interface";

export interface IFirstRoundView {
  group: IGroup;
  firstRoundViewRows: IFirstRoundViewRow[];
}