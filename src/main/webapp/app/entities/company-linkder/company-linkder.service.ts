import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICompanyLinkder } from 'app/shared/model/company-linkder.model';

type EntityResponseType = HttpResponse<ICompanyLinkder>;
type EntityArrayResponseType = HttpResponse<ICompanyLinkder[]>;

@Injectable({ providedIn: 'root' })
export class CompanyLinkderService {
    public resourceUrl = SERVER_API_URL + 'api/companies';

    constructor(private http: HttpClient) {}

    create(company: ICompanyLinkder): Observable<EntityResponseType> {
        return this.http.post<ICompanyLinkder>(this.resourceUrl, company, { observe: 'response' });
    }

    update(company: ICompanyLinkder): Observable<EntityResponseType> {
        return this.http.put<ICompanyLinkder>(this.resourceUrl, company, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICompanyLinkder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICompanyLinkder[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
