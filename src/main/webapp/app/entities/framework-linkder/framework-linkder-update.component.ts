import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFrameworkLinkder } from 'app/shared/model/framework-linkder.model';
import { FrameworkLinkderService } from './framework-linkder.service';
import { ICandidateLinkder } from 'app/shared/model/candidate-linkder.model';
import { CandidateLinkderService } from 'app/entities/candidate-linkder';
import { IProjectLinkder } from 'app/shared/model/project-linkder.model';
import { ProjectLinkderService } from 'app/entities/project-linkder';
import { ILanguageLinkder } from 'app/shared/model/language-linkder.model';
import { LanguageLinkderService } from 'app/entities/language-linkder';
import { IPositionLinkder } from 'app/shared/model/position-linkder.model';
import { PositionLinkderService } from 'app/entities/position-linkder';

@Component({
    selector: 'jhi-framework-linkder-update',
    templateUrl: './framework-linkder-update.component.html'
})
export class FrameworkLinkderUpdateComponent implements OnInit {
    framework: IFrameworkLinkder;
    isSaving: boolean;

    candidates: ICandidateLinkder[];

    projects: IProjectLinkder[];

    languages: ILanguageLinkder[];

    positions: IPositionLinkder[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private frameworkService: FrameworkLinkderService,
        private candidateService: CandidateLinkderService,
        private projectService: ProjectLinkderService,
        private languageService: LanguageLinkderService,
        private positionService: PositionLinkderService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ framework }) => {
            this.framework = framework;
        });
        this.candidateService.query().subscribe(
            (res: HttpResponse<ICandidateLinkder[]>) => {
                this.candidates = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.projectService.query().subscribe(
            (res: HttpResponse<IProjectLinkder[]>) => {
                this.projects = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.languageService.query().subscribe(
            (res: HttpResponse<ILanguageLinkder[]>) => {
                this.languages = res.body;
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
        if (this.framework.id !== undefined) {
            this.subscribeToSaveResponse(this.frameworkService.update(this.framework));
        } else {
            this.subscribeToSaveResponse(this.frameworkService.create(this.framework));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFrameworkLinkder>>) {
        result.subscribe((res: HttpResponse<IFrameworkLinkder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProjectById(index: number, item: IProjectLinkder) {
        return item.id;
    }

    trackLanguageById(index: number, item: ILanguageLinkder) {
        return item.id;
    }

    trackPositionById(index: number, item: IPositionLinkder) {
        return item.id;
    }
}
