import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadMovies } from '../store/Movies/movies.actions';

@Component({
  selector: 'app-media-content',
  templateUrl: './media-content.component.html',
  styleUrl: './media-content.component.css'
})
export class MediaContentComponent {

  
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadMovies());
  }

}
