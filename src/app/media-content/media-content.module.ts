import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaContentRoutingModule } from './media-content-routing.module';
import { MediaContentComponent } from './media-content.component';
import { MoviesComponent } from './movies/movies.component';
import { TvSeriesComponent } from './tv-series/tv-series.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { TrendingMovieCardComponent } from './components/trending-movie-card/trending-movie-card.component';


@NgModule({
  declarations: [
    MediaContentComponent,
    MoviesComponent,
    TvSeriesComponent,
    BookmarkComponent,
    MovieCardComponent,
    TrendingMovieCardComponent
  ],
  imports: [
    CommonModule,
    MediaContentRoutingModule
  ]
})
export class MediaContentModule { }
