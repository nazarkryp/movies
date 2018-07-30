import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MoviesMaterialModule, MoviesRoutingModule } from 'app/core';

import { MoviesLayoutComponent } from 'app/layout/movies-layout.component';
import { MoviesComponent } from 'app/components/movies/movies.component';
import { HeaderComponent } from 'app/components/header/header.component';
import { MovieDetailsComponent } from 'app/components/movie-details/movie-details.component';
import { PaginationComponent } from 'app/components/shared/pagination/pagination.component';

import { TruncatePipe } from 'app/pipes/truncate.pipe';
import { StudioListComponent } from '../components/studio-list/studio-list.component';

import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { reducer } from 'app/movies/infrastructure/state';

export const reducers: ActionReducerMap<any> = {
    movies: reducer
};

@NgModule({
    declarations: [
        MoviesLayoutComponent,
        MoviesComponent,
        HeaderComponent,
        MovieDetailsComponent,
        PaginationComponent,
        TruncatePipe,
        StudioListComponent
    ],
    imports: [
        BrowserModule,
        MoviesRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MoviesMaterialModule,
        HttpClientModule,
        FlexLayoutModule,
        StoreModule.forRoot(reducers, {})
    ],
    providers: [],
    bootstrap: [MoviesLayoutComponent]
})
export class MoviesModule { }
