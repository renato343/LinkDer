import { IProjectLinkder } from 'app/shared/model//project-linkder.model';
import { ILocationLinkder } from 'app/shared/model//location-linkder.model';
import { ILanguageLinkder } from 'app/shared/model//language-linkder.model';
import { IFrameworkLinkder } from 'app/shared/model//framework-linkder.model';

export interface ICandidateLinkder {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    skype?: string;
    linkdin?: string;
    salary?: number;
    project?: IProjectLinkder;
    location?: ILocationLinkder;
    languages?: ILanguageLinkder[];
    frameworks?: IFrameworkLinkder[];
}

export class CandidateLinkder implements ICandidateLinkder {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public phoneNumber?: string,
        public skype?: string,
        public linkdin?: string,
        public salary?: number,
        public project?: IProjectLinkder,
        public location?: ILocationLinkder,
        public languages?: ILanguageLinkder[],
        public frameworks?: IFrameworkLinkder[]
    ) {}
}
