import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllMovies } from '../../store/Movies/movies.selectors';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.css'
})
export class BookmarkComponent {
  bookmarkedMovies$ = this.store.select(selectAllMovies);
  searchTerm = new BehaviorSubject<string>('');

  filteredBookmarkedMovies$ = combineLatest([this.bookmarkedMovies$, this.searchTerm]).pipe(
    map(([movies, term]) => 
      movies.filter(movie => movie.isBookmarked === true && movie.title.toLowerCase().includes(term.toLowerCase()))
    )
  );

  constructor(private store: Store) {}

  onSearch(term: string) {
    this.searchTerm.next(term);
  }
}
