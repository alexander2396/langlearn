import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { SnackbarData } from './SnackbarData';

@Component({
    selector: 'generic-snackbar',
    template: `
    <mat-grid-list cols="4">
        <mat-grid-tile>
            <mat-icon>{{data.icon}}</mat-icon>
        </mat-grid-tile>
        <mat-grid-tile colspan="3">
            <span>{{data.text}}</span>
        </mat-grid-tile>
    </mat-grid-list>
    `,
})
export class GenericSnackbarComponent {

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData) {
    }
}