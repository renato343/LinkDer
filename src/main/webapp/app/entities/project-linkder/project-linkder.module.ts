import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LinkderSharedModule } from 'app/shared';
import {
    ProjectLinkderComponent,
    ProjectLinkderDetailComponent,
    ProjectLinkderUpdateComponent,
    ProjectLinkderDeletePopupComponent,
    ProjectLinkderDeleteDialogComponent,
    projectRoute,
    projectPopupRoute
} from './';

const ENTITY_STATES = [...projectRoute, ...projectPopupRoute];

@NgModule({
    imports: [LinkderSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProjectLinkderComponent,
        ProjectLinkderDetailComponent,
        ProjectLinkderUpdateComponent,
        ProjectLinkderDeleteDialogComponent,
        ProjectLinkderDeletePopupComponent
    ],
    entryComponents: [
        ProjectLinkderComponent,
        ProjectLinkderUpdateComponent,
        ProjectLinkderDeleteDialogComponent,
        ProjectLinkderDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LinkderProjectLinkderModule {}
