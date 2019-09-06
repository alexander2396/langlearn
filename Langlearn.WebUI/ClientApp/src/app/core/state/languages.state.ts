import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { LanguageModel } from '../models/west-languages/language.model';

@Injectable()
export class LanguagesState {

    private updating$ = new BehaviorSubject<boolean>(false);
    private languages$ = new BehaviorSubject<LanguageModel[]>(null);

    isUpdating$() {
        return this.updating$.asObservable();
    }

    setUpdating(isUpdating: boolean) {
        this.updating$.next(isUpdating);
    }

    getLanguages$() {
        return this.languages$.asObservable();
    }

    setLanguages(languages: LanguageModel[]) {
        this.languages$.next(languages);
    }
}