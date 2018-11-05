import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompanyLinkder } from 'app/shared/model/company-linkder.model';

@Component({
    selector: 'jhi-company-linkder-detail',
    templateUrl: './company-linkder-detail.component.html'
})
export class CompanyLinkderDetailComponent implements OnInit {
    company: ICompanyLinkder;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ company }) => {
            this.company = company;
        });
    }

    previousState() {
        window.history.back();
    }
}
