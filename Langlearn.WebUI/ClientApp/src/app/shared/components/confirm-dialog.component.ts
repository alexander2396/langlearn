import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: 'confirm-dialog.component.html',
})
export class ConfirmDialog {

    constructor(
        public dialogRef: MatDialogRef<ConfirmDialog>,
        @Inject(MAT_DIALOG_DATA) public data: string
    ) { }

    public submit(value: boolean) {
        this.dialogRef.close(value);
    }
}