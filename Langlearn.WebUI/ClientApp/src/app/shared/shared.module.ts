import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ConfirmDialog } from './components/confirm-dialog.component';
import { GenericSnackbarComponent } from './components/snackbars/generic-snackbar.component';
import { SnackbarService } from './services/snackbar.service';

@NgModule({
    declarations: [
        ConfirmDialog,
        GenericSnackbarComponent
    ],
    entryComponents: [
        ConfirmDialog,
        GenericSnackbarComponent
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
    exports: [ReactiveFormsModule, CommonModule, MaterialModule, ConfirmDialog, FormsModule]
})
export class SharedModule { }
