import { ICompetition } from "../interfaces/competition.interface";
import { IParticipantAndGroup } from "../viewInterfaces/participant-and-group.interface";

export function constructParticipantAndGroupResults({ participantFormList, groupsResults }: ICompetition): IParticipantAndGroup[] {
  const participantsAndGroups: IParticipantAndGroup[] = [];
  const filteredGroups = groupsResults.filter((result) => result.nickname !== undefined && result.nickname >= 0);

  for (let res of filteredGroups) {
    const participantAndGroup: IParticipantAndGroup = { participant: {}, group: {} };

    const participant = participantFormList.find((participant) => participant.nickname === res.nickname);
    if (participant && participant.nickname !== undefined && participant.nickname >= 0) {
      participantAndGroup.group = res;
      participantAndGroup.participant = participant;
      participantsAndGroups.push(participantAndGroup);
    }
  }
  return participantsAndGroups;
}