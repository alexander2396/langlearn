import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators'

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
		this.route.params.subscribe(p => console.log(p.name));
	}
}
