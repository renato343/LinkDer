import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LinkderSharedModule } from 'app/shared';
import {
    PositionLinkderComponent,
    PositionLinkderDetailComponent,
    PositionLinkderUpdateComponent,
    PositionLinkderDeletePopupComponent,
    PositionLinkderDeleteDialogComponent,
    positionRoute,
    positionPopupRoute
} from './';

const ENTITY_STATES = [...positionRoute, ...positionPopupRoute];

@NgModule({
    imports: [LinkderSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PositionLinkderComponent,
        PositionLinkderDetailComponent,
        PositionLinkderUpdateComponent,
        PositionLinkderDeleteDialogComponent,
        PositionLinkderDeletePopupComponent
    ],
    entryComponents: [
        PositionLinkderComponent,
        PositionLinkderUpdateComponent,
        PositionLinkderDeleteDialogComponent,
        PositionLinkderDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LinkderPositionLinkderModule {}
