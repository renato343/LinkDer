import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFrameworkLinkder } from 'app/shared/model/framework-linkder.model';

@Component({
    selector: 'jhi-framework-linkder-detail',
    templateUrl: './framework-linkder-detail.component.html'
})
export class FrameworkLinkderDetailComponent implements OnInit {
    framework: IFrameworkLinkder;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ framework }) => {
            this.framework = framework;
        });
    }

    previousState() {
        window.history.back();
    }
}
