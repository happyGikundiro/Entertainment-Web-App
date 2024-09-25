import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as MovieActions from './movies.actions';
import { catchError, map, mergeMap, of } from "rxjs";
import { Movie } from "../../model/model";

@Injectable()
export class MovieEffects{

    constructor(private actions$: Actions,private http: HttpClient){}

    loadMovies$ = createEffect(()=>
        this.actions$.pipe(
            ofType(MovieActions.loadMovies),
            mergeMap(() =>
                this.http.get<Movie[]>('data.json').pipe(
                    map((movies)=> MovieActions.loadMoviesSuccess({ movies })),
                    catchError((error)=>
                        of(MovieActions.loadMoviesFailure({error:error.message}))
                    )
                )
            )
        )
    )
}