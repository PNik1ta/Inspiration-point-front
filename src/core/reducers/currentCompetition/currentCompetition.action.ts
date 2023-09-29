import { createAction, props } from "@ngrx/store";
import { ICompetition } from "../../interfaces/competition.interface";

export const CurrentCompetitionReceivedAction = createAction(
  '[CurrentCompetition] Data Received',
  props<{ data: ICompetition }>()
);