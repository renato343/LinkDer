import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILanguageLinkder } from 'app/shared/model/language-linkder.model';

type EntityResponseType = HttpResponse<ILanguageLinkder>;
type EntityArrayResponseType = HttpResponse<ILanguageLinkder[]>;

@Injectable({ providedIn: 'root' })
export class LanguageLinkderService {
    public resourceUrl = SERVER_API_URL + 'api/languages';

    constructor(private http: HttpClient) {}

    create(language: ILanguageLinkder): Observable<EntityResponseType> {
        return this.http.post<ILanguageLinkder>(this.resourceUrl, language, { observe: 'response' });
    }

    update(language: ILanguageLinkder): Observable<EntityResponseType> {
        return this.http.put<ILanguageLinkder>(this.resourceUrl, language, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ILanguageLinkder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILanguageLinkder[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
