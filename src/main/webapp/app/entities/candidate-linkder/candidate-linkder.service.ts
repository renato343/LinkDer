import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICandidateLinkder } from 'app/shared/model/candidate-linkder.model';

type EntityResponseType = HttpResponse<ICandidateLinkder>;
type EntityArrayResponseType = HttpResponse<ICandidateLinkder[]>;

@Injectable({ providedIn: 'root' })
export class CandidateLinkderService {
    public resourceUrl = SERVER_API_URL + 'api/candidates';

    constructor(private http: HttpClient) {}

    create(candidate: ICandidateLinkder): Observable<EntityResponseType> {
        return this.http.post<ICandidateLinkder>(this.resourceUrl, candidate, { observe: 'response' });
    }

    update(candidate: ICandidateLinkder): Observable<EntityResponseType> {
        return this.http.put<ICandidateLinkder>(this.resourceUrl, candidate, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICandidateLinkder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICandidateLinkder[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
