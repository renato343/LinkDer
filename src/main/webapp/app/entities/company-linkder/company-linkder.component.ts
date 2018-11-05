import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICompanyLinkder } from 'app/shared/model/company-linkder.model';
import { Principal } from 'app/core';
import { CompanyLinkderService } from './company-linkder.service';

@Component({
    selector: 'jhi-company-linkder',
    templateUrl: './company-linkder.component.html'
})
export class CompanyLinkderComponent implements OnInit, OnDestroy {
    companies: ICompanyLinkder[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private companyService: CompanyLinkderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.companyService.query().subscribe(
            (res: HttpResponse<ICompanyLinkder[]>) => {
                this.companies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCompanies();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICompanyLinkder) {
        return item.id;
    }

    registerChangeInCompanies() {
        this.eventSubscriber = this.eventManager.subscribe('companyListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
