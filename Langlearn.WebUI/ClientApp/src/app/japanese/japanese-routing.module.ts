import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { NgModule } from '@angular/core';
import { JapaneseComponent } from './components/japanese.component';
import { SyllablesPractiseComponent } from './components/practice/syllables-practise.component';
import { SyllablesListComponent } from './components/syllables/syllables-list.component';

const routes: Routes = [
	{ 
		path: '',
		component: JapaneseComponent,
		children: [
			{ path: 'syllables', component: SyllablesListComponent },
			{ path: 'practise', component: SyllablesPractiseComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class JapaneseRoutingModule { }