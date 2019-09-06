import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { WordModel } from 'src/app/core/models/west-languages/word.model';

@Injectable()
export class WordsState {

    private updating$ = new BehaviorSubject<boolean>(false);
    private words$ = new BehaviorSubject<WordModel[]>(null);

    public isUpdating$() {
        return this.updating$.asObservable();
    }

    public setUpdating(isUpdating: boolean) {
        this.updating$.next(isUpdating);
    }

    public getWords$() {
        return this.words$.asObservable();
    }

    public setWords(words: WordModel[]) {
        this.words$.next(words);
    }

    public updateWord(updatedWord: WordModel) {
        const words = this.words$.getValue();
        const indexOfUpdated = words.findIndex(word => word.id === updatedWord.id);
        words[indexOfUpdated] = updatedWord;
        this.words$.next([...words]);
    }
}