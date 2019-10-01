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
import { WordsPractiseComponent } from './components/practise/words-practise.component';
import { WordCategoriesListComponent } from './components/word-categories/word-categories-list.component';
import { WordCategoriesApi } from './api/wordCategories.api';
import { WordCategoriesState } from './state/word-categories.state';
import { WordCategoriesFacade } from './facade/word-categories.facade';
import { WordCategoryDialog } from './components/word-categories/word-category-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        WestLanguagesRoutingModule,
        SharedModule
    ],
    declarations: [
        WestLanguagesComponent,
        WordsListComponent, WordDialog, WordsPractiseComponent,
        WordCategoriesListComponent, WordCategoryDialog
    ],
    entryComponents: [
        WordDialog,
        WordCategoryDialog
    ],
    providers: [
        WordsApi, WordsState, WordsFacade,
        WordCategoriesApi, WordCategoriesState, WordCategoriesFacade
    ],
    bootstrap: [WestLanguagesComponent]
})
export class WestLanguagesModule { }
