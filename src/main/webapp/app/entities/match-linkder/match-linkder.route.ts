import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MatchLinkder } from 'app/shared/model/match-linkder.model';
import { MatchLinkderService } from './match-linkder.service';
import { MatchLinkderComponent } from './match-linkder.component';
import { MatchLinkderDetailComponent } from './match-linkder-detail.component';
import { MatchLinkderUpdateComponent } from './match-linkder-update.component';
import { MatchLinkderDeletePopupComponent } from './match-linkder-delete-dialog.component';
import { IMatchLinkder } from 'app/shared/model/match-linkder.model';

@Injectable({ providedIn: 'root' })
export class MatchLinkderResolve implements Resolve<IMatchLinkder> {
    constructor(private service: MatchLinkderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MatchLinkder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MatchLinkder>) => response.ok),
                map((match: HttpResponse<MatchLinkder>) => match.body)
            );
        }
        return of(new MatchLinkder());
    }
}

export const matchRoute: Routes = [
    {
        path: 'match-linkder',
        component: MatchLinkderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.match.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'match-linkder/:id/view',
        component: MatchLinkderDetailComponent,
        resolve: {
            match: MatchLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.match.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'match-linkder/new',
        component: MatchLinkderUpdateComponent,
        resolve: {
            match: MatchLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.match.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'match-linkder/:id/edit',
        component: MatchLinkderUpdateComponent,
        resolve: {
            match: MatchLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.match.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const matchPopupRoute: Routes = [
    {
        path: 'match-linkder/:id/delete',
        component: MatchLinkderDeletePopupComponent,
        resolve: {
            match: MatchLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.match.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
