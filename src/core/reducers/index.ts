import { ActionReducerMap } from "@ngrx/store";
import { CompetitionResultState, competitionResultReducer } from "./competitionResult/websocketMessage.reducer";
import { CurrentCompetitionState, currentCompetitionReducer } from "./currentCompetition/currentCompetition.reducer";

export interface State {
  competitionResult: CompetitionResultState,
  currentCompetition: CurrentCompetitionState
}

export const reducers: ActionReducerMap<State> = {
  competitionResult: competitionResultReducer,
  currentCompetition: currentCompetitionReducer
};