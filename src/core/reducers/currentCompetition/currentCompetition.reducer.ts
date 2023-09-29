import { createReducer, on } from "@ngrx/store";
import { ICompetition } from "../../interfaces/competition.interface";
import { CurrentCompetitionReceivedAction } from "./currentCompetition.action";

export interface CurrentCompetitionState {
  currentCompetition: ICompetition | null;
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