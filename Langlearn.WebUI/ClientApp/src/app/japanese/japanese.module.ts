import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { JapaneseRoutingModule } from './japanese-routing.module';
import { JapaneseComponent } from './components/japanese.component';
import { SyllablesApi } from './api/syllables.api';
import { SyllablesState } from './state/syllables.state';
import { SyllablesFacade } from './facade/syllables.facade';
import { SyllablesPractiseComponent } from './components/practice/syllables-practise.component';
import { SyllablesListComponent } from './components/syllables/syllables-list.component';

@NgModule({
    imports: [
        CommonModule,
        JapaneseRoutingModule,
        SharedModule
    ],
    declarations: [
        JapaneseComponent,
        SyllablesPractiseComponent,
        SyllablesListComponent
    ],
    entryComponents: [

    ],
    providers: [
        SyllablesApi, SyllablesState, SyllablesFacade
    ],
    bootstrap: [JapaneseComponent]
})
export class JapaneseModule { }
