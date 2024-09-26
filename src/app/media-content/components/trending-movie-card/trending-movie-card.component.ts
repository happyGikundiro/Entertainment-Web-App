import { Component, Input } from '@angular/core';
import { Movie } from '../../../model/model';
import { Store } from '@ngrx/store';
import * as MovieActions from '../../../store/Movies/movies.actions'

@Component({
  selector: 'app-trending-movie-card',
  templateUrl: './trending-movie-card.component.html',
  styleUrl: './trending-movie-card.component.css'
})
export class TrendingMovieCardComponent {

  @Input() movie!: Movie;

  constructor(private store: Store) {}

  toggleBookmark(movie: Movie) {
    this.store.dispatch(MovieActions.toggleBookmark({ movieId: movie.id }));
  }

}
