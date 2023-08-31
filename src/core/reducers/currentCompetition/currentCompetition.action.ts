import { createAction, props } from "@ngrx/store";
import { ICompetitionResult } from "../../interfaces/competition-result.interface";

export const CurrentCompetitionReceivedAction = createAction(
  '[CurrentCompetition] Data Received',
  props<{ data: ICompetitionResult }>()
);