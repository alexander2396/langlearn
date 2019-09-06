import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, from } from 'rxjs';
import { WordModel } from 'src/app/core/models/west-languages/word.model';
import { WordsFacade } from '../../facade/words.facade';
import { WestLanguagesState } from '../../state/west-languages.state';
import { MatDialog, MatSnackBar } from '@angular/material';
import { WordsListQuery } from '../models/wordsListQuery';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
    templateUrl: './practise.component.html',
    styleUrls: ['./practise.component.scss']
})
export class PractiseComponent implements OnInit {
    
    public words: WordModel[];
    public currentWordIndex: number;
    public answer: string;
    public fromEnglish: boolean = true;

    public isUpdating$: Observable<boolean>;

    private wordsSubscription: Subscription;
	
	constructor(private wordsFacade: WordsFacade, private snackbarService: SnackbarService) {
		this.isUpdating$ = wordsFacade.isUpdating$();
	}

	ngOnInit() {
        this._init();

        this.wordsSubscription = this.wordsFacade.getWords$().subscribe(words => {
            if (words) {
                this.words = words;
                this.currentWordIndex = 0;
            } 
        });

        document.addEventListener ("keydown", event => {
            if (event.code === "Enter") {
                this.submit();
            }
        });
    }

    public submit(): void {
        let word = this.words[this.currentWordIndex];
        var correct = false;

        if (this.fromEnglish) {
            word.translation.split(',').forEach(availableAnswer => {
                if (this.answer === availableAnswer.trim()) {
                    this.correct();
                    correct = true;
                    return;
                }
            }); 
        } else {
            if (this.answer === word.text.trim()) {
                this.correct();
                correct = true;
                return;
            }
        } 

        if (!correct) {
            this.wrong(this.fromEnglish ? word.translation : word.text);
        }
    }    

    public correct(): void {
        this.snackbarService.showSuccsessSnackbar("Correct!");
        this.nextWord();   
    }

    public wrong(correctAnswer: string): void {
        this.snackbarService.showErrorSnackbar("Wrong! Correct answer - " + correctAnswer, 2);
        this.nextWord(); 
    }

    public nextWord(): void {
        setTimeout(() => {
            if (this.currentWordIndex + 1 == this.words.length) {
                this._init();
                this.answer = null;
            } else {
                this.currentWordIndex++;
                this.answer = null;
            }  
        }, 1000);   
    }

    public changeMode(fromEnglish: boolean): void {
        if (this.fromEnglish != fromEnglish) {
            this.fromEnglish = fromEnglish;
            this._init();
        }   
    }

    private _init(): void {
        this.wordsFacade.loadWords({
            languageId: WestLanguagesState.languageId,
            take: 10,
            randomOrder: true
        } as WordsListQuery);   

        if (!this.wordsSubscription) {
            
        } else {
            
        }   
    }
}