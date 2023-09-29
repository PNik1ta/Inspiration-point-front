import { ICompetition } from "../../interfaces/competition.interface";
import { IGroup } from "../../interfaces/group.interface";
import { IFirstRoundViewRow } from "../../viewInterfaces/first-round/first-round-view-row.interface";
import { IFirstRoundView } from "../../viewInterfaces/first-round/first-round-view.interface";


export function constructFirstRoundViews(result: ICompetition, firstRoundRows: IFirstRoundViewRow[]): IFirstRoundView[] {
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