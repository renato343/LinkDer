import { ILocationLinkder } from 'app/shared/model//location-linkder.model';
import { IProjectLinkder } from 'app/shared/model//project-linkder.model';

export interface ICompanyLinkder {
    id?: number;
    name?: string;
    location?: ILocationLinkder;
    projects?: IProjectLinkder[];
}

export class CompanyLinkder implements ICompanyLinkder {
    constructor(public id?: number, public name?: string, public location?: ILocationLinkder, public projects?: IProjectLinkder[]) {}
}
