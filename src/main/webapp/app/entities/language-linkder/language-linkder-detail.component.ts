import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILanguageLinkder } from 'app/shared/model/language-linkder.model';

@Component({
    selector: 'jhi-language-linkder-detail',
    templateUrl: './language-linkder-detail.component.html'
})
export class LanguageLinkderDetailComponent implements OnInit {
    language: ILanguageLinkder;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ language }) => {
            this.language = language;
        });
    }

    previousState() {
        window.history.back();
    }
}
