import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICandidateLinkder } from 'app/shared/model/candidate-linkder.model';
import { CandidateLinkderService } from './candidate-linkder.service';

@Component({
    selector: 'jhi-candidate-linkder-delete-dialog',
    templateUrl: './candidate-linkder-delete-dialog.component.html'
})
export class CandidateLinkderDeleteDialogComponent {
    candidate: ICandidateLinkder;

    constructor(
        private candidateService: CandidateLinkderService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.candidateService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'candidateListModification',
                content: 'Deleted an candidate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-candidate-linkder-delete-popup',
    template: ''
})
export class CandidateLinkderDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ candidate }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CandidateLinkderDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.candidate = candidate;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
