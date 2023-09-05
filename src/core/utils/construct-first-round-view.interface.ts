import { ICompetitionResult } from "../interfaces/competition-result.interface";
import { IFirstRoundViewRow } from "../viewInterfaces/first-round-view-row.interface";
import { IFirstRoundView } from "../viewInterfaces/first-round-view.interface";

export function ConstructFirstRoundViews(result: ICompetitionResult, firstRoundRows: IFirstRoundViewRow[]): IFirstRoundView[] {
  const firstRoundViews: IFirstRoundView[] = [];

  for (let group of result.groups) {
    const firstRoundView: IFirstRoundView = { group, firstRoundViewRows: [] }
    for (let row of firstRoundRows) {
      if (group.poolNumber === row.ath.groupInitial.poolNumber) {
        firstRoundView.firstRoundViewRows.push(row);
      }
    }
    firstRoundViews.push(firstRoundView);
  }

  return firstRoundViews;
}