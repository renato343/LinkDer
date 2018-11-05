import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICandidateLinkder } from 'app/shared/model/candidate-linkder.model';
import { CandidateLinkderService } from './candidate-linkder.service';
import { IProjectLinkder } from 'app/shared/model/project-linkder.model';
import { ProjectLinkderService } from 'app/entities/project-linkder';
import { ILocationLinkder } from 'app/shared/model/location-linkder.model';
import { LocationLinkderService } from 'app/entities/location-linkder';

@Component({
    selector: 'jhi-candidate-linkder-update',
    templateUrl: './candidate-linkder-update.component.html'
})
export class CandidateLinkderUpdateComponent implements OnInit {
    candidate: ICandidateLinkder;
    isSaving: boolean;

    projects: IProjectLinkder[];

    locations: ILocationLinkder[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private candidateService: CandidateLinkderService,
        private projectService: ProjectLinkderService,
        private locationService: LocationLinkderService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ candidate }) => {
            this.candidate = candidate;
        });
        this.projectService.query({ filter: 'candidate-is-null' }).subscribe(
            (res: HttpResponse<IProjectLinkder[]>) => {
                if (!this.candidate.project || !this.candidate.project.id) {
                    this.projects = res.body;
                } else {
                    this.projectService.find(this.candidate.project.id).subscribe(
                        (subRes: HttpResponse<IProjectLinkder>) => {
                            this.projects = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.locationService.query({ filter: 'candidate-is-null' }).subscribe(
            (res: HttpResponse<ILocationLinkder[]>) => {
                if (!this.candidate.location || !this.candidate.location.id) {
                    this.locations = res.body;
                } else {
                    this.locationService.find(this.candidate.location.id).subscribe(
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
        if (this.candidate.id !== undefined) {
            this.subscribeToSaveResponse(this.candidateService.update(this.candidate));
        } else {
            this.subscribeToSaveResponse(this.candidateService.create(this.candidate));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICandidateLinkder>>) {
        result.subscribe((res: HttpResponse<ICandidateLinkder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProjectById(index: number, item: IProjectLinkder) {
        return item.id;
    }

    trackLocationById(index: number, item: ILocationLinkder) {
        return item.id;
    }
}
