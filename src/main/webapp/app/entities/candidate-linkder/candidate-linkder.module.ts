import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LinkderSharedModule } from 'app/shared';
import {
    CandidateLinkderComponent,
    CandidateLinkderDetailComponent,
    CandidateLinkderUpdateComponent,
    CandidateLinkderDeletePopupComponent,
    CandidateLinkderDeleteDialogComponent,
    candidateRoute,
    candidatePopupRoute
} from './';

const ENTITY_STATES = [...candidateRoute, ...candidatePopupRoute];

@NgModule({
    imports: [LinkderSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CandidateLinkderComponent,
        CandidateLinkderDetailComponent,
        CandidateLinkderUpdateComponent,
        CandidateLinkderDeleteDialogComponent,
        CandidateLinkderDeletePopupComponent
    ],
    entryComponents: [
        CandidateLinkderComponent,
        CandidateLinkderUpdateComponent,
        CandidateLinkderDeleteDialogComponent,
        CandidateLinkderDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LinkderCandidateLinkderModule {}
