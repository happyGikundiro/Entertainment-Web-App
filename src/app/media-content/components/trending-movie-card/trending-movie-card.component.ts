import { Component, Input } from '@angular/core';
import { Movie } from '../../../model/model';

@Component({
  selector: 'app-trending-movie-card',
  templateUrl: './trending-movie-card.component.html',
  styleUrl: './trending-movie-card.component.css'
})
export class TrendingMovieCardComponent {

  @Input() movie!: Movie;

}
