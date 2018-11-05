import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILocationLinkder } from 'app/shared/model/location-linkder.model';

type EntityResponseType = HttpResponse<ILocationLinkder>;
type EntityArrayResponseType = HttpResponse<ILocationLinkder[]>;

@Injectable({ providedIn: 'root' })
export class LocationLinkderService {
    public resourceUrl = SERVER_API_URL + 'api/locations';

    constructor(private http: HttpClient) {}

    create(location: ILocationLinkder): Observable<EntityResponseType> {
        return this.http.post<ILocationLinkder>(this.resourceUrl, location, { observe: 'response' });
    }

    update(location: ILocationLinkder): Observable<EntityResponseType> {
        return this.http.put<ILocationLinkder>(this.resourceUrl, location, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ILocationLinkder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILocationLinkder[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
