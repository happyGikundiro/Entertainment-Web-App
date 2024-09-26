import { createReducer, on } from "@ngrx/store";
import { Movie } from "../../model/model";
import * as MovieActions from './movies.actions'

export interface MovieState{
    movies: Movie[],
    loading: boolean,
    error: string | null
}

export const initialState: MovieState = {
    movies: [],
    loading: false,
    error: null
}

export const movieReducer = createReducer(
    initialState,

    on(MovieActions.loadMovies, (state) => ({...state, loading:true, error: null})),

    on(MovieActions.loadMoviesSuccess, (state, {movies}) => ({...state, movies: movies, loading:false, error:null})),

    on(MovieActions.toggleBookmark, (state, { movieId }) => ({
        ...state,
        movies: state.movies.map(movie =>
          movie.id === movieId
            ? { ...movie, isBookmarked: !movie.isBookmarked }
            : movie
        )
      }))
)