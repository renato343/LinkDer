export interface IMatchLinkder {
    id?: number;
    candidate?: number;
    candidateBool?: boolean;
    project?: number;
    projectBool?: boolean;
}

export class MatchLinkder implements IMatchLinkder {
    constructor(
        public id?: number,
        public candidate?: number,
        public candidateBool?: boolean,
        public project?: number,
        public projectBool?: boolean
    ) {
        this.candidateBool = this.candidateBool || false;
        this.projectBool = this.projectBool || false;
    }
}
