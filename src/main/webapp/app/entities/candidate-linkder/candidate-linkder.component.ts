import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICandidateLinkder } from 'app/shared/model/candidate-linkder.model';
import { Principal } from 'app/core';
import { CandidateLinkderService } from './candidate-linkder.service';

@Component({
    selector: 'jhi-candidate-linkder',
    templateUrl: './candidate-linkder.component.html'
})
export class CandidateLinkderComponent implements OnInit, OnDestroy {
    candidates: ICandidateLinkder[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private candidateService: CandidateLinkderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.candidateService.query().subscribe(
            (res: HttpResponse<ICandidateLinkder[]>) => {
                this.candidates = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCandidates();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICandidateLinkder) {
        return item.id;
    }

    registerChangeInCandidates() {
        this.eventSubscriber = this.eventManager.subscribe('candidateListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
