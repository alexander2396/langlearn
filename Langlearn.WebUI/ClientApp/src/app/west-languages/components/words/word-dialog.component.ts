import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WordDialogData } from './models/wordDialogData';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    templateUrl: 'word-dialog.component.html',
})
export class WordDialog implements OnInit {

    public wordForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<WordDialog>,
        @Inject(MAT_DIALOG_DATA) public data: WordDialogData
    ) {
        this.wordForm = new FormGroup({
            id: new FormControl(this.data.word.id),
            text: new FormControl(this.data.word.text, [Validators.required]),
            translation: new FormControl(this.data.word.translation, Validators.required),
            wordCategoryId: new FormControl(this.data.word.wordCategoryId),
            isActive: new FormControl(this.data.word.isActive),
            languageId: new FormControl(this.data.word.languageId)
        })
    }

    public ngOnInit() {
       
    }
}