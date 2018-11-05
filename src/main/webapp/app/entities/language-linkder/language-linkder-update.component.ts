import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ILanguageLinkder } from 'app/shared/model/language-linkder.model';
import { LanguageLinkderService } from './language-linkder.service';
import { ICandidateLinkder } from 'app/shared/model/candidate-linkder.model';
import { CandidateLinkderService } from 'app/entities/candidate-linkder';
import { IProjectLinkder } from 'app/shared/model/project-linkder.model';
import { ProjectLinkderService } from 'app/entities/project-linkder';
import { IPositionLinkder } from 'app/shared/model/position-linkder.model';
import { PositionLinkderService } from 'app/entities/position-linkder';

@Component({
    selector: 'jhi-language-linkder-update',
    templateUrl: './language-linkder-update.component.html'
})
export class LanguageLinkderUpdateComponent implements OnInit {
    language: ILanguageLinkder;
    isSaving: boolean;

    candidates: ICandidateLinkder[];

    projects: IProjectLinkder[];

    positions: IPositionLinkder[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private languageService: LanguageLinkderService,
        private candidateService: CandidateLinkderService,
        private projectService: ProjectLinkderService,
        private positionService: PositionLinkderService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ language }) => {
            this.language = language;
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
        if (this.language.id !== undefined) {
            this.subscribeToSaveResponse(this.languageService.update(this.language));
        } else {
            this.subscribeToSaveResponse(this.languageService.create(this.language));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILanguageLinkder>>) {
        result.subscribe((res: HttpResponse<ILanguageLinkder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPositionById(index: number, item: IPositionLinkder) {
        return item.id;
    }
}
