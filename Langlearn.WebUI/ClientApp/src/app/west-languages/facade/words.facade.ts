import { Injectable } from "@angular/core";
import { WordsApi } from '../api/words.api';
import { WordsState } from '../state/words.state';
import { Observable, Subscription } from 'rxjs';
import { WordModel } from 'src/app/core/models/west-languages/word.model';
import { tap } from 'rxjs/operators';
import { WordsListQuery } from '../models/wordsListQuery';
import { PracticeResult } from '../../core/models/practiceResult';

@Injectable()
export class WordsFacade {

    constructor(private wordsApi: WordsApi, private wordsState: WordsState) { }

    public isUpdating$(): Observable<boolean> {
        return this.wordsState.isUpdating$();
    }

    public loadWords(query: WordsListQuery): Subscription {
        this.wordsState.setUpdating(true);

        const filters = this.wordsState.getFilters();
        if (filters.wordCategoryId) {
            query.wordCategoryId = filters.wordCategoryId;
        }

        return this.wordsApi.getList(query)
            .pipe(tap(result => {
                this.wordsState.setWords(result.words);
                this.wordsState.setItemCount(result.itemCount);
            }))
            .subscribe(() => {}, error => {}, () => this.wordsState.setUpdating(false));
    }

    public getWords$(): Observable<WordModel[]> {
        return this.wordsState.getWords$();
    }

    public itemCount$(): Observable<number> {
        return this.wordsState.getTtemCount$();
    }

    public createWord(word: WordModel): void {
        this.wordsState.setUpdating(true);
        this.wordsApi.create(word)
            .subscribe(
                () => {
                    this.loadWords(new WordsListQuery(word.languageId));
                }, 
                error => console.log(error),
                () => this.wordsState.setUpdating(false));
    }

    public updateWord(word: WordModel): void {
        this.wordsState.updateWord(word);
        this.wordsApi.update(word)
            .subscribe(
                () => {
                   
                }, 
                error => console.log(error),
                () => this.wordsState.setUpdating(false));
    }

    public deleteWord(id: number, languageId: number): void {
        this.wordsState.setUpdating(true);
        this.wordsApi.delete(id)
            .subscribe(
                () => {
                    this.loadWords(new WordsListQuery(languageId));
                }, 
                error => console.log(error),
                () => this.wordsState.setUpdating(false));
    }

    public toggleIsActive(id: number): void {
        this.wordsApi.toggleIsActive(id).subscribe();
    }

    public setFilter(key: string, value: string): void {
        this.wordsState.setFilter(key, value);
    }

    public postPracticeResult(result: PracticeResult): Observable<any> {
        return this.wordsApi.postPracticeResult(result);
    }
}