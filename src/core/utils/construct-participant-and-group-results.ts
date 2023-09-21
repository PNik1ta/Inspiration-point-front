import { ICompetitionResult } from "../interfaces/competition-result.interface";
import { IParticipantAndGroup } from "../viewInterfaces/participant-and-group.interface";

export function constructParticipantAndGroupResults({ participantFormList, groupsResults }: ICompetitionResult): IParticipantAndGroup[] {
  const participantsAndGroups: IParticipantAndGroup[] = [];

  for (let res of groupsResults) {
    const participantAndGroup: IParticipantAndGroup = { participant: {}, group: {} };

    const participant = participantFormList.find((participant) => participant.nickname === res.nickname);
    if (participant) {
      participantAndGroup.group = res;
      participantAndGroup.participant = participant;
      participantsAndGroups.push(participantAndGroup);
    }
  }
  return participantsAndGroups;
}