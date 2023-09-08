import { ICompetitionResult } from "../../interfaces/competition-result.interface";
import { IBracketResultAndParticipant } from "../../viewInterfaces/bracket-result-and-participant.interface";

export function constructBracketResults({ bracketsResults, participantFormList }: ICompetitionResult): IBracketResultAndParticipant[] {
  const totalResults: IBracketResultAndParticipant[] = [];
  for (let result of bracketsResults) {
    const participant = participantFormList.find((participant) => participant.nickname === result.nickname);
    if (participant) {
      totalResults.push({ name: participant.name ?? '', surname: participant.surname ?? '', region: participant.region ?? '', rank: result.rankAfterBrackets ?? 0 })
    }
  }
  return totalResults;
}