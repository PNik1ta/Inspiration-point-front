import { ICompetition } from "../../interfaces/competition.interface";
import { IAthAndGroupInitial } from "../../viewInterfaces/first-round/ath-and-group-initial.interface";

export function constructAthAndGroupInitials(result: ICompetition): IAthAndGroupInitial[] {
  const athAndGroupInitials: IAthAndGroupInitial[] = [];

  for (let groupInitial of result.groupsInitial) {
    const athAndGroupInitial: IAthAndGroupInitial = { ath: {}, groupInitial: {}, participantForm: {} };

    const ath = result.athList.find((ath) => ath.nickname === groupInitial.nickname);
    if (ath) {
      athAndGroupInitial.groupInitial = groupInitial;
      athAndGroupInitial.ath = ath;
    }

    athAndGroupInitial.participantForm = result.participantFormList.find((form) => form.nickname === athAndGroupInitial.ath.nickname) ?? {};
    athAndGroupInitials.push(athAndGroupInitial);
  }

  return athAndGroupInitials;
}