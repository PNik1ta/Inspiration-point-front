import { createAction, props } from "@ngrx/store";
import { ICompetitionResult } from "../../interfaces/competition-result.interface";

export const CompetitionResultReceivedAction = createAction(
  '[CompetitionResult] Data Received',
  props<{ data: ICompetitionResult }>()
);