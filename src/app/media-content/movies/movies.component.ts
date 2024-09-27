import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from '../../model/model';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map, Subscription, catchError, of, Observable } from 'rxjs';
import { selectAllMovies, selectMoviesError, selectMoviesLoading } from '../../store/Movies/movies.selectors';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit, OnDestroy {

  moviesList: Movie[] = [];
  searchTerm = new BehaviorSubject<string>('');
  private subscription: Subscription = new Subscription();

  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private store: Store) {}

  ngOnInit() {
   this.loading$ = this.store.select(selectMoviesLoading);
   this.error$ = this.store.select(selectMoviesError);

    this.subscription.add(
      combineLatest([this.store.select(selectAllMovies), this.searchTerm]).pipe(
        map(([movies, term]) => 
          movies.filter(movie => 
            movie.category.toLowerCase() === 'movie' && 
            movie.title.toLowerCase().includes(term.toLowerCase())
          )
        ),
        catchError(err => {
          console.error('Error loading movies:', err);
          return of([]);
        })
      ).subscribe(filteredMovies => {
        this.moviesList = filteredMovies;
      })
    );
  }

  onSearch(term: string): void {
    this.searchTerm.next(term);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}