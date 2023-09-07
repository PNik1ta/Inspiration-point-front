import { ICompetitionResult } from "../interfaces/competition-result.interface";
import { IAthAndParticipant } from "../viewInterfaces/ath-and-participant.interface";

export function constructAthList(currentCompetition: ICompetitionResult): IAthAndParticipant[] {
  const totalAthList: IAthAndParticipant[] = [];

  for (let ath of currentCompetition!.athList) {
    for (let participant of currentCompetition!.participantFormList) {
      if (ath.nickname === participant.nickname) {
        let iAthAndParticipant: IAthAndParticipant = { ath, participant }
        totalAthList.push(iAthAndParticipant);
        break;
      }
    }
  }
  return totalAthList;
}