import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllMovies } from '../../store/Movies/movies.selectors';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tv-series',
  templateUrl: './tv-series.component.html',
  styleUrl: './tv-series.component.css'
})
export class TvSeriesComponent {
  tvSeries$ = this.store.select(selectAllMovies);
  searchTerm = new BehaviorSubject<string>('');

  filteredTvSeries$ = combineLatest([this.tvSeries$, this.searchTerm]).pipe(
    map(([movies, term]) => 
      movies.filter(movie => movie.category.toLowerCase() === 'tv series'.toLowerCase() && movie.title.toLowerCase().includes(term.toLowerCase())) || []
    )
  );

  constructor(private store: Store) {}

  onSearch(term: string) {
    this.searchTerm.next(term);
  }
}