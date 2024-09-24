import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaContentComponent } from './media-content.component';
import { MoviesComponent } from './movies/movies.component';
import { TvSeriesComponent } from './tv-series/tv-series.component';
import { BookmarkComponent } from './bookmark/bookmark.component';

const routes: Routes = [
  { path: '', component: MediaContentComponent },
  { path: 'movies', component: MoviesComponent},
  { path: 'series', component: TvSeriesComponent},
  { path: 'bookmark', component: BookmarkComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaContentRoutingModule { }
