import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map, Observable, catchError, of } from 'rxjs';
import { Movie } from '../../model/model';
import { selectAllMovies, selectMoviesLoading, selectMoviesError } from '../../store/Movies/movies.selectors';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  trendingMovies$!: Observable<Movie[]>;
  recommendedMovies$!: Observable<Movie[]>;
  searchTerm$ = new BehaviorSubject<string>('');

  noTrendingResults: boolean = false;
  noRecommendedResults: boolean = false;

  trendingCount: number = 0;
  recommendedCount: number = 0;
  searchInitiated: boolean = false;

  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    const allMovies$ = this.store.select(selectAllMovies);
    this.loading$ = this.store.select(selectMoviesLoading);
    this.error$ = this.store.select(selectMoviesError);

    this.trendingMovies$ = combineLatest([allMovies$, this.searchTerm$]).pipe(
      map(([movies, term]) => {
        const filtered = movies.filter(movie => 
          movie.isTrending && movie.title.toLowerCase().includes(term.toLowerCase())
        );
        this.noTrendingResults = filtered.length === 0;
        this.trendingCount = filtered.length;
        return filtered;
      }),
      catchError(error => {
        console.error('Error loading trending movies:', error);
        return of([]);
      })
    );

    this.recommendedMovies$ = combineLatest([allMovies$, this.searchTerm$]).pipe(
      map(([movies, term]) => {
        const filtered = movies.filter(movie => 
          !movie.isTrending && movie.title.toLowerCase().includes(term.toLowerCase())
        );
        this.noRecommendedResults = filtered.length === 0;
        this.recommendedCount = filtered.length;
        return filtered;
      }),
      catchError(error => {
        console.error('Error loading recommended movies:', error);
        return of([]);
      })
    );
  }

  onSearch(term: string): void {
    this.searchTerm$.next(term);
    this.searchInitiated = term.length > 0;
  }
}