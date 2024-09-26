import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from '../../model/model';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map, Subscription } from 'rxjs';
import { selectAllMovies } from '../../store/Movies/movies.selectors';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit, OnDestroy {

  moviesList: Movie[] = [];
  searchTerm = new BehaviorSubject<string>('');
  private subscription: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit() {
    this.subscription.add(
      combineLatest([this.store.select(selectAllMovies), this.searchTerm]).pipe(
        map(([movies, term]) => 
          movies.filter(movie => 
            movie.category.toLowerCase() === 'movie' && 
            movie.title.toLowerCase().includes(term.toLowerCase())
          )
        )
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
