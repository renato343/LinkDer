import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LinkderSharedModule } from 'app/shared';
import {
    LocationLinkderComponent,
    LocationLinkderDetailComponent,
    LocationLinkderUpdateComponent,
    LocationLinkderDeletePopupComponent,
    LocationLinkderDeleteDialogComponent,
    locationRoute,
    locationPopupRoute
} from './';

const ENTITY_STATES = [...locationRoute, ...locationPopupRoute];

@NgModule({
    imports: [LinkderSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LocationLinkderComponent,
        LocationLinkderDetailComponent,
        LocationLinkderUpdateComponent,
        LocationLinkderDeleteDialogComponent,
        LocationLinkderDeletePopupComponent
    ],
    entryComponents: [
        LocationLinkderComponent,
        LocationLinkderUpdateComponent,
        LocationLinkderDeleteDialogComponent,
        LocationLinkderDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LinkderLocationLinkderModule {}
