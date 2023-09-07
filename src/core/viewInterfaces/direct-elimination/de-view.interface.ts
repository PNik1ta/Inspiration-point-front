import { IFightDEView } from "./fight-DE-view.interface";

export interface IDEView {
  columnName: string;
  fights: IFightDEView[];
}