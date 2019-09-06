import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WordModel } from 'src/app/core/models/west-languages/word.model';
import { WordsFacade } from '../../facade/words.facade';
import { WestLanguagesState } from '../../state/west-languages.state';
import { MatDialog } from '@angular/material';
import { WordDialog } from './word-dialog.component';
import { WordDialogData } from './models/wordDialogData';
import { ConfirmDialog } from 'src/app/shared/components/confirm-dialog.component';
import { WordsListQuery } from '../models/wordsListQuery';

@Component({
    templateUrl: './words-list.component.html'
})
export class WordsListComponent implements OnInit {
    
	public words: Observable<WordModel[]> = this.wordsFacade.getWords$();
    public isUpdating$: Observable<boolean>;
    public displayedColumns: string[] = ['id', 'text', 'translation', 'actions'];
	
	constructor(private wordsFacade: WordsFacade, private dialog: MatDialog) {
		this.isUpdating$ = wordsFacade.isUpdating$();
	}

	ngOnInit() {
		this.wordsFacade.loadWords(new WordsListQuery(WestLanguagesState.languageId));
	}

	public addWord(): void {
		const dialogRef = this.dialog.open(WordDialog, {
			width: '500px',
			data: { dialogTitle: "Add Word", word: {id: 0, languageId: WestLanguagesState.languageId } as WordModel } as WordDialogData
		});
	  
		dialogRef.afterClosed().subscribe((word: WordModel) => {
			if (word) {
				this.wordsFacade.createWord(word);
			}	
		});
	}

	public updateWord(word: WordModel): void {
		const dialogRef = this.dialog.open(WordDialog, {
			width: '500px',
			data: { dialogTitle: "Edit Word", word: word } as WordDialogData
		});
	  
		dialogRef.afterClosed().subscribe((word: WordModel) => {
			if (word) {
				this.wordsFacade.updateWord(word);
			}
		});
	}

	public deleteWord(word: WordModel): void {
		const dialogRef = this.dialog.open(ConfirmDialog, {
			width: '500px',
			data: "Are you sure?"
		});
	  
		dialogRef.afterClosed().subscribe((result: boolean) => {
			if (result) {
				this.wordsFacade.deleteWord(word.id, word.languageId);
			}
		});
	}
}