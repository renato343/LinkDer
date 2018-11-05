import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMatchLinkder } from 'app/shared/model/match-linkder.model';
import { Principal } from 'app/core';
import { MatchLinkderService } from './match-linkder.service';

@Component({
    selector: 'jhi-match-linkder',
    templateUrl: './match-linkder.component.html'
})
export class MatchLinkderComponent implements OnInit, OnDestroy {
    matches: IMatchLinkder[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private matchService: MatchLinkderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.matchService.query().subscribe(
            (res: HttpResponse<IMatchLinkder[]>) => {
                this.matches = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMatches();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMatchLinkder) {
        return item.id;
    }

    registerChangeInMatches() {
        this.eventSubscriber = this.eventManager.subscribe('matchListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
