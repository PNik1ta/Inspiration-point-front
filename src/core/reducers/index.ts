import { ActionReducerMap } from "@ngrx/store";
import { CompetitionResultState, competitionResultReducer } from "./competitionResult/websocketMessage.reducer";

export interface State {
  competitionResult: CompetitionResultState
}

export const reducers: ActionReducerMap<State> = {
  competitionResult: competitionResultReducer
};