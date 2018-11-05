import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILocationLinkder } from 'app/shared/model/location-linkder.model';
import { Principal } from 'app/core';
import { LocationLinkderService } from './location-linkder.service';

@Component({
    selector: 'jhi-location-linkder',
    templateUrl: './location-linkder.component.html'
})
export class LocationLinkderComponent implements OnInit, OnDestroy {
    locations: ILocationLinkder[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private locationService: LocationLinkderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.locationService.query().subscribe(
            (res: HttpResponse<ILocationLinkder[]>) => {
                this.locations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInLocations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILocationLinkder) {
        return item.id;
    }

    registerChangeInLocations() {
        this.eventSubscriber = this.eventManager.subscribe('locationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
