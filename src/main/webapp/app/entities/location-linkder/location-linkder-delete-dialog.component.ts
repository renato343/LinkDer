import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILocationLinkder } from 'app/shared/model/location-linkder.model';
import { LocationLinkderService } from './location-linkder.service';

@Component({
    selector: 'jhi-location-linkder-delete-dialog',
    templateUrl: './location-linkder-delete-dialog.component.html'
})
export class LocationLinkderDeleteDialogComponent {
    location: ILocationLinkder;

    constructor(
        private locationService: LocationLinkderService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.locationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'locationListModification',
                content: 'Deleted an location'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-location-linkder-delete-popup',
    template: ''
})
export class LocationLinkderDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ location }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LocationLinkderDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.location = location;
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
