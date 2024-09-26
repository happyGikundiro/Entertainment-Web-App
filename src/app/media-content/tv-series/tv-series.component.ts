import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Movie } from '../../model/model';
import { selectAllMovies } from '../../store/Movies/movies.selectors';

@Component({
  selector: 'app-tv-series',
  templateUrl: './tv-series.component.html',
  styleUrl: './tv-series.component.css'
})
export class TvSeriesComponent {

  tvSeries: Movie[] = [];

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.select(selectAllMovies).subscribe(movies => {
      this.tvSeries = movies.filter(movie => movie.category.toLowerCase() === 'tv series'.toLowerCase());
    });
  }

}
