import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPositionLinkder } from 'app/shared/model/position-linkder.model';

type EntityResponseType = HttpResponse<IPositionLinkder>;
type EntityArrayResponseType = HttpResponse<IPositionLinkder[]>;

@Injectable({ providedIn: 'root' })
export class PositionLinkderService {
    public resourceUrl = SERVER_API_URL + 'api/positions';

    constructor(private http: HttpClient) {}

    create(position: IPositionLinkder): Observable<EntityResponseType> {
        return this.http.post<IPositionLinkder>(this.resourceUrl, position, { observe: 'response' });
    }

    update(position: IPositionLinkder): Observable<EntityResponseType> {
        return this.http.put<IPositionLinkder>(this.resourceUrl, position, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPositionLinkder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPositionLinkder[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
