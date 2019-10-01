import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, from } from 'rxjs';
import { WordModel } from 'src/app/core/models/west-languages/word.model';
import { WordsFacade } from '../../facade/words.facade';
import { WestLanguagesState } from '../../state/west-languages.state';
import { MatDialog, MatSnackBar } from '@angular/material';
import { WordsListQuery } from '../../models/wordsListQuery';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Question } from 'src/app/shared/components/practice/models/question';
import { PracticeResult } from 'src/app/core/models/practiceResult';

@Component({
    templateUrl: './words-practise.component.html'
})
export class WordsPractiseComponent implements OnInit, OnDestroy {
    
    public questions: Question[];

    public isUpdating$: Observable<boolean>;

    private wordsSubscription: Subscription;
	
	constructor(private wordsFacade: WordsFacade, private snackbarService: SnackbarService) {
		this.isUpdating$ = wordsFacade.isUpdating$();
	}

	ngOnInit() {
        this._init();

        this.wordsSubscription = this.wordsFacade.getWords$().subscribe(words => {
            if (words) {
                this.questions = words.map(w => { return { id: w.id, text: w.text, translation: w.translation} as Question });
            } 
        });
    }

    ngOnDestroy() {
        this.wordsSubscription.unsubscribe();
    }

    public complete(result: PracticeResult): void {
        this.wordsFacade.postPracticeResult(result).subscribe(() => this._init());
    }    

    private _init(): void {
        this.wordsFacade.loadWords({
            languageId: WestLanguagesState.languageId,
            take: 10,
            forPractice: true,
            activeOnly: true
        } as WordsListQuery);   
    }
}