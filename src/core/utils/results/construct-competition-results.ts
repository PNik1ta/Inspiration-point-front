import { ICompetition } from "../../interfaces/competition.interface";
import { ICompetitionResultAndParticipants } from "../../viewInterfaces/competition-result-and-participant.interface";

export function constructCompetitionResults({ competitionResults, participantFormList }: ICompetition): ICompetitionResultAndParticipants[] {
  const totalResults: ICompetitionResultAndParticipants[] = [];
  competitionResults = competitionResults.filter((res) => res.finalRank && res.finalRank > 0);
  for (let result of competitionResults) {
    const participant = participantFormList.find((participant) => participant.nickname === result.nickname);
    if (participant) {
      totalResults.push({ name: participant.name ?? '', surname: participant.surname ?? '', region: participant.region ?? '', rank: result.finalRank ?? 0 })
    }
  }
  return totalResults;
}