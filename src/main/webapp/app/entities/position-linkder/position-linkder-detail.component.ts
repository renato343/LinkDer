import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPositionLinkder } from 'app/shared/model/position-linkder.model';

@Component({
    selector: 'jhi-position-linkder-detail',
    templateUrl: './position-linkder-detail.component.html'
})
export class PositionLinkderDetailComponent implements OnInit {
    position: IPositionLinkder;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ position }) => {
            this.position = position;
        });
    }

    previousState() {
        window.history.back();
    }
}
