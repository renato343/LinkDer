import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPositionLinkder } from 'app/shared/model/position-linkder.model';
import { Principal } from 'app/core';
import { PositionLinkderService } from './position-linkder.service';

@Component({
    selector: 'jhi-position-linkder',
    templateUrl: './position-linkder.component.html'
})
export class PositionLinkderComponent implements OnInit, OnDestroy {
    positions: IPositionLinkder[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private positionService: PositionLinkderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.positionService.query().subscribe(
            (res: HttpResponse<IPositionLinkder[]>) => {
                this.positions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPositions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPositionLinkder) {
        return item.id;
    }

    registerChangeInPositions() {
        this.eventSubscriber = this.eventManager.subscribe('positionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
