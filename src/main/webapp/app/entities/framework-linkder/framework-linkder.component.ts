import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFrameworkLinkder } from 'app/shared/model/framework-linkder.model';
import { Principal } from 'app/core';
import { FrameworkLinkderService } from './framework-linkder.service';

@Component({
    selector: 'jhi-framework-linkder',
    templateUrl: './framework-linkder.component.html'
})
export class FrameworkLinkderComponent implements OnInit, OnDestroy {
    frameworks: IFrameworkLinkder[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private frameworkService: FrameworkLinkderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.frameworkService.query().subscribe(
            (res: HttpResponse<IFrameworkLinkder[]>) => {
                this.frameworks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFrameworks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFrameworkLinkder) {
        return item.id;
    }

    registerChangeInFrameworks() {
        this.eventSubscriber = this.eventManager.subscribe('frameworkListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
