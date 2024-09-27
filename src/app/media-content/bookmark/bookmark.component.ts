
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllMovies, selectMoviesError, selectMoviesLoading } from '../../store/Movies/movies.selectors';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.css'
})
export class BookmarkComponent implements OnInit{
  searchTerm = new BehaviorSubject<string>('');
  searchTermValue: string = '';

  movies$ = this.store.select(selectAllMovies);

  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectMoviesLoading);
    this.error$ = this.store.select(selectMoviesError);
  }

  filteredBookmarkedMovies$ = combineLatest([this.movies$, this.searchTerm]).pipe(
    map(([movies, term]) => {
      this.searchTermValue = term;
      const searchTermLower = term.toLowerCase();

      return movies.filter(movie =>
        movie.isBookmarked === true &&
        movie.category.toLowerCase() === 'movie' &&
        movie.title.toLowerCase().includes(searchTermLower)
      );
    })
  );

  filteredBookmarkedTvSeries$ = combineLatest([this.movies$, this.searchTerm]).pipe(
    map(([movies, term]) => {
      const searchTermLower = term.toLowerCase();

      return movies.filter(movie =>
        movie.isBookmarked === true &&
        movie.category.toLowerCase() === 'tv series' &&
        movie.title.toLowerCase().includes(searchTermLower)
      );
    })
  );

  onSearch(term: string) {
    this.searchTerm.next(term);
  }
}