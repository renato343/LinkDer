import { ILocationLinkder } from 'app/shared/model//location-linkder.model';
import { ILanguageLinkder } from 'app/shared/model//language-linkder.model';
import { IFrameworkLinkder } from 'app/shared/model//framework-linkder.model';
import { IPositionLinkder } from 'app/shared/model//position-linkder.model';
import { ICandidateLinkder } from 'app/shared/model//candidate-linkder.model';
import { ICompanyLinkder } from 'app/shared/model//company-linkder.model';

export interface IProjectLinkder {
    id?: number;
    projectName?: string;
    location?: ILocationLinkder;
    languages?: ILanguageLinkder[];
    frameworks?: IFrameworkLinkder[];
    positions?: IPositionLinkder[];
    candidate?: ICandidateLinkder;
    company?: ICompanyLinkder;
}

export class ProjectLinkder implements IProjectLinkder {
    constructor(
        public id?: number,
        public projectName?: string,
        public location?: ILocationLinkder,
        public languages?: ILanguageLinkder[],
        public frameworks?: IFrameworkLinkder[],
        public positions?: IPositionLinkder[],
        public candidate?: ICandidateLinkder,
        public company?: ICompanyLinkder
    ) {}
}
