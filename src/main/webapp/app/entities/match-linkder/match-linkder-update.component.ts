import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMatchLinkder } from 'app/shared/model/match-linkder.model';
import { MatchLinkderService } from './match-linkder.service';

@Component({
    selector: 'jhi-match-linkder-update',
    templateUrl: './match-linkder-update.component.html'
})
export class MatchLinkderUpdateComponent implements OnInit {
    match: IMatchLinkder;
    isSaving: boolean;

    constructor(private matchService: MatchLinkderService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ match }) => {
            this.match = match;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.match.id !== undefined) {
            this.subscribeToSaveResponse(this.matchService.update(this.match));
        } else {
            this.subscribeToSaveResponse(this.matchService.create(this.match));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMatchLinkder>>) {
        result.subscribe((res: HttpResponse<IMatchLinkder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
