import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { NgModule } from '@angular/core';
import { WordsListComponent } from './components/words/words-list.component';
import { WestLanguagesComponent } from './components/west-languages.component';
import { PractiseComponent } from './components/practise/practise.component';

const routes: Routes = [
	{ 
		path: ':languageId',
		component: WestLanguagesComponent,
		children: [
			{ path: '', component: WordsListComponent },
			{ path: 'words', component: WordsListComponent },
			{ path: 'practise', component: PractiseComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class WestLanguagesRoutingModule { }