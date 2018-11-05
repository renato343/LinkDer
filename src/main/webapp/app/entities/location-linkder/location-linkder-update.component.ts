import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ILocationLinkder } from 'app/shared/model/location-linkder.model';
import { LocationLinkderService } from './location-linkder.service';
import { ICandidateLinkder } from 'app/shared/model/candidate-linkder.model';
import { CandidateLinkderService } from 'app/entities/candidate-linkder';
import { ICompanyLinkder } from 'app/shared/model/company-linkder.model';
import { CompanyLinkderService } from 'app/entities/company-linkder';
import { IProjectLinkder } from 'app/shared/model/project-linkder.model';
import { ProjectLinkderService } from 'app/entities/project-linkder';
import { IPositionLinkder } from 'app/shared/model/position-linkder.model';
import { PositionLinkderService } from 'app/entities/position-linkder';

@Component({
    selector: 'jhi-location-linkder-update',
    templateUrl: './location-linkder-update.component.html'
})
export class LocationLinkderUpdateComponent implements OnInit {
    location: ILocationLinkder;
    isSaving: boolean;

    candidates: ICandidateLinkder[];

    companies: ICompanyLinkder[];

    projects: IProjectLinkder[];

    positions: IPositionLinkder[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private locationService: LocationLinkderService,
        private candidateService: CandidateLinkderService,
        private companyService: CompanyLinkderService,
        private projectService: ProjectLinkderService,
        private positionService: PositionLinkderService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ location }) => {
            this.location = location;
        });
        this.candidateService.query().subscribe(
            (res: HttpResponse<ICandidateLinkder[]>) => {
                this.candidates = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.companyService.query().subscribe(
            (res: HttpResponse<ICompanyLinkder[]>) => {
                this.companies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.projectService.query().subscribe(
            (res: HttpResponse<IProjectLinkder[]>) => {
                this.projects = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.positionService.query().subscribe(
            (res: HttpResponse<IPositionLinkder[]>) => {
                this.positions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.location.id !== undefined) {
            this.subscribeToSaveResponse(this.locationService.update(this.location));
        } else {
            this.subscribeToSaveResponse(this.locationService.create(this.location));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILocationLinkder>>) {
        result.subscribe((res: HttpResponse<ILocationLinkder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCandidateById(index: number, item: ICandidateLinkder) {
        return item.id;
    }

    trackCompanyById(index: number, item: ICompanyLinkder) {
        return item.id;
    }

    trackProjectById(index: number, item: IProjectLinkder) {
        return item.id;
    }

    trackPositionById(index: number, item: IPositionLinkder) {
        return item.id;
    }
}
