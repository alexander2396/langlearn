import { CoreFacade } from './core/core.facade';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { LanguageModel } from './core/models/west-languages/language.model';
import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	public selectedLanguage: LanguageModel;
	public languages: Observable<LanguageModel[]> = this.coreFacade.getLanguages$();
	public isUpdating$: Observable<boolean>;
	
	constructor(private coreFacade: CoreFacade) {
		this.isUpdating$ = coreFacade.isUpdating$();
	}

	ngOnInit() {
		this.coreFacade.loadLanguages();
	}
}