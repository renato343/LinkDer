import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPositionLinkder } from 'app/shared/model/position-linkder.model';
import { PositionLinkderService } from './position-linkder.service';
import { ILocationLinkder } from 'app/shared/model/location-linkder.model';
import { LocationLinkderService } from 'app/entities/location-linkder';
import { IProjectLinkder } from 'app/shared/model/project-linkder.model';
import { ProjectLinkderService } from 'app/entities/project-linkder';

@Component({
    selector: 'jhi-position-linkder-update',
    templateUrl: './position-linkder-update.component.html'
})
export class PositionLinkderUpdateComponent implements OnInit {
    position: IPositionLinkder;
    isSaving: boolean;

    locations: ILocationLinkder[];

    projects: IProjectLinkder[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private positionService: PositionLinkderService,
        private locationService: LocationLinkderService,
        private projectService: ProjectLinkderService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ position }) => {
            this.position = position;
        });
        this.locationService.query({ filter: 'position-is-null' }).subscribe(
            (res: HttpResponse<ILocationLinkder[]>) => {
                if (!this.position.location || !this.position.location.id) {
                    this.locations = res.body;
                } else {
                    this.locationService.find(this.position.location.id).subscribe(
                        (subRes: HttpResponse<ILocationLinkder>) => {
                            this.locations = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.projectService.query().subscribe(
            (res: HttpResponse<IProjectLinkder[]>) => {
                this.projects = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.position.id !== undefined) {
            this.subscribeToSaveResponse(this.positionService.update(this.position));
        } else {
            this.subscribeToSaveResponse(this.positionService.create(this.position));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPositionLinkder>>) {
        result.subscribe((res: HttpResponse<IPositionLinkder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProjectById(index: number, item: IProjectLinkder) {
        return item.id;
    }
}
