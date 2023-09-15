import { ICompetitionResult } from "../interfaces/competition-result.interface";
import { IAthAndParticipant } from "../viewInterfaces/ath-and-participant.interface";

export function constructAthList(currentCompetition: ICompetitionResult): IAthAndParticipant[] {
  const totalAthList: IAthAndParticipant[] = [];

  for (let ath of currentCompetition!.athList) {
    const participant = currentCompetition.participantFormList.find((participant) => participant.nickname === ath.nickname);

    if (participant) {
      let iAthAndParticipant: IAthAndParticipant = { ath, participant };
      totalAthList.push(iAthAndParticipant);
    }
  }
  return totalAthList;
}