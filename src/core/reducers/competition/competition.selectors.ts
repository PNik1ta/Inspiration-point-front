import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CompetitionState } from "./competition.reducer";

const getCompetitionResultFeatureState = createFeatureSelector<CompetitionState>('competition');

export const getCompetitionResult = createSelector(
  getCompetitionResultFeatureState,
  state => state.competitions
);