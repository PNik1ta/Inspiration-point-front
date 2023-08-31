import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CurrentCompetitionState } from "./currentCompetition.reducer";

const getCurrentCompetitionFeatureState = createFeatureSelector<CurrentCompetitionState>('currentCompetition');

export const getCurrentCompetition = createSelector(
  getCurrentCompetitionFeatureState,
  state => state.currentCompetition
);