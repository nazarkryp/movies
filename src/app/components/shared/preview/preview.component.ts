import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Attachment } from 'app/models/view';

@Component({
    selector: 'movies-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss']
})
export class PreviewComponent {
    public attachments: Attachment[];
    public selectedAttachment: number;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<PreviewComponent>) {
        this.attachments = data.attachments;
        this.selectedAttachment = data.selectedAttachment;
    }

    public previous() {
        if (this.selectedAttachment > 0) {
            this.selectedAttachment--;
        }

        console.log(this.attachments[this.selectedAttachment].uri);
    }

    public next() {
        if (this.selectedAttachment < this.attachments.length - 1) {
            this.selectedAttachment++;
        }
    }
}
