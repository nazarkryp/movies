import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'movies-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss']
})
export class PreviewComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public uri: string,
        private dialogRef: MatDialogRef<PreviewComponent>) {
        console.log(uri);
    }
}
