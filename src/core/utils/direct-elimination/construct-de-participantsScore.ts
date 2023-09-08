import { ICompetitionResult } from "../../interfaces/competition-result.interface";
import { IInfo } from "../../interfaces/info.interface";
import { IDEView } from "../../viewInterfaces/direct-elimination/de-view.interface";

export function constructDEParticipantsScore(view: IDEView, info: IInfo[]): IDEView {
  for (let item of info) {
    if (item.poulTab === view.columnName) {
      const fight = view.fights.find((fight) => fight.matchBr === item.fightId);
      if (fight && fight.leftParticipantNickname === item.nicknameLeft) {
        fight.leftParticipant.score = item.scoreLeft ?? 0;
      }  if (fight && fight.rightParticipantNickname === item.nicknameLeft) {
        fight.rightParticipant.score = item.scoreRight ?? 0;
      }  if (fight && fight.leftParticipantNickname === item.nicknameRight) {
        fight.leftParticipant.score = item.scoreRight ?? 0;
      }  if (fight && fight.rightParticipantNickname === item.nicknameRight){
        fight.rightParticipant.score = item.scoreRight ?? 0;
      }
    }
  }
  return view;
}
