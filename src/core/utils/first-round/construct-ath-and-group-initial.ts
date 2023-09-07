import { ICompetitionResult } from "../../interfaces/competition-result.interface";
import { IAthAndGroupInitial } from "../../viewInterfaces/first-round/ath-and-group-initial.interface";

export function constructAthAndGroupInitials(result: ICompetitionResult): IAthAndGroupInitial[] {
  const athAndGroupInitials: IAthAndGroupInitial[] = [];

  for (let groupInitial of result.groupsInitial) {
    const athAndGroupInitial: IAthAndGroupInitial = { ath: {}, groupInitial: {}, participantForm: {} };

    for (let i = 0; i < result.athList.length; i++) {
      if (groupInitial.nickname === result.athList[i].nickname) {
        athAndGroupInitial.groupInitial = groupInitial;
        athAndGroupInitial.ath = result.athList[i];
        break;
      }
    }

    athAndGroupInitial.participantForm = result.participantFormList.find((form) => form.nickname === athAndGroupInitial.ath.nickname) ?? {};
    athAndGroupInitials.push(athAndGroupInitial);
  }

  return athAndGroupInitials;
}