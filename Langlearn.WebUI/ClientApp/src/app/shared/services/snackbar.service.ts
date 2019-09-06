import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material';
import { GenericSnackbarComponent } from '../components/snackbars/generic-snackbar.component';
import { SnackbarData } from '../components/snackbars/SnackbarData';

@Injectable()
export class SnackbarService {
    constructor(private snackBar: MatSnackBar) {}

    public showSuccsessSnackbar(message: string): void {
        this.snackBar.openFromComponent(GenericSnackbarComponent, {
            duration: 1 * 1000,
            data: { text: message, icon: 'done' } as SnackbarData,
            panelClass: 'positive-snackbar',
            verticalPosition: 'top',
            horizontalPosition: 'center'
        });
    }

    public showWarningSnackbar(message: string): void {
        this.snackBar.openFromComponent(GenericSnackbarComponent, {
            duration: 1 * 1000,
            data: { text: message, icon: 'warning' } as SnackbarData,
            panelClass: 'warning-snackbar',
            verticalPosition: 'top',
            horizontalPosition: 'center'
        });
    }

    public showErrorSnackbar(message: string, durationSec: number): void {
        this.snackBar.openFromComponent(GenericSnackbarComponent, {
            duration: durationSec * 1000,
            data: { text: message, icon: 'error' } as SnackbarData,
            panelClass: 'negative-snackbar',
            verticalPosition: 'top',
            horizontalPosition: 'center'
        });
    }
}