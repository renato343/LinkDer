import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocationLinkder } from 'app/shared/model/location-linkder.model';

@Component({
    selector: 'jhi-location-linkder-detail',
    templateUrl: './location-linkder-detail.component.html'
})
export class LocationLinkderDetailComponent implements OnInit {
    location: ILocationLinkder;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ location }) => {
            this.location = location;
        });
    }

    previousState() {
        window.history.back();
    }
}
