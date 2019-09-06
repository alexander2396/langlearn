import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LanguageModel } from '../models/west-languages/language.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class LanguagesApi {
    readonly API = environment.apiPath + '/api/westLanguages/languages/';

    constructor(private http: HttpClient) {}

    getAll(): Observable<LanguageModel[]> {
        return this.http.get<LanguageModel[]>(this.API + 'getAll');
    }
}