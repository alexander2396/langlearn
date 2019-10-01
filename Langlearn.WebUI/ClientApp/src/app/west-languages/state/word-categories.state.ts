import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { WordCategoryModel } from 'src/app/core/models/west-languages/wordCategory.model';

@Injectable()
export class WordCategoriesState {

    private updating$ = new BehaviorSubject<boolean>(false);
    private wordCategories$ = new BehaviorSubject<WordCategoryModel[]>(null);
    private itemCount$ = new BehaviorSubject<number>(null);

    public isUpdating$() {
        return this.updating$.asObservable();
    }

    public setUpdating(isUpdating: boolean) {
        this.updating$.next(isUpdating);
    }

    public getWordCategories$() {
        return this.wordCategories$.asObservable();
    }

    public getTtemCount$() {
        return this.itemCount$.asObservable();
    }

    public setWordCategories(words: WordCategoryModel[]) {
        this.wordCategories$.next(words);
    }

    public setItemCount(count: number) {
        this.itemCount$.next(count);
    }

    public updateWordCategory(updatedWordCategory: WordCategoryModel) {
        const wordCategories = this.wordCategories$.getValue();
        const indexOfUpdated = wordCategories.findIndex(wordCategory => wordCategory.id === updatedWordCategory.id);
        wordCategories[indexOfUpdated] = updatedWordCategory;
        this.wordCategories$.next([...wordCategories]);
    }
}