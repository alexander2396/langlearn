import { Injectable } from "@angular/core";
import { WordCategoriesApi } from '../api/wordCategories.api';
import { WordCategoriesState } from '../state/word-categories.state';
import { Observable, Subscription } from 'rxjs';
import { WordCategoriesListQuery } from '../models/wordCategoriesListQuery';
import { tap } from 'rxjs/operators';
import { WordCategoryModel } from 'src/app/core/models/west-languages/wordCategory.model';

@Injectable()
export class WordCategoriesFacade {

    constructor(private wordCategoriesApi: WordCategoriesApi, private wordCategoriesState: WordCategoriesState) { }

    public isUpdating$(): Observable<boolean> {
        return this.wordCategoriesState.isUpdating$();
    }

    public loadWordCategories(query: WordCategoriesListQuery): Subscription {
        this.wordCategoriesState.setUpdating(true);
        return this.wordCategoriesApi.getList(query)
            .pipe(tap(result => {
                this.wordCategoriesState.setWordCategories(result.wordCategories);
                this.wordCategoriesState.setItemCount(result.itemCount);
            }))
            .subscribe(() => {}, error => {}, () => this.wordCategoriesState.setUpdating(false));
    }

    public getWordCategories$(): Observable<WordCategoryModel[]> {
        return this.wordCategoriesState.getWordCategories$();
    }

    public itemCount$(): Observable<number> {
        return this.wordCategoriesState.getTtemCount$();
    }

    public createWordCategory(wordCategory: WordCategoryModel): void {
        this.wordCategoriesState.setUpdating(true);
        this.wordCategoriesApi.create(wordCategory)
            .subscribe(
                () => {
                    this.loadWordCategories(new WordCategoriesListQuery(wordCategory.languageId));
                }, 
                error => console.log(error),
                () => this.wordCategoriesState.setUpdating(false));
    }

    public updateWordCategory(wordCategory: WordCategoryModel): void {
        this.wordCategoriesState.updateWordCategory(wordCategory);
        this.wordCategoriesApi.update(wordCategory)
            .subscribe(
                () => {
                   
                }, 
                error => console.log(error),
                () => this.wordCategoriesState.setUpdating(false));
    }

    public deleteWordCategory(id: number, languageId: number): void {
        this.wordCategoriesState.setUpdating(true);
        this.wordCategoriesApi.delete(id)
            .subscribe(
                () => {
                    this.loadWordCategories(new WordCategoriesListQuery(languageId));
                }, 
                error => console.log(error),
                () => this.wordCategoriesState.setUpdating(false));
    }
}