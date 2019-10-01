import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { MatDialog } from '@angular/material';
import { SyllableModel } from 'src/app/core/models/japanese/syllable.model';
import { SyllablesFacade } from '../../facade/syllables.facade';
import { SyllablesListQuery } from '../../models/syllablesListQuery';
import { SyllabaryType } from 'src/app/core/enums/syllabaryType';
import { map } from 'rxjs/operators';

@Component({
	templateUrl: './syllables-list.component.html',
	styleUrls: ['./syllables-list.component.scss']
})
export class SyllablesListComponent implements OnInit {
	
	public SyllabaryType = SyllabaryType;

	public syllables: Observable<SyllableModel[]> = this.syllablesFacade.getSyllables$();
    public selectedSyllabaryType: SyllabaryType = SyllabaryType.Hiragana;
    public isUpdating$: Observable<boolean>;
    public displayedColumns: string[] = ['value', 'transliteration', 'actions'];
	
	constructor(private syllablesFacade: SyllablesFacade, private dialog: MatDialog) {
		this.isUpdating$ = syllablesFacade.isUpdating$();
	}

	ngOnInit() {
		this._load();
	}

	public toggleIsActive(syllable: SyllableModel): void {
		syllable.isActive = !syllable.isActive;
		this.syllablesFacade.toggleIsActive(syllable.id);
	}

	public changeSyllabaryType(type: SyllabaryType): void {
		if (this.selectedSyllabaryType != type) {
			this.selectedSyllabaryType = type;
			this._load();
		}
	}

	private _load(): void {
		this.syllablesFacade.loadSyllables(new SyllablesListQuery(this.selectedSyllabaryType));
	}
}