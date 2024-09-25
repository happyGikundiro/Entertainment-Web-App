import { createAction, props } from "@ngrx/store";
import { Movie } from "../../model/model";

export const loadMovies = createAction('[Movies] Load Movies');

export const loadMoviesSuccess = createAction(
    '[Movies] Load Movies Success', props<{movies: Movie[]}>()
);

export const loadMoviesFailure = createAction(
    '[Movies] Load Movies Failure', props<{error: string}>()
);