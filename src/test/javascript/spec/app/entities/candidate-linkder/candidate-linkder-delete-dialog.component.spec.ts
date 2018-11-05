/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LinkderTestModule } from '../../../test.module';
import { CandidateLinkderDeleteDialogComponent } from 'app/entities/candidate-linkder/candidate-linkder-delete-dialog.component';
import { CandidateLinkderService } from 'app/entities/candidate-linkder/candidate-linkder.service';

describe('Component Tests', () => {
    describe('CandidateLinkder Management Delete Component', () => {
        let comp: CandidateLinkderDeleteDialogComponent;
        let fixture: ComponentFixture<CandidateLinkderDeleteDialogComponent>;
        let service: CandidateLinkderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [CandidateLinkderDeleteDialogComponent]
            })
                .overrideTemplate(CandidateLinkderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CandidateLinkderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CandidateLinkderService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
