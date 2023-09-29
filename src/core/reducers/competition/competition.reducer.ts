import { createReducer, on } from "@ngrx/store";
import { CompetitionReceivedAction } from "./competition.action";
import { ICompetition } from "../../interfaces/competition.interface";

export interface CompetitionState {
  competitions: ICompetition[] | null;
}

const initialState: CompetitionState = {
  competitions: null,
}

export const competitionReducer = createReducer(
  initialState,
  on(CompetitionReceivedAction, (state, { data }) => {
    return { ...state, competitions: data };
  })
)