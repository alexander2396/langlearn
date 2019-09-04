import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { NgModule } from '@angular/core';
import { WordsListComponent } from './components/words/words-list.component';
import { WestLanguagesComponent } from './west-languages.component';

const routes: Routes = [
	{ 
		path: ':name',
		component: WestLanguagesComponent,
		children: [
			{ path: '', component: WordsListComponent },
			{ path: 'words', component: WordsListComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class WestLanguagesRoutingModule { }