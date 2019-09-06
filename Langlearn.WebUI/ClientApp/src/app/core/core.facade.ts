import { Injectable } from "@angular/core";
import { LanguagesApi } from './api/languages.api';
import { LanguagesState } from './state/languages.state';
import { Observable, Subscription } from 'rxjs';
import { LanguageModel } from './models/west-languages/language.model';
import { tap } from 'rxjs/operators';

@Injectable()
export class CoreFacade {

    constructor(private languagesApi: LanguagesApi, private languagesState: LanguagesState) { }

    isUpdating$(): Observable<boolean> {
        return this.languagesState.isUpdating$();
    }

    loadLanguages(): Subscription {
        return this.languagesApi.getAll()
            .pipe(tap(languages => this.languagesState.setLanguages(languages)))
            .subscribe();
    }

    getLanguages$(): Observable<LanguageModel[]> {
        return this.languagesState.getLanguages$();
    }
}