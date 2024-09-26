import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Movie } from '../../model/model';
import { selectAllMovies } from '../../store/Movies/movies.selectors';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit{

  trendingMovies$!: Observable<Movie[]>;
  recommendedMovies$!: Observable<Movie[]>;

  constructor(private store: Store){}

  ngOnInit(): void {
    this.trendingMovies$ = this.store.select(selectAllMovies).pipe(
      map(movies => movies.filter(movie => movie.isTrending))
    );

    this.recommendedMovies$ = this.store.select(selectAllMovies).pipe(
      map(movies => movies.filter(movie => !movie.isTrending))
    );
  }

}
