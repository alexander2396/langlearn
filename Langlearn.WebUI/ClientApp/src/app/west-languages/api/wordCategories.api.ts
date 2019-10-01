import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WordCategoriesListQuery } from '../models/wordCategoriesListQuery';
import { WordCategoriesListModel } from '../models/wordCategoriesListModel';
import { WordCategoryModel } from 'src/app/core/models/west-languages/wordCategory.model';

@Injectable()
export class WordCategoriesApi {

    private readonly API = environment.apiPath + '/api/westLanguages/wordCategories/';

    constructor(private http: HttpClient) {}

    public getList(query: WordCategoriesListQuery): Observable<WordCategoriesListModel> {
        let params = new HttpParams().set('languageId', query.languageId.toString());

        if (query.skip) {
            params = params.set('skip', query.skip.toString());
        }

        if (query.take) {
            params = params.set('take', query.take.toString());
        }

        return this.http.get<WordCategoriesListModel>(this.API + 'getList', { params: params });
    }

    public get(id: number): Observable<WordCategoryModel> {
        return this.http.get<WordCategoryModel>(this.API + 'get?id=' + id);
    }
    
    public create(word: WordCategoryModel): Observable<any> {
        return this.http.post<WordCategoryModel>(this.API + 'create', word);
    }

    public update(word: WordCategoryModel): Observable<any> {
        return this.http.put<WordCategoryModel>(this.API + 'update', word);
    }

    public delete(id: number): Observable<any> {
        return this.http.delete<WordCategoryModel>(this.API + 'delete?id=' + id);
    }
}