import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProjectLinkder } from 'app/shared/model/project-linkder.model';
import { ProjectLinkderService } from './project-linkder.service';
import { ProjectLinkderComponent } from './project-linkder.component';
import { ProjectLinkderDetailComponent } from './project-linkder-detail.component';
import { ProjectLinkderUpdateComponent } from './project-linkder-update.component';
import { ProjectLinkderDeletePopupComponent } from './project-linkder-delete-dialog.component';
import { IProjectLinkder } from 'app/shared/model/project-linkder.model';

@Injectable({ providedIn: 'root' })
export class ProjectLinkderResolve implements Resolve<IProjectLinkder> {
    constructor(private service: ProjectLinkderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProjectLinkder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ProjectLinkder>) => response.ok),
                map((project: HttpResponse<ProjectLinkder>) => project.body)
            );
        }
        return of(new ProjectLinkder());
    }
}

export const projectRoute: Routes = [
    {
        path: 'project-linkder',
        component: ProjectLinkderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.project.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'project-linkder/:id/view',
        component: ProjectLinkderDetailComponent,
        resolve: {
            project: ProjectLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.project.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'project-linkder/new',
        component: ProjectLinkderUpdateComponent,
        resolve: {
            project: ProjectLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.project.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'project-linkder/:id/edit',
        component: ProjectLinkderUpdateComponent,
        resolve: {
            project: ProjectLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.project.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const projectPopupRoute: Routes = [
    {
        path: 'project-linkder/:id/delete',
        component: ProjectLinkderDeletePopupComponent,
        resolve: {
            project: ProjectLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.project.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
