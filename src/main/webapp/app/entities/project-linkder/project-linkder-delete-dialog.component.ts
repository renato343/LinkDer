import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProjectLinkder } from 'app/shared/model/project-linkder.model';
import { ProjectLinkderService } from './project-linkder.service';

@Component({
    selector: 'jhi-project-linkder-delete-dialog',
    templateUrl: './project-linkder-delete-dialog.component.html'
})
export class ProjectLinkderDeleteDialogComponent {
    project: IProjectLinkder;

    constructor(private projectService: ProjectLinkderService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.projectService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'projectListModification',
                content: 'Deleted an project'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-project-linkder-delete-popup',
    template: ''
})
export class ProjectLinkderDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ project }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProjectLinkderDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.project = project;
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
