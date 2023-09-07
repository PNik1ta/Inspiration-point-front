import { ICompetitionResult } from "../../interfaces/competition-result.interface";
import { IDEView } from "../../viewInterfaces/direct-elimination/de-view.interface";

export function constructDEParticipantsScore(view: IDEView, { info }: ICompetitionResult): IDEView {
  for (let item of info) {
    if (item.poulTab === view.columnName) {
      const fight = view.fights.find((fight) => fight.matchBr === item.match);

      if (fight && fight.leftParticipantNickname === item.nicknameLeft) {
        fight.leftParticipant.score = item.scoreLeft ?? 0;
      } else if (fight && fight.rightParticipantNickname === item.nicknameLeft) {
        fight.rightParticipant.score = item.scoreRight ?? 0;
      } else if (fight && fight.leftParticipantNickname === item.nicknameRight) {
        fight.leftParticipant.score = item.scoreRight ?? 0;
      } else if (fight && fight.rightParticipantNickname === item.nicknameRight){
        fight.rightParticipant.score = item.scoreRight ?? 0;
      }
    }
  }
  return view;
}