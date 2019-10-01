import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WordCategoryDialogData } from './models/wordCategoryDialogData';

@Component({
    templateUrl: 'word-category-dialog.component.html',
})
export class WordCategoryDialog implements OnInit {

    public wordCategoryForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<WordCategoryDialog>,
        @Inject(MAT_DIALOG_DATA) public data: WordCategoryDialogData
    ) {
        this.wordCategoryForm = new FormGroup({
            id: new FormControl(this.data.wordCategory.id),
            name: new FormControl(this.data.wordCategory.name, [Validators.required]),
            languageId: new FormControl(this.data.wordCategory.languageId)
        })
    }

    public ngOnInit() {
       
    }
}