import { ICandidateLinkder } from 'app/shared/model//candidate-linkder.model';
import { IProjectLinkder } from 'app/shared/model//project-linkder.model';
import { ILanguageLinkder } from 'app/shared/model//language-linkder.model';
import { IPositionLinkder } from 'app/shared/model//position-linkder.model';

export interface IFrameworkLinkder {
    id?: number;
    name?: string;
    version?: string;
    candidate?: ICandidateLinkder;
    project?: IProjectLinkder;
    language?: ILanguageLinkder;
    position?: IPositionLinkder;
}

export class FrameworkLinkder implements IFrameworkLinkder {
    constructor(
        public id?: number,
        public name?: string,
        public version?: string,
        public candidate?: ICandidateLinkder,
        public project?: IProjectLinkder,
        public language?: ILanguageLinkder,
        public position?: IPositionLinkder
    ) {}
}
