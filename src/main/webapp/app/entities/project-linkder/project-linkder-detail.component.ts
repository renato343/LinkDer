import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProjectLinkder } from 'app/shared/model/project-linkder.model';

@Component({
    selector: 'jhi-project-linkder-detail',
    templateUrl: './project-linkder-detail.component.html'
})
export class ProjectLinkderDetailComponent implements OnInit {
    project: IProjectLinkder;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ project }) => {
            this.project = project;
        });
    }

    previousState() {
        window.history.back();
    }
}
