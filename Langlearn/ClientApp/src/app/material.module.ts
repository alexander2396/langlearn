import { NgModule, Type } from "@angular/core";
import {
    MatMenuModule, MatToolbarModule, MatButtonModule, MatCardModule, MatSidenavModule
} from "@angular/material";

const modules: Type<any>[] = [
    MatMenuModule, MatToolbarModule, MatButtonModule, MatCardModule, MatSidenavModule
];

@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule { }