import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MoviesMaterialModule, MoviesRoutingModule } from '.';

import { MoviesLayoutComponent } from '../layout/movies-layout.component';
import { HeaderComponent } from '../components/header/header.component';

import { StudioListComponent } from '../components/studio-list/studio-list.component';

import { StoreModule } from '@ngrx/store';

import { MoviesModule } from './movies.module';
import { AuthenticationInterceptor } from '../services/interceptors';
import { userReducer } from './security/state';


@NgModule({
    declarations: [
        MoviesLayoutComponent,
        HeaderComponent,
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
        MoviesModule,
        StoreModule.forRoot({
            user: userReducer
        })
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthenticationInterceptor,
            multi: true
        }
    ],
    bootstrap: [MoviesLayoutComponent]
})
export class AppModule { }
