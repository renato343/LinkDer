import { ILocationLinkder } from 'app/shared/model//location-linkder.model';
import { ILanguageLinkder } from 'app/shared/model//language-linkder.model';
import { IFrameworkLinkder } from 'app/shared/model//framework-linkder.model';
import { IProjectLinkder } from 'app/shared/model//project-linkder.model';

export interface IPositionLinkder {
    id?: number;
    name?: string;
    type?: string;
    minSalary?: number;
    maxSalary?: number;
    location?: ILocationLinkder;
    languages?: ILanguageLinkder[];
    frameworks?: IFrameworkLinkder[];
    project?: IProjectLinkder;
}

export class PositionLinkder implements IPositionLinkder {
    constructor(
        public id?: number,
        public name?: string,
        public type?: string,
        public minSalary?: number,
        public maxSalary?: number,
        public location?: ILocationLinkder,
        public languages?: ILanguageLinkder[],
        public frameworks?: IFrameworkLinkder[],
        public project?: IProjectLinkder
    ) {}
}
