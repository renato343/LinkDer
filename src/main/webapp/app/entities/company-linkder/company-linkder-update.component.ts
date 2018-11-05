import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICompanyLinkder } from 'app/shared/model/company-linkder.model';
import { CompanyLinkderService } from './company-linkder.service';
import { ILocationLinkder } from 'app/shared/model/location-linkder.model';
import { LocationLinkderService } from 'app/entities/location-linkder';

@Component({
    selector: 'jhi-company-linkder-update',
    templateUrl: './company-linkder-update.component.html'
})
export class CompanyLinkderUpdateComponent implements OnInit {
    company: ICompanyLinkder;
    isSaving: boolean;

    locations: ILocationLinkder[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private companyService: CompanyLinkderService,
        private locationService: LocationLinkderService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ company }) => {
            this.company = company;
        });
        this.locationService.query({ filter: 'company-is-null' }).subscribe(
            (res: HttpResponse<ILocationLinkder[]>) => {
                if (!this.company.location || !this.company.location.id) {
                    this.locations = res.body;
                } else {
                    this.locationService.find(this.company.location.id).subscribe(
                        (subRes: HttpResponse<ILocationLinkder>) => {
                            this.locations = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.company.id !== undefined) {
            this.subscribeToSaveResponse(this.companyService.update(this.company));
        } else {
            this.subscribeToSaveResponse(this.companyService.create(this.company));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICompanyLinkder>>) {
        result.subscribe((res: HttpResponse<ICompanyLinkder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackLocationById(index: number, item: ILocationLinkder) {
        return item.id;
    }
}
