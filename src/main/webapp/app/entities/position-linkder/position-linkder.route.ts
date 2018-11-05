import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PositionLinkder } from 'app/shared/model/position-linkder.model';
import { PositionLinkderService } from './position-linkder.service';
import { PositionLinkderComponent } from './position-linkder.component';
import { PositionLinkderDetailComponent } from './position-linkder-detail.component';
import { PositionLinkderUpdateComponent } from './position-linkder-update.component';
import { PositionLinkderDeletePopupComponent } from './position-linkder-delete-dialog.component';
import { IPositionLinkder } from 'app/shared/model/position-linkder.model';

@Injectable({ providedIn: 'root' })
export class PositionLinkderResolve implements Resolve<IPositionLinkder> {
    constructor(private service: PositionLinkderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PositionLinkder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PositionLinkder>) => response.ok),
                map((position: HttpResponse<PositionLinkder>) => position.body)
            );
        }
        return of(new PositionLinkder());
    }
}

export const positionRoute: Routes = [
    {
        path: 'position-linkder',
        component: PositionLinkderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.position.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'position-linkder/:id/view',
        component: PositionLinkderDetailComponent,
        resolve: {
            position: PositionLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.position.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'position-linkder/new',
        component: PositionLinkderUpdateComponent,
        resolve: {
            position: PositionLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.position.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'position-linkder/:id/edit',
        component: PositionLinkderUpdateComponent,
        resolve: {
            position: PositionLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.position.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const positionPopupRoute: Routes = [
    {
        path: 'position-linkder/:id/delete',
        component: PositionLinkderDeletePopupComponent,
        resolve: {
            position: PositionLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.position.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
