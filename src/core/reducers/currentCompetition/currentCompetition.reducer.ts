import { createReducer, on } from "@ngrx/store";
import { ICompetitionResult } from "../../interfaces/competition-result.interface";
import { CurrentCompetitionReceivedAction } from "./currentCompetition.action";

export interface CurrentCompetitionState {
  currentCompetition: ICompetitionResult | null;
}

const initialState: CurrentCompetitionState = {
  currentCompetition: null,
}

export const currentCompetitionReducer = createReducer(
  initialState,
  on(CurrentCompetitionReceivedAction, (state, { data }) => {
    return { ...state, currentCompetition: data };
  })
)