import { Component } from '@angular/core';
import { Movie } from '../../model/model';
import { Store } from '@ngrx/store';
import { selectAllMovies } from '../../store/Movies/movies.selectors';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.css'
})
export class BookmarkComponent {

  bookmarkedMovies: Movie[] = [];

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.select(selectAllMovies).subscribe(movies => {
      this.bookmarkedMovies = movies.filter(movie => movie.isBookmarked === true);
    });
  }

}
