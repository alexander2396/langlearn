import { NgModule } from '@angular/core';
import { WordsListComponent } from './components/words/words-list.component';
import { WestLanguagesRoutingModule } from './west-languages-routing.module';
import { WestLanguagesComponent } from './components/west-languages.component';
import { WordsApi } from './api/words.api';
import { WordsState } from './state/words.state';
import { WordsFacade } from './facade/words.facade';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { WordDialog } from './components/words/word-dialog.component';
import { PractiseComponent } from './components/practise/practise.component';

@NgModule({
    imports: [
        CommonModule,
        WestLanguagesRoutingModule,
        SharedModule
    ],
    declarations: [
        WestLanguagesComponent,
        WordsListComponent,
        WordDialog,
        PractiseComponent
    ],
    entryComponents: [
        WordDialog
    ],
    providers: [
        WordsApi, WordsState, WordsFacade
    ],
    bootstrap: [WestLanguagesComponent]
})
export class WestLanguagesModule { }
