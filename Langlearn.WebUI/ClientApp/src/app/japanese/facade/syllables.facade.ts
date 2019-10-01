import { Injectable } from "@angular/core";
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SyllablesApi } from '../api/syllables.api';
import { SyllablesState } from '../state/syllables.state';
import { SyllablesListQuery } from '../models/syllablesListQuery';
import { SyllableModel } from 'src/app/core/models/japanese/syllable.model';

@Injectable()
export class SyllablesFacade {

    constructor(private syllablesApi: SyllablesApi, private syllablesState: SyllablesState) { }

    public isUpdating$(): Observable<boolean> {
        return this.syllablesState.isUpdating$();
    }

    public loadSyllables(query: SyllablesListQuery): Subscription {
        this.syllablesState.setUpdating(true);
        return this.syllablesApi.getList(query)
            .pipe(tap(syllables => this.syllablesState.setSyllables(syllables)))
            .subscribe(() => {}, error => {}, () => this.syllablesState.setUpdating(false));
    }

    public getSyllables$(): Observable<SyllableModel[]> {
        return this.syllablesState.getSyllables$();
    }

    public clearSyllables(): void {
        this.syllablesState.setSyllables(null);
    }

    public toggleIsActive(id: number): void {
        this.syllablesApi.toggleIsActive(id).subscribe();
    }
}