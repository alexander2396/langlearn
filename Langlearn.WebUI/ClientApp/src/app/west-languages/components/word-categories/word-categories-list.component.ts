import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { WestLanguagesState } from '../../state/west-languages.state';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { ConfirmDialog } from 'src/app/shared/components/confirm-dialog.component';
import { environment } from 'src/environments/environment';
import { WordCategoryModel } from 'src/app/core/models/west-languages/wordCategory.model';
import { WordCategoriesFacade } from '../../facade/word-categories.facade';
import { WordCategoriesListQuery } from '../../models/wordCategoriesListQuery';
import { WordCategoryDialog } from './word-category-dialog.component';
import { WordCategoryDialogData } from './models/wordCategoryDialogData';

@Component({
    templateUrl: './word-categories-list.component.html'
})
export class WordCategoriesListComponent implements OnInit, AfterViewInit {
	
	@ViewChild(MatPaginator, { static: false }) public paginator: MatPaginator;
	
	public wordCategories: Observable<WordCategoryModel[]> = this.wordCategoriesFacade.getWordCategories$();
    public isUpdating$: Observable<boolean>;
	public displayedColumns: string[] = ['id', 'name', 'actions'];
	public readonly pageSize = 30;
	
	constructor(private wordCategoriesFacade: WordCategoriesFacade, private dialog: MatDialog) {
		this.isUpdating$ = wordCategoriesFacade.isUpdating$();
	}

	ngOnInit() {
		this._loadWordCategories();
	}

	ngAfterViewInit(): void {
		let itemCountSubscription: Subscription = this.wordCategoriesFacade.itemCount$().subscribe(count => {
			if (this.paginator) {
				this.paginator.length = count;
			}         
		});
		
		if (this.paginator) {
			this.paginator.page.subscribe((pageEvent: PageEvent) => {
				this._loadWordCategories();
			});
		}	
    }
    
	public addWordCategory(): void {
		const dialogRef = this.dialog.open(WordCategoryDialog, {
			width: '500px',
			data: { dialogTitle: "Add Word Category", wordCategory: {id: 0, languageId: WestLanguagesState.languageId } as WordCategoryModel } as WordCategoryDialogData
		});
	  
		dialogRef.afterClosed().subscribe((wordCategory: WordCategoryModel) => {
			if (wordCategory) {
				this.wordCategoriesFacade.createWordCategory(wordCategory);
			}	
		});
	}

	public updateWordCategory(wordCategory: WordCategoryModel): void {
		const dialogRef = this.dialog.open(WordCategoryDialog, {
			width: '500px',
			data: { dialogTitle: "Edit Word Category", wordCategory: wordCategory } as WordCategoryDialogData
		});
	  
		dialogRef.afterClosed().subscribe((wordCategory: WordCategoryModel) => {
			if (wordCategory) {
				this.wordCategoriesFacade.updateWordCategory(wordCategory);
			}
		});
	}

	public deleteWordCategory(wordCategory: WordCategoryModel): void {
		const dialogRef = this.dialog.open(ConfirmDialog, {
			width: '500px',
			data: `Are you sure you want to delete the cagetory '${wordCategory.name}'?`
		});
	  
		dialogRef.afterClosed().subscribe((result: boolean) => {
			if (result) {
				this.wordCategoriesFacade.deleteWordCategory(wordCategory.id, wordCategory.languageId);
			}
		});
	}

	private _loadWordCategories(): void {

		let query = new WordCategoriesListQuery(WestLanguagesState.languageId);

		if (this.paginator) {
			query.skip = this.paginator.pageIndex * this.paginator.pageSize;
			query.take = this.paginator.pageSize;
		} else {
			query.skip = 0;
			query.take = this.pageSize;
		}

		this.wordCategoriesFacade.loadWordCategories(query);
	}
}