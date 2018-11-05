import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFrameworkLinkder } from 'app/shared/model/framework-linkder.model';

type EntityResponseType = HttpResponse<IFrameworkLinkder>;
type EntityArrayResponseType = HttpResponse<IFrameworkLinkder[]>;

@Injectable({ providedIn: 'root' })
export class FrameworkLinkderService {
    public resourceUrl = SERVER_API_URL + 'api/frameworks';

    constructor(private http: HttpClient) {}

    create(framework: IFrameworkLinkder): Observable<EntityResponseType> {
        return this.http.post<IFrameworkLinkder>(this.resourceUrl, framework, { observe: 'response' });
    }

    update(framework: IFrameworkLinkder): Observable<EntityResponseType> {
        return this.http.put<IFrameworkLinkder>(this.resourceUrl, framework, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFrameworkLinkder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFrameworkLinkder[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
