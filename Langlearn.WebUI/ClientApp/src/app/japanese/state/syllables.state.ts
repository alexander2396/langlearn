import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { SyllableModel } from 'src/app/core/models/japanese/syllable.model';

@Injectable()
export class SyllablesState {

    private updating$ = new BehaviorSubject<boolean>(false);
    private syllables$ = new BehaviorSubject<SyllableModel[]>(null);

    public isUpdating$() {
        return this.updating$.asObservable();
    }

    public setUpdating(isUpdating: boolean) {
        this.updating$.next(isUpdating);
    }

    public getSyllables$() {
        return this.syllables$.asObservable();
    }

    public setSyllables(syllables: SyllableModel[]) {
        this.syllables$.next(syllables);
    }
}