import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WestLanguagesState } from '../state/west-languages.state';

@Component({
	selector: 'app-root',
	templateUrl: './west-languages.component.html',
	styleUrls: ['./west-languages.component.scss']
})
export class WestLanguagesComponent implements OnInit {

	constructor(
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.route.paramMap.subscribe(p => {
			WestLanguagesState.languageId = Number(p.get('languageId'));
		});
	}
}
