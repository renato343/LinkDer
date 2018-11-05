import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFrameworkLinkder } from 'app/shared/model/framework-linkder.model';
import { FrameworkLinkderService } from './framework-linkder.service';

@Component({
    selector: 'jhi-framework-linkder-delete-dialog',
    templateUrl: './framework-linkder-delete-dialog.component.html'
})
export class FrameworkLinkderDeleteDialogComponent {
    framework: IFrameworkLinkder;

    constructor(
        private frameworkService: FrameworkLinkderService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.frameworkService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'frameworkListModification',
                content: 'Deleted an framework'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-framework-linkder-delete-popup',
    template: ''
})
export class FrameworkLinkderDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ framework }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FrameworkLinkderDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.framework = framework;
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
