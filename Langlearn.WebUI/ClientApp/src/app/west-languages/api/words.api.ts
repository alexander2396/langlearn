import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WordModel } from 'src/app/core/models/west-languages/word.model';
import { WordsListQuery } from '../components/models/wordsListQuery';

@Injectable()
export class WordsApi {

    private readonly API = environment.apiPath + '/api/westLanguages/words/';

    constructor(private http: HttpClient) {}

    public getAll(query: WordsListQuery): Observable<WordModel[]> {
        let params = new HttpParams().set('languageId', query.languageId.toString());

        if (query.skip) {
            params = params.set('skip', query.skip.toString());
        }

        if (query.take) {
            params = params.set('take', query.take.toString());
        }

        if (query.randomOrder) {
            params = params.set('randomOrder', query.randomOrder.toString());
        }

        return this.http.get<WordModel[]>(this.API + 'getAll', { params: params });
    }

    public get(id: number): Observable<WordModel> {
        return this.http.get<WordModel>(this.API + 'get?id=' + id);
    }
    
    public create(word: WordModel): Observable<any> {
        return this.http.post<WordModel>(this.API + 'create', word);
    }

    public update(word: WordModel): Observable<any> {
        return this.http.put<WordModel>(this.API + 'update', word);
    }

    public delete(id: number): Observable<any> {
        return this.http.delete<WordModel>(this.API + 'delete?id=' + id);
    }
}