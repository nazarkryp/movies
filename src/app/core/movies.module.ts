import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MoviesMaterialModule, MoviesRoutingModule } from 'app/core';

import { MoviesLayoutComponent } from 'app/layout/movies-layout.component';
import { MoviesComponent } from 'app/components/movies/movies.component';
import { HeaderComponent } from 'app/components/header/header.component';
import { MovieDetailsComponent } from 'app/components/movie-details/movie-details.component';
import { PaginationComponent } from 'app/components/shared/pagination/pagination.component';

import { TruncatePipe } from 'app/pipes/truncate.pipe';

@NgModule({
    declarations: [
        MoviesLayoutComponent,
        MoviesComponent,
        HeaderComponent,
        MovieDetailsComponent,
        PaginationComponent,
        TruncatePipe
    ],
    imports: [
        BrowserModule,
        MoviesRoutingModule,
        BrowserAnimationsModule,
        MoviesMaterialModule,
        HttpClientModule,
        FlexLayoutModule
    ],
    providers: [],
    bootstrap: [MoviesLayoutComponent]
})
export class MoviesModule { }
