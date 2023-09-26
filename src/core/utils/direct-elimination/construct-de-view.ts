import { IBracketInitial } from "../../interfaces/bracketInitial.interface";
import { IDEView } from "../../viewInterfaces/direct-elimination/de-view.interface";
import { IFightDEView } from "../../viewInterfaces/direct-elimination/fight-DE-view.interface";

export function constructDEViews(bracketsInitial: IBracketInitial[]): IDEView[] {
  const views: IDEView[] = [];
  bracketsInitial = bracketsInitial.filter((bracket) => bracket.tableauBr && bracket.tableauBr[0] === 'A');
  console.log(bracketsInitial);

  bracketsInitial = bracketsInitial.filter((bracket) => bracket.nickname !== undefined && bracket.nickname >= 0);
  console.log(bracketsInitial);

  for (let bracket of bracketsInitial) {

    let view = views.find((view) => view.columnName === bracket.tableauBr);

    if (view) {
      const fight = view.fights.find((fight) => fight.matchBr === bracket.matchBr);

      if (fight) {
        fight.rightParticipantNickname = bracket.nickname;
        fight.rightRankBr = bracket.rankBr;
      } else {
        const fight: IFightDEView = { matchBr: bracket.matchBr ?? -1, leftParticipant: { name: '', surname: '', score: 0, region: '' }, rightParticipant: { name: '', surname: '', score: 0, region: '' } }
        fight.leftParticipantNickname = bracket.nickname;
        fight.leftRankBr = bracket.rankBr;
        view.fights.push(fight);
      }
    } else {

      const view: IDEView = { columnName: bracket.tableauBr ?? '', fights: [] }
      const fight: IFightDEView = { matchBr: bracket.matchBr ?? -1, leftParticipant: { name: '', surname: '', score: 0, region: '' }, rightParticipant: { name: '', surname: '', score: 0, region: '' } }
      fight.leftParticipantNickname = bracket.nickname;
      fight.leftRankBr = bracket.rankBr;
      view.fights.push(fight);
      views.push(view);
    }
  }
  return views;
}