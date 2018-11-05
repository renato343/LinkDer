import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LanguageLinkder } from 'app/shared/model/language-linkder.model';
import { LanguageLinkderService } from './language-linkder.service';
import { LanguageLinkderComponent } from './language-linkder.component';
import { LanguageLinkderDetailComponent } from './language-linkder-detail.component';
import { LanguageLinkderUpdateComponent } from './language-linkder-update.component';
import { LanguageLinkderDeletePopupComponent } from './language-linkder-delete-dialog.component';
import { ILanguageLinkder } from 'app/shared/model/language-linkder.model';

@Injectable({ providedIn: 'root' })
export class LanguageLinkderResolve implements Resolve<ILanguageLinkder> {
    constructor(private service: LanguageLinkderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LanguageLinkder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<LanguageLinkder>) => response.ok),
                map((language: HttpResponse<LanguageLinkder>) => language.body)
            );
        }
        return of(new LanguageLinkder());
    }
}

export const languageRoute: Routes = [
    {
        path: 'language-linkder',
        component: LanguageLinkderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.language.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'language-linkder/:id/view',
        component: LanguageLinkderDetailComponent,
        resolve: {
            language: LanguageLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.language.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'language-linkder/new',
        component: LanguageLinkderUpdateComponent,
        resolve: {
            language: LanguageLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.language.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'language-linkder/:id/edit',
        component: LanguageLinkderUpdateComponent,
        resolve: {
            language: LanguageLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.language.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const languagePopupRoute: Routes = [
    {
        path: 'language-linkder/:id/delete',
        component: LanguageLinkderDeletePopupComponent,
        resolve: {
            language: LanguageLinkderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'linkderApp.language.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
