import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CompanyLinkder } from 'app/shared/model/company-linkder.model';
import { CompanyLinkderService } from './company-linkder.service';
import { CompanyLinkderComponent } from './company-linkder.component';
import { CompanyLinkderDetailComponent } from './company-linkder-detail.component';
import { CompanyLinkderUpdateComponent } from './company-linkder-update.component';
import { CompanyLinkderDeletePopupComponent } from './company-linkder-delete-dialog.component';
import { ICompanyLinkder } from 'app/shared/model/company-linkder.model';

@Injectable({ providedIn: 'root' })
export class CompanyLinkderResolve implements Resolve<ICompanyLinkder> {
    constructor(private service: CompanyLinkderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CompanyLinkder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CompanyLinkder>) => response.ok),
                map((company: HttpResponse<CompanyLinkder>) => company.body)
            );
        }
        return of(new CompanyLinkder());
    }
}

export const companyRoute: Routes = [
    {
        path: 'company-linkder',
        component: CompanyLinkderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.company.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'company-linkder/:id/view',
        component: CompanyLinkderDetailComponent,
        resolve: {
            company: CompanyLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.company.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'company-linkder/new',
        component: CompanyLinkderUpdateComponent,
        resolve: {
            company: CompanyLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.company.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'company-linkder/:id/edit',
        component: CompanyLinkderUpdateComponent,
        resolve: {
            company: CompanyLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.company.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const companyPopupRoute: Routes = [
    {
        path: 'company-linkder/:id/delete',
        component: CompanyLinkderDeletePopupComponent,
        resolve: {
            company: CompanyLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.company.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
