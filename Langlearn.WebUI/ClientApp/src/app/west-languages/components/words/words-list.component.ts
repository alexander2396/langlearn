import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { WordModel } from 'src/app/core/models/west-languages/word.model';
import { WordsFacade } from '../../facade/words.facade';
import { WestLanguagesState } from '../../state/west-languages.state';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { WordDialog } from './word-dialog.component';
import { WordDialogData } from './models/wordDialogData';
import { ConfirmDialog } from 'src/app/shared/components/confirm-dialog.component';
import { WordsListQuery } from '../../models/wordsListQuery';
import { environment } from 'src/environments/environment';
import { WordCategoriesFacade } from '../../facade/word-categories.facade';
import { WordCategoriesListQuery } from '../../models/wordCategoriesListQuery';
import { WordCategoryModel } from 'src/app/core/models/west-languages/wordCategory.model';

@Component({
    templateUrl: './words-list.component.html'
})
export class WordsListComponent implements OnInit, AfterViewInit {
	
	@ViewChild(MatPaginator, { static: false }) public paginator: MatPaginator;
	
	public words: Observable<WordModel[]> = this.wordsFacade.getWords$();
	public wordCategories: WordCategoryModel[];
    public isUpdating$: Observable<boolean>;
	public displayedColumns: string[] = ['id', 'text', 'translation', 'actions'];
	public readonly pageSize = 30;
	
	constructor(private wordsFacade: WordsFacade, private wordCategoriesFacade: WordCategoriesFacade, private dialog: MatDialog) {
		this.isUpdating$ = wordsFacade.isUpdating$();
	}

	ngOnInit() {
		this._loadWords();
		this._loadWordCategories();
	}

	ngAfterViewInit(): void {
		let itemCountSubscription: Subscription = this.wordsFacade.itemCount$().subscribe(count => {
            if (this.paginator) {
				this.paginator.length = count;
			}
        });

		if (this.paginator) {
			this.paginator.page.subscribe((pageEvent: PageEvent) => {
				this._loadWords();
			});
		}
	}

	public playSpeech(word: WordModel): void {
		var audio = new Audio();
		audio.src = `${environment.apiPath}/Assets/Mp3/${word.text}.mp3`;
		audio.load();
		audio.play();
	}

	public addWord(): void {
		const dialogRef = this.dialog.open(WordDialog, {
			width: '500px',
			data: { 
				dialogTitle: "Add Word", 
				word: {id: 0, languageId: WestLanguagesState.languageId } as WordModel ,
				wordCategories: this.wordCategories
			} as WordDialogData
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
			data: { dialogTitle: "Edit Word", word: word, wordCategories: this.wordCategories } as WordDialogData
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
			data: `Are you sure you want to delete the word '${word.text}'?`
		});
	  
		dialogRef.afterClosed().subscribe((result: boolean) => {
			if (result) {
				this.wordsFacade.deleteWord(word.id, word.languageId);
			}
		});
	}

	public toggleIsActive(word: WordModel): void {
		word.isActive = !word.isActive;
		this.wordsFacade.toggleIsActive(word.id);
	}

	public setFilterValue(key: string, value: string) {
		this.wordsFacade.setFilter(key, value);
		this._loadWords();
	}

	private _loadWords(): void {
		let query = new WordsListQuery(WestLanguagesState.languageId);

		if (this.paginator) {
			query.skip = this.paginator.pageIndex * this.paginator.pageSize;
			query.take = this.paginator.pageSize;
		} else {
			query.skip = 0;
			query.take = this.pageSize;
		}

		this.wordsFacade.loadWords(query);
	}

	private _loadWordCategories(): void {
		let query = new WordCategoriesListQuery(WestLanguagesState.languageId);
		this.wordCategoriesFacade.loadWordCategories(query);
		this.wordCategoriesFacade.getWordCategories$().subscribe(data => this.wordCategories = data);
	}
}