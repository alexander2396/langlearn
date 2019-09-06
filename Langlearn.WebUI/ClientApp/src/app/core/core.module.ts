  
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreFacade } from './core.facade';
import { LanguagesApi } from './api/languages.api';
import { LanguagesState } from './state/languages.state';

@NgModule({
	imports: [
		HttpClientModule
	],
	declarations: [

	],
	providers: [
		LanguagesApi,
		LanguagesState,
		CoreFacade
	],
	exports: [
		
	]
})
export class CoreModule { }