import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LinkderSharedModule } from 'app/shared';
import {
    LanguageLinkderComponent,
    LanguageLinkderDetailComponent,
    LanguageLinkderUpdateComponent,
    LanguageLinkderDeletePopupComponent,
    LanguageLinkderDeleteDialogComponent,
    languageRoute,
    languagePopupRoute
} from './';

const ENTITY_STATES = [...languageRoute, ...languagePopupRoute];

@NgModule({
    imports: [LinkderSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LanguageLinkderComponent,
        LanguageLinkderDetailComponent,
        LanguageLinkderUpdateComponent,
        LanguageLinkderDeleteDialogComponent,
        LanguageLinkderDeletePopupComponent
    ],
    entryComponents: [
        LanguageLinkderComponent,
        LanguageLinkderUpdateComponent,
        LanguageLinkderDeleteDialogComponent,
        LanguageLinkderDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LinkderLanguageLinkderModule {}
