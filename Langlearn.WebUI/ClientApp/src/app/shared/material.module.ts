import { NgModule, Type } from "@angular/core";
import {
    MatMenuModule, MatToolbarModule, MatButtonModule, MatCardModule, MatSidenavModule, MatTableModule, MatDialogModule, MatInputModule, MatIconModule, MatSnackBarModule, MatGridListModule, MatButtonToggleModule, MatProgressSpinnerModule
} from "@angular/material";

const modules: Type<any>[] = [
    MatMenuModule, MatToolbarModule, MatButtonModule, MatCardModule, MatSidenavModule, MatTableModule, MatDialogModule,
    MatInputModule, MatIconModule, MatSnackBarModule, MatGridListModule, MatButtonToggleModule, MatProgressSpinnerModule
];

@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule { }