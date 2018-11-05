import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CandidateLinkder } from 'app/shared/model/candidate-linkder.model';
import { CandidateLinkderService } from './candidate-linkder.service';
import { CandidateLinkderComponent } from './candidate-linkder.component';
import { CandidateLinkderDetailComponent } from './candidate-linkder-detail.component';
import { CandidateLinkderUpdateComponent } from './candidate-linkder-update.component';
import { CandidateLinkderDeletePopupComponent } from './candidate-linkder-delete-dialog.component';
import { ICandidateLinkder } from 'app/shared/model/candidate-linkder.model';

@Injectable({ providedIn: 'root' })
export class CandidateLinkderResolve implements Resolve<ICandidateLinkder> {
    constructor(private service: CandidateLinkderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CandidateLinkder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CandidateLinkder>) => response.ok),
                map((candidate: HttpResponse<CandidateLinkder>) => candidate.body)
            );
        }
        return of(new CandidateLinkder());
    }
}

export const candidateRoute: Routes = [
    {
        path: 'candidate-linkder',
        component: CandidateLinkderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.candidate.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'candidate-linkder/:id/view',
        component: CandidateLinkderDetailComponent,
        resolve: {
            candidate: CandidateLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.candidate.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'candidate-linkder/new',
        component: CandidateLinkderUpdateComponent,
        resolve: {
            candidate: CandidateLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.candidate.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'candidate-linkder/:id/edit',
        component: CandidateLinkderUpdateComponent,
        resolve: {
            candidate: CandidateLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.candidate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const candidatePopupRoute: Routes = [
    {
        path: 'candidate-linkder/:id/delete',
        component: CandidateLinkderDeletePopupComponent,
        resolve: {
            candidate: CandidateLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.candidate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
