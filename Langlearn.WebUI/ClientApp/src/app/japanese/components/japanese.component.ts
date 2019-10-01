import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	templateUrl: './japanese.component.html',
	styleUrls: ['./japanese.component.scss']
})
export class JapaneseComponent implements OnInit {

	constructor(
		private route: ActivatedRoute
	) {}

	ngOnInit() {
	}
}
