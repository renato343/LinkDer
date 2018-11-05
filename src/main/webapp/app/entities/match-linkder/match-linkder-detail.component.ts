import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMatchLinkder } from 'app/shared/model/match-linkder.model';

@Component({
    selector: 'jhi-match-linkder-detail',
    templateUrl: './match-linkder-detail.component.html'
})
export class MatchLinkderDetailComponent implements OnInit {
    match: IMatchLinkder;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ match }) => {
            this.match = match;
        });
    }

    previousState() {
        window.history.back();
    }
}
