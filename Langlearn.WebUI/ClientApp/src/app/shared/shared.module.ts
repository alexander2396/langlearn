import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ConfirmDialog } from './components/confirm-dialog.component';
import { GenericSnackbarComponent } from './components/snackbars/generic-snackbar.component';
import { SnackbarService } from './services/snackbar.service';
import { PractiseComponent } from './components/practice/practice.component';
import { PracticeResultsDialog } from './components/practice/dialogs/practice-results-dialog.component';

@NgModule({
    declarations: [
        ConfirmDialog,
        GenericSnackbarComponent,
        PractiseComponent,
        PracticeResultsDialog
    ],
    entryComponents: [
        ConfirmDialog,
        GenericSnackbarComponent,
        PracticeResultsDialog
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        FormsModule
    ],
    providers: [
        SnackbarService
    ],
    exports: [ReactiveFormsModule, CommonModule, MaterialModule, ConfirmDialog, FormsModule, PractiseComponent]
})
export class SharedModule { }
