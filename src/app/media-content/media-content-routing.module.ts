import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaContentComponent } from './media-content.component';
import { MoviesComponent } from './movies/movies.component';
import { TvSeriesComponent } from './tv-series/tv-series.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { MovieListComponent } from './movie-list/movie-list.component';

const routes: Routes = [
  {
    path: '',
    component: MediaContentComponent,
    children: [
      { path: 'movies', component: MoviesComponent },
      { path: 'series', component: TvSeriesComponent },
      { path: 'bookmark', component: BookmarkComponent },
      { path: 'movielist', component: MovieListComponent},
      { path: '', redirectTo: 'movielist', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaContentRoutingModule { }
