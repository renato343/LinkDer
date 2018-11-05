import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LinkderSharedModule } from 'app/shared';
import {
    FrameworkLinkderComponent,
    FrameworkLinkderDetailComponent,
    FrameworkLinkderUpdateComponent,
    FrameworkLinkderDeletePopupComponent,
    FrameworkLinkderDeleteDialogComponent,
    frameworkRoute,
    frameworkPopupRoute
} from './';

const ENTITY_STATES = [...frameworkRoute, ...frameworkPopupRoute];

@NgModule({
    imports: [LinkderSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FrameworkLinkderComponent,
        FrameworkLinkderDetailComponent,
        FrameworkLinkderUpdateComponent,
        FrameworkLinkderDeleteDialogComponent,
        FrameworkLinkderDeletePopupComponent
    ],
    entryComponents: [
        FrameworkLinkderComponent,
        FrameworkLinkderUpdateComponent,
        FrameworkLinkderDeleteDialogComponent,
        FrameworkLinkderDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LinkderFrameworkLinkderModule {}
