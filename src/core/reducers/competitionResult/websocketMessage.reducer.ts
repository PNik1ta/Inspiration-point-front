import { createReducer, on } from "@ngrx/store";
import { CompetitionResultReceivedAction } from "./competitionResult.action";
import { ICompetitionResult } from "../../interfaces/competition-result.interface";

export interface CompetitionResultState {
  competitionResult: ICompetitionResult | null;
}

const initialState: CompetitionResultState = {
  competitionResult: null,
}

export const competitionResultReducer = createReducer(
  initialState,
  on(CompetitionResultReceivedAction, (state, { data }) => {
    return { ...state, competitionResult: data };
  })
)