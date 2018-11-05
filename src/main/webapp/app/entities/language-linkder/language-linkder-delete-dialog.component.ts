import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILanguageLinkder } from 'app/shared/model/language-linkder.model';
import { LanguageLinkderService } from './language-linkder.service';

@Component({
    selector: 'jhi-language-linkder-delete-dialog',
    templateUrl: './language-linkder-delete-dialog.component.html'
})
export class LanguageLinkderDeleteDialogComponent {
    language: ILanguageLinkder;

    constructor(
        private languageService: LanguageLinkderService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.languageService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'languageListModification',
                content: 'Deleted an language'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-language-linkder-delete-popup',
    template: ''
})
export class LanguageLinkderDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ language }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LanguageLinkderDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.language = language;
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
