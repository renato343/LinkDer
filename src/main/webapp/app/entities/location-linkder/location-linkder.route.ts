import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LocationLinkder } from 'app/shared/model/location-linkder.model';
import { LocationLinkderService } from './location-linkder.service';
import { LocationLinkderComponent } from './location-linkder.component';
import { LocationLinkderDetailComponent } from './location-linkder-detail.component';
import { LocationLinkderUpdateComponent } from './location-linkder-update.component';
import { LocationLinkderDeletePopupComponent } from './location-linkder-delete-dialog.component';
import { ILocationLinkder } from 'app/shared/model/location-linkder.model';

@Injectable({ providedIn: 'root' })
export class LocationLinkderResolve implements Resolve<ILocationLinkder> {
    constructor(private service: LocationLinkderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LocationLinkder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<LocationLinkder>) => response.ok),
                map((location: HttpResponse<LocationLinkder>) => location.body)
            );
        }
        return of(new LocationLinkder());
    }
}

export const locationRoute: Routes = [
    {
        path: 'location-linkder',
        component: LocationLinkderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.location.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'location-linkder/:id/view',
        component: LocationLinkderDetailComponent,
        resolve: {
            location: LocationLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.location.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'location-linkder/new',
        component: LocationLinkderUpdateComponent,
        resolve: {
            location: LocationLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.location.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'location-linkder/:id/edit',
        component: LocationLinkderUpdateComponent,
        resolve: {
            location: LocationLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.location.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const locationPopupRoute: Routes = [
    {
        path: 'location-linkder/:id/delete',
        component: LocationLinkderDeletePopupComponent,
        resolve: {
            location: LocationLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.location.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
