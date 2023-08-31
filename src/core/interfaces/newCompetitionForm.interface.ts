export interface INewCompetitionForm {
  _id?: string;
  competitionId: string;
  competitionName?: string;
  organizerCompany?: string;
  organizerContact?: string;
  competitionPlace?: string;
  dateTimeCompetitionStart?: string;
  dateTimeRegistrationClose?: string;
  competitionType?: string;
  weapon?: string;
  gender?: string;
  preliminaryFormulae?: string;
  ageCategory?: string;
  payment?: string;
  description?: string;
  imageLink?: string;
}