import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PracticeResultsDialogData } from '../models/practiceResultsDialogData';

@Component({
    templateUrl: 'practice-results-dialog.component.html',
    styleUrls: ['practice-results-dialog.component.scss']
})
export class PracticeResultsDialog {

    constructor(
        public dialogRef: MatDialogRef<PracticeResultsDialog>,
        @Inject(MAT_DIALOG_DATA) public data: PracticeResultsDialogData
    ) { }
}