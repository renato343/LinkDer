import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LinkderSharedModule } from 'app/shared';
import {
    CompanyLinkderComponent,
    CompanyLinkderDetailComponent,
    CompanyLinkderUpdateComponent,
    CompanyLinkderDeletePopupComponent,
    CompanyLinkderDeleteDialogComponent,
    companyRoute,
    companyPopupRoute
} from './';

const ENTITY_STATES = [...companyRoute, ...companyPopupRoute];

@NgModule({
    imports: [LinkderSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CompanyLinkderComponent,
        CompanyLinkderDetailComponent,
        CompanyLinkderUpdateComponent,
        CompanyLinkderDeleteDialogComponent,
        CompanyLinkderDeletePopupComponent
    ],
    entryComponents: [
        CompanyLinkderComponent,
        CompanyLinkderUpdateComponent,
        CompanyLinkderDeleteDialogComponent,
        CompanyLinkderDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LinkderCompanyLinkderModule {}
