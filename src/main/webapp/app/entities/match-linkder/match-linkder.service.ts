import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMatchLinkder } from 'app/shared/model/match-linkder.model';

type EntityResponseType = HttpResponse<IMatchLinkder>;
type EntityArrayResponseType = HttpResponse<IMatchLinkder[]>;

@Injectable({ providedIn: 'root' })
export class MatchLinkderService {
    public resourceUrl = SERVER_API_URL + 'api/matches';

    constructor(private http: HttpClient) {}

    create(match: IMatchLinkder): Observable<EntityResponseType> {
        return this.http.post<IMatchLinkder>(this.resourceUrl, match, { observe: 'response' });
    }

    update(match: IMatchLinkder): Observable<EntityResponseType> {
        return this.http.put<IMatchLinkder>(this.resourceUrl, match, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMatchLinkder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMatchLinkder[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
