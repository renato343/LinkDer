import { IFrameworkLinkder } from 'app/shared/model//framework-linkder.model';
import { ICandidateLinkder } from 'app/shared/model//candidate-linkder.model';
import { IProjectLinkder } from 'app/shared/model//project-linkder.model';
import { IPositionLinkder } from 'app/shared/model//position-linkder.model';

export interface ILanguageLinkder {
    id?: number;
    name?: string;
    version?: string;
    frameworks?: IFrameworkLinkder[];
    candidate?: ICandidateLinkder;
    project?: IProjectLinkder;
    position?: IPositionLinkder;
}

export class LanguageLinkder implements ILanguageLinkder {
    constructor(
        public id?: number,
        public name?: string,
        public version?: string,
        public frameworks?: IFrameworkLinkder[],
        public candidate?: ICandidateLinkder,
        public project?: IProjectLinkder,
        public position?: IPositionLinkder
    ) {}
}
