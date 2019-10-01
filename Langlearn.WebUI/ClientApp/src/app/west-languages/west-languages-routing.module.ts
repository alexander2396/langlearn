import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { NgModule } from '@angular/core';
import { WordsListComponent } from './components/words/words-list.component';
import { WestLanguagesComponent } from './components/west-languages.component';
import { WordsPractiseComponent } from './components/practise/words-practise.component';
import { WordCategoriesListComponent } from './components/word-categories/word-categories-list.component';

const routes: Routes = [
	{ 
		path: ':languageId',
		component: WestLanguagesComponent,
		children: [
			{ path: '', component: WordsListComponent },
			{ path: 'words', component: WordsListComponent },
			{ path: 'practise', component: WordsPractiseComponent },
			{ path: 'word-categories', component: WordCategoriesListComponent },
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class WestLanguagesRoutingModule { }