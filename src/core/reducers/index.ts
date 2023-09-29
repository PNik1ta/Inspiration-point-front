import { ActionReducerMap } from "@ngrx/store";
import { CompetitionState, competitionReducer } from "./competition/competition.reducer";
import { CurrentCompetitionState, currentCompetitionReducer } from "./currentCompetition/currentCompetition.reducer";

export interface State {
  competition: CompetitionState,
  currentCompetition: CurrentCompetitionState
}

export const reducers: ActionReducerMap<State> = {
  competition: competitionReducer,
  currentCompetition: currentCompetitionReducer
};