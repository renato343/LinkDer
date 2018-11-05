import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LinkderSharedModule } from 'app/shared';
import {
    MatchLinkderComponent,
    MatchLinkderDetailComponent,
    MatchLinkderUpdateComponent,
    MatchLinkderDeletePopupComponent,
    MatchLinkderDeleteDialogComponent,
    matchRoute,
    matchPopupRoute
} from './';

const ENTITY_STATES = [...matchRoute, ...matchPopupRoute];

@NgModule({
    imports: [LinkderSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MatchLinkderComponent,
        MatchLinkderDetailComponent,
        MatchLinkderUpdateComponent,
        MatchLinkderDeleteDialogComponent,
        MatchLinkderDeletePopupComponent
    ],
    entryComponents: [
        MatchLinkderComponent,
        MatchLinkderUpdateComponent,
        MatchLinkderDeleteDialogComponent,
        MatchLinkderDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LinkderMatchLinkderModule {}
