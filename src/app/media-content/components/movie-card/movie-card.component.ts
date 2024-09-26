import { Component, Input } from '@angular/core';
import { Movie } from '../../../model/model';
import { Store } from '@ngrx/store';
import * as MovieActions from '../../../store/Movies/movies.actions'

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {

  @Input() movie!: Movie;

  constructor(private store: Store) {}

  toggleBookmark(movie: Movie) {
    this.store.dispatch(MovieActions.toggleBookmark({ movieId: movie.id }));
  }

}