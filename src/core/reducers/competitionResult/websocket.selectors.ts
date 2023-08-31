import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CompetitionResultState } from "./websocketMessage.reducer";

const getCompetitionResultFeatureState = createFeatureSelector<CompetitionResultState>('competitionResult');

export const getCompetitionResult = createSelector(
  getCompetitionResultFeatureState,
  state => state.competitionResults
);