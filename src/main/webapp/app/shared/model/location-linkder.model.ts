import { ICandidateLinkder } from 'app/shared/model//candidate-linkder.model';
import { ICompanyLinkder } from 'app/shared/model//company-linkder.model';
import { IProjectLinkder } from 'app/shared/model//project-linkder.model';
import { IPositionLinkder } from 'app/shared/model//position-linkder.model';

export interface ILocationLinkder {
    id?: number;
    streetAddress?: string;
    city?: string;
    country?: string;
    candidate?: ICandidateLinkder;
    company?: ICompanyLinkder;
    project?: IProjectLinkder;
    position?: IPositionLinkder;
}

export class LocationLinkder implements ILocationLinkder {
    constructor(
        public id?: number,
        public streetAddress?: string,
        public city?: string,
        public country?: string,
        public candidate?: ICandidateLinkder,
        public company?: ICompanyLinkder,
        public project?: IProjectLinkder,
        public position?: IPositionLinkder
    ) {}
}
