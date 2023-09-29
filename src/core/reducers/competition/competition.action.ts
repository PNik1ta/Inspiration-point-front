import { createAction, props } from "@ngrx/store";
import { ICompetition } from "../../interfaces/competition.interface";

export const CompetitionReceivedAction = createAction(
  '[Competition] Data Received',
  props<{ data: ICompetition[] }>()
);