import { ICompetition } from "../../interfaces/competition.interface";
import { IDEView } from "../../viewInterfaces/direct-elimination/de-view.interface";

export function constructDEParticipantsInfo(view: IDEView, { participantFormList }: ICompetition): IDEView {
  for (let participant of participantFormList) {
    const fightParticipantLeft = view.fights.find((fight) => fight.leftParticipantNickname === participant.nickname);

    const fightParticipantRight = view.fights.find((fight) => fight.rightParticipantNickname === participant.nickname);

    if (fightParticipantLeft) {
      fightParticipantLeft.leftParticipant.name = participant.name ?? '';
      fightParticipantLeft.leftParticipant.surname = participant.surname ?? '';
      fightParticipantLeft.leftParticipant.region = participant.region ?? '';
    }

    if (fightParticipantRight) {
      fightParticipantRight.rightParticipant.name = participant.name ?? '';
      fightParticipantRight.rightParticipant.surname = participant.surname ?? '';
      fightParticipantRight.rightParticipant.region = participant.region ?? '';
    }
  }
  return view;
}