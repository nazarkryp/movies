import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRippleModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
    imports: [
        MatButtonModule,
        MatGridListModule,
        MatRippleModule,
        MatProgressBarModule,
        MatIconModule,
        MatSidenavModule
    ],
    exports: [
        MatButtonModule,
        MatGridListModule,
        MatRippleModule,
        MatProgressBarModule,
        MatIconModule,
        MatSidenavModule
    ]
})
export class MoviesMaterialModule { }
