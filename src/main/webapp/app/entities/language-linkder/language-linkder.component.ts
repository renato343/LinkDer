import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILanguageLinkder } from 'app/shared/model/language-linkder.model';
import { Principal } from 'app/core';
import { LanguageLinkderService } from './language-linkder.service';

@Component({
    selector: 'jhi-language-linkder',
    templateUrl: './language-linkder.component.html'
})
export class LanguageLinkderComponent implements OnInit, OnDestroy {
    languages: ILanguageLinkder[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private languageService: LanguageLinkderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.languageService.query().subscribe(
            (res: HttpResponse<ILanguageLinkder[]>) => {
                this.languages = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInLanguages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILanguageLinkder) {
        return item.id;
    }

    registerChangeInLanguages() {
        this.eventSubscriber = this.eventManager.subscribe('languageListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
