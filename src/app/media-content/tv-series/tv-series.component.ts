import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllMovies, selectMoviesError, selectMoviesLoading } from '../../store/Movies/movies.selectors';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tv-series',
  templateUrl: './tv-series.component.html',
  styleUrl: './tv-series.component.css'
})
export class TvSeriesComponent implements OnInit{
  tvSeries$ = this.store.select(selectAllMovies);
  searchTerm = new BehaviorSubject<string>('');
  searchTermValue: string = '';

  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectMoviesLoading);
    this.error$ = this.store.select(selectMoviesError);
  }

  filteredTvSeries$ = combineLatest([this.tvSeries$, this.searchTerm]).pipe(
    map(([movies, term]) => {
      this.searchTermValue = term;

      if (!term.trim()) {
        return movies.filter(movie => movie.category.toLowerCase() === 'tv series'.toLowerCase());
      }

      return movies.filter(movie =>
        movie.category.toLowerCase() === 'tv series'.toLowerCase() &&
        movie.title.toLowerCase().includes(term.toLowerCase())
      );
    })
  );

  onSearch(term: string) {
    this.searchTerm.next(term);
  }
}
