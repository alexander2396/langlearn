import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, from } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Question } from 'src/app/shared/components/practice/models/question';
import { SyllablesFacade } from '../../facade/syllables.facade';
import { SyllabaryType } from 'src/app/core/enums/syllabaryType';
import { SyllablesListQuery } from '../../models/syllablesListQuery';

@Component({
    templateUrl: './syllables-practise.component.html',
    styleUrls: ['./syllables-practise.component.scss']
})
export class SyllablesPractiseComponent implements OnInit, OnDestroy {
    
    public SyllabaryType = SyllabaryType;

    public questions: Question[];

    public isUpdating$: Observable<boolean>;

    private syllablesSubscription: Subscription;
	
	constructor(private syllablesFacade: SyllablesFacade, private snackbarService: SnackbarService) {
		this.isUpdating$ = syllablesFacade.isUpdating$();
	}

	ngOnInit() {

        this.syllablesFacade.clearSyllables();

        this.syllablesSubscription = this.syllablesFacade.getSyllables$().subscribe(syllables => {
            if (syllables) {
                this.questions = syllables.map(s => { return { text: s.value, translation: s.transliteration} as Question });
            } 
        });
    }

    ngOnDestroy() {
        this.syllablesSubscription.unsubscribe();
    }

    public selectSyllabary(syllabaryType: SyllabaryType): void {
        this._load(syllabaryType);
    }

    public complete(): void {
        this.questions = [];
    }    

    private _load(syllabaryType: SyllabaryType): void {
        this.syllablesFacade.loadSyllables({
            syllabaryType: syllabaryType,
            take: 10,
            randomOrder: true,
            activeOnly: true
        } as SyllablesListQuery);   
    }
}