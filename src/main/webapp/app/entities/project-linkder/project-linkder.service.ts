import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProjectLinkder } from 'app/shared/model/project-linkder.model';

type EntityResponseType = HttpResponse<IProjectLinkder>;
type EntityArrayResponseType = HttpResponse<IProjectLinkder[]>;

@Injectable({ providedIn: 'root' })
export class ProjectLinkderService {
    public resourceUrl = SERVER_API_URL + 'api/projects';

    constructor(private http: HttpClient) {}

    create(project: IProjectLinkder): Observable<EntityResponseType> {
        return this.http.post<IProjectLinkder>(this.resourceUrl, project, { observe: 'response' });
    }

    update(project: IProjectLinkder): Observable<EntityResponseType> {
        return this.http.put<IProjectLinkder>(this.resourceUrl, project, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProjectLinkder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProjectLinkder[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
