import { createReducer, on } from "@ngrx/store";
import { CompetitionResultReceivedAction } from "./competitionResult.action";
import { ICompetitionResult } from "../../interfaces/competition-result.interface";

export interface CompetitionResultState {
  competitionResults: ICompetitionResult[] | null;
}

const initialState: CompetitionResultState = {
  competitionResults: null,
}

export const competitionResultReducer = createReducer(
  initialState,
  on(CompetitionResultReceivedAction, (state, { data }) => {
    return { ...state, competitionResults: data };
  })
)