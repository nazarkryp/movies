import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRippleModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    imports: [
        MatButtonModule,
        MatGridListModule,
        MatRippleModule,
        MatProgressBarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatDialogModule,
        MatMenuModule
    ],
    exports: [
        MatButtonModule,
        MatGridListModule,
        MatRippleModule,
        MatProgressBarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatDialogModule,
        MatMenuModule
    ]
})
export class MoviesMaterialModule { }
