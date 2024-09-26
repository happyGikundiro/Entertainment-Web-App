import { Component, OnInit } from '@angular/core';
import { Movie } from '../../model/model';
import { Store } from '@ngrx/store';
import { selectAllMovies } from '../../store/Movies/movies.selectors';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit{
  
  moviesList: Movie[] = [];

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.select(selectAllMovies).subscribe(movies => {
      this.moviesList = movies.filter(movie => movie.category.toLowerCase() === 'Movie'.toLowerCase());
    });
  }
  
}
