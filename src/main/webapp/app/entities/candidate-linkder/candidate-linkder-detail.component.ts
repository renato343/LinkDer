import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICandidateLinkder } from 'app/shared/model/candidate-linkder.model';

@Component({
    selector: 'jhi-candidate-linkder-detail',
    templateUrl: './candidate-linkder-detail.component.html'
})
export class CandidateLinkderDetailComponent implements OnInit {
    candidate: ICandidateLinkder;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ candidate }) => {
            this.candidate = candidate;
        });
    }

    previousState() {
        window.history.back();
    }
}
