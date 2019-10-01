import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';
import { Question } from './models/question';
import { Observable } from 'rxjs';
import { SnackbarService } from '../../services/snackbar.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material';
import { WordDialog } from 'src/app/west-languages/components/words/word-dialog.component';
import { PracticeResultsDialogData } from './models/practiceResultsDialogData';
import { PracticeResultsDialog } from './dialogs/practice-results-dialog.component';
import { PracticeResult } from 'src/app/core/models/practiceResult';

@Component({
    selector: 'practice',
    templateUrl: './practise.component.html',
    styleUrls: ['./practise.component.scss']
})
export class PractiseComponent implements OnInit {

    @Input() public title: string;
    @Input() public btnTitle = "From english";
    @Input() public reverseBtnTitle = "From russian";
    @Input() public fontSize = 24;
    @Input() public questions: Question[];
    @Output() public complete = new EventEmitter<PracticeResult>();

    public currentQuestionIndex: number = 0;
    public answer: string;
    public reverse: boolean = false;
    public locked = false;

    private correctIds: number[] = [];
    private wrondIds: number[] = [];

	constructor(private snackbarService: SnackbarService, private dialog: MatDialog) {

    }
    
    ngOnInit() {
        document.addEventListener ("keydown", event => {
            if (event.code === "Enter" && this.answer && !this.locked) {
                this.submit();
            }
        });
    }

    public submit(): void {
        let word = this.questions[this.currentQuestionIndex];
        var correct = false;

        if (!this.reverse) {
            word.translation.split(',').forEach(availableAnswer => {
                if (this.answer.toLowerCase() === availableAnswer.toLowerCase().trim()) {
                    this.correct(word.id);
                    correct = true;
                    return;
                }
            }); 
        } else {
            if (this.answer.toLowerCase() === word.text.toLowerCase().trim()) {
                this.correct(word.id);
                correct = true;
                return;
            }
        } 

        if (!correct) {
            this.wrong(word.id, this.reverse ? word.text : word.translation);
        }
    }    

    public correct(id: number): void {
        this.correctIds.push(id);
        this.snackbarService.showSuccsessSnackbar("Correct!");
        this.nextWord();   
    }

    public wrong(id: number, correctAnswer: string): void {
        this.wrondIds.push(id);
        this.snackbarService.showErrorSnackbar("Wrong! Correct answer: " + correctAnswer, 2);
        this.nextWord(); 
    }

    public nextWord(): void {
        this.locked = true;
        setTimeout(() => {
            if (this.currentQuestionIndex + 1 == this.questions.length) {

                this.dialog.open(PracticeResultsDialog, {
                    width: '500px',
                    data: { correctCount: this.correctIds.length, totalCount: this.questions.length } as PracticeResultsDialogData
                });

                this.complete.next({ correct: this.correctIds, wrong: this.wrondIds } as PracticeResult);
                this._reload();                
            } else {
                this.currentQuestionIndex++;
                this.answer = null;
            }  
            this.locked = false;
        }, 1000);   
    }

    public changeMode(reverse: boolean): void {
        if (this.reverse != reverse) {
            this.reverse = reverse;
        }   
    }

    public playSpeech(text: string): void {
        var audio = new Audio();
		audio.src = `${environment.apiPath}/Assets/Mp3/${text}.mp3`;
		audio.load();
		audio.play();
    }

    private _reload(): void {
        this.answer = null;
        this.currentQuestionIndex = 0;
        this.correctIds = [];
        this.wrondIds = [];
    }
}