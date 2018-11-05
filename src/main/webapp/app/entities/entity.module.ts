import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LinkderCandidateLinkderModule } from './candidate-linkder/candidate-linkder.module';
import { LinkderCompanyLinkderModule } from './company-linkder/company-linkder.module';
import { LinkderProjectLinkderModule } from './project-linkder/project-linkder.module';
import { LinkderLanguageLinkderModule } from './language-linkder/language-linkder.module';
import { LinkderFrameworkLinkderModule } from './framework-linkder/framework-linkder.module';
import { LinkderLocationLinkderModule } from './location-linkder/location-linkder.module';
import { LinkderPositionLinkderModule } from './position-linkder/position-linkder.module';
import { LinkderMatchLinkderModule } from './match-linkder/match-linkder.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        LinkderCandidateLinkderModule,
        LinkderCompanyLinkderModule,
        LinkderProjectLinkderModule,
        LinkderLanguageLinkderModule,
        LinkderFrameworkLinkderModule,
        LinkderLocationLinkderModule,
        LinkderPositionLinkderModule,
        LinkderMatchLinkderModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LinkderEntityModule {}
