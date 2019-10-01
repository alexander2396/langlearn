import { NgModule, Type } from "@angular/core";
import {
    MatMenuModule, MatToolbarModule, MatButtonModule, MatCardModule, MatSidenavModule, MatTableModule, MatDialogModule, MatInputModule, MatIconModule, MatSnackBarModule, MatGridListModule, MatButtonToggleModule, MatProgressSpinnerModule, MatRippleModule, MatSlideToggleModule, MatPaginatorModule, MatSortModule, MatTooltipModule, MatSelectModule
} from "@angular/material";

const modules: Type<any>[] = [
    MatMenuModule, MatToolbarModule, MatButtonModule, MatCardModule, MatSidenavModule, MatTableModule, MatDialogModule,
    MatInputModule, MatIconModule, MatSnackBarModule, MatGridListModule, MatButtonToggleModule, MatProgressSpinnerModule,
    MatRippleModule, MatSlideToggleModule, MatPaginatorModule, MatSortModule, MatTooltipModule, MatSelectModule
];

@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule { }