import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IProjectLinkder } from 'app/shared/model/project-linkder.model';
import { ProjectLinkderService } from './project-linkder.service';
import { ILocationLinkder } from 'app/shared/model/location-linkder.model';
import { LocationLinkderService } from 'app/entities/location-linkder';
import { ICandidateLinkder } from 'app/shared/model/candidate-linkder.model';
import { CandidateLinkderService } from 'app/entities/candidate-linkder';
import { ICompanyLinkder } from 'app/shared/model/company-linkder.model';
import { CompanyLinkderService } from 'app/entities/company-linkder';

@Component({
    selector: 'jhi-project-linkder-update',
    templateUrl: './project-linkder-update.component.html'
})
export class ProjectLinkderUpdateComponent implements OnInit {
    project: IProjectLinkder;
    isSaving: boolean;

    locations: ILocationLinkder[];

    candidates: ICandidateLinkder[];

    companies: ICompanyLinkder[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private projectService: ProjectLinkderService,
        private locationService: LocationLinkderService,
        private candidateService: CandidateLinkderService,
        private companyService: CompanyLinkderService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ project }) => {
            this.project = project;
        });
        this.locationService.query({ filter: 'project-is-null' }).subscribe(
            (res: HttpResponse<ILocationLinkder[]>) => {
                if (!this.project.location || !this.project.location.id) {
                    this.locations = res.body;
                } else {
                    this.locationService.find(this.project.location.id).subscribe(
                        (subRes: HttpResponse<ILocationLinkder>) => {
                            this.locations = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.project.id !== undefined) {
            this.subscribeToSaveResponse(this.projectService.update(this.project));
        } else {
            this.subscribeToSaveResponse(this.projectService.create(this.project));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IProjectLinkder>>) {
        result.subscribe((res: HttpResponse<IProjectLinkder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCandidateById(index: number, item: ICandidateLinkder) {
        return item.id;
    }

    trackCompanyById(index: number, item: ICompanyLinkder) {
        return item.id;
    }
}
