import { Injectable } from "@angular/core";
import { WordsApi } from '../api/words.api';
import { WordsState } from '../state/words.state';
import { Observable, Subscription } from 'rxjs';
import { WordModel } from 'src/app/core/models/west-languages/word.model';
import { tap } from 'rxjs/operators';
import { WordsListQuery } from '../components/models/wordsListQuery';

@Injectable()
export class WordsFacade {

    constructor(private wordsApi: WordsApi, private wordsState: WordsState) { }

    public isUpdating$(): Observable<boolean> {
        return this.wordsState.isUpdating$();
    }

    public loadWords(query: WordsListQuery): Subscription {
        this.wordsState.setUpdating(true);
        return this.wordsApi.getAll(query)
            .pipe(tap(words => this.wordsState.setWords(words)))
            .subscribe(() => {}, error => {}, () => this.wordsState.setUpdating(false));
    }

    public getWords$(): Observable<WordModel[]> {
        return this.wordsState.getWords$();
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
}