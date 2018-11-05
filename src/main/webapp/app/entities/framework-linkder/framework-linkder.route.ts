import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FrameworkLinkder } from 'app/shared/model/framework-linkder.model';
import { FrameworkLinkderService } from './framework-linkder.service';
import { FrameworkLinkderComponent } from './framework-linkder.component';
import { FrameworkLinkderDetailComponent } from './framework-linkder-detail.component';
import { FrameworkLinkderUpdateComponent } from './framework-linkder-update.component';
import { FrameworkLinkderDeletePopupComponent } from './framework-linkder-delete-dialog.component';
import { IFrameworkLinkder } from 'app/shared/model/framework-linkder.model';

@Injectable({ providedIn: 'root' })
export class FrameworkLinkderResolve implements Resolve<IFrameworkLinkder> {
    constructor(private service: FrameworkLinkderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FrameworkLinkder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FrameworkLinkder>) => response.ok),
                map((framework: HttpResponse<FrameworkLinkder>) => framework.body)
            );
        }
        return of(new FrameworkLinkder());
    }
}

export const frameworkRoute: Routes = [
    {
        path: 'framework-linkder',
        component: FrameworkLinkderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.framework.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'framework-linkder/:id/view',
        component: FrameworkLinkderDetailComponent,
        resolve: {
            framework: FrameworkLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.framework.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'framework-linkder/new',
        component: FrameworkLinkderUpdateComponent,
        resolve: {
            framework: FrameworkLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.framework.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'framework-linkder/:id/edit',
        component: FrameworkLinkderUpdateComponent,
        resolve: {
            framework: FrameworkLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.framework.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const frameworkPopupRoute: Routes = [
    {
        path: 'framework-linkder/:id/delete',
        component: FrameworkLinkderDeletePopupComponent,
        resolve: {
            framework: FrameworkLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.framework.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
