import { NgModule } from '@angular/core';
import { WordsListComponent } from './components/words/words-list.component';
import { WestLanguagesRoutingModule } from './west-languages-routing.module';
import { MaterialModule } from '../material.module';
import { WestLanguagesComponent } from './west-languages.component';

@NgModule({
    imports: [
        WestLanguagesRoutingModule,
        MaterialModule
    ],
    declarations: [
        WestLanguagesComponent,
        WordsListComponent
    ],
    providers: [],
    bootstrap: [WestLanguagesComponent]
})
export class WestLanguagesModule { }
