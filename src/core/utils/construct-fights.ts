import { ICompetitionResult } from "../interfaces/competition-result.interface";
import { IInfo } from "../interfaces/info.interface";
import { IFightDEView } from "../viewInterfaces/direct-elimination/fight-DE-view.interface";

export function constructFights(lastInfos: IInfo[], currentCompetition: ICompetitionResult): IFightDEView[] {
  const fights: IFightDEView[] = [];
  for (let info of lastInfos) {
    let fight: IFightDEView = {
      matchBr: info.fightId ?? 0,
      leftParticipantNickname: info.nicknameLeft,
      rightParticipantNickname: info.nicknameRight,
      leftParticipant: { score: info.scoreLeft ?? 0, region: '', name: '', surname: '' },
      rightParticipant: { score: info.scoreRight ?? 0, region: '', name: '', surname: '' }
    };

    const participantLeft = currentCompetition?.participantFormList.find((participant) => participant.nickname === info.nicknameLeft);
    const participantRight = currentCompetition?.participantFormList.find((participant) => participant.nickname === info.nicknameRight);

    const bracketInitialLeft = currentCompetition?.bracketsInitial.find((bracket) => bracket.nickname === info.nicknameLeft);
    const bracketInitialRight = currentCompetition?.bracketsInitial.find((bracket) => bracket.nickname === info.nicknameRight);

    if (participantLeft) {
      fight.leftParticipant.name = participantLeft.name ?? '';
      fight.leftParticipant.surname = participantLeft.surname ?? '';
      fight.leftParticipant.region = participantLeft.region ?? '';
    }

    if (participantRight) {
      fight.rightParticipant.name = participantRight.name ?? '';
      fight.rightParticipant.surname = participantRight.surname ?? '';
      fight.rightParticipant.region = participantRight.region ?? '';
    }

    if (bracketInitialLeft) {
      fight.leftRankBr = bracketInitialLeft.rankBr;
    }

    if (bracketInitialRight) {
      fight.rightRankBr = bracketInitialRight.rankBr;
    }

    fights.push(fight);
  }

  return fights;
}