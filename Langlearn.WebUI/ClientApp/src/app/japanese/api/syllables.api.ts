import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SyllablesListQuery } from '../models/syllablesListQuery';
import { SyllableModel } from 'src/app/core/models/japanese/syllable.model';

@Injectable()
export class SyllablesApi {

    private readonly API = environment.apiPath + '/api/japanese/syllables/';

    constructor(private http: HttpClient) {}

    public getList(query: SyllablesListQuery): Observable<SyllableModel[]> {
        let params = new HttpParams().set('syllabaryType', query.syllabaryType.toString());

        if (query.skip) {
            params = params.set('skip', query.skip.toString());
        }

        if (query.take) {
            params = params.set('take', query.take.toString());
        }

        if (query.randomOrder) {
            params = params.set('randomOrder', query.randomOrder.toString());
        }

        if (query.activeOnly) {
            params = params.set('activeOnly', query.activeOnly.toString());
        }

        return this.http.get<SyllableModel[]>(this.API + 'getList', { params: params });
    }

    public toggleIsActive(id: number): Observable<any> {
        return this.http.post(this.API + 'toggleIsActive?id=' + id, null);
    }
}