/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LinkderTestModule } from '../../../test.module';
import { PositionLinkderDeleteDialogComponent } from 'app/entities/position-linkder/position-linkder-delete-dialog.component';
import { PositionLinkderService } from 'app/entities/position-linkder/position-linkder.service';

describe('Component Tests', () => {
    describe('PositionLinkder Management Delete Component', () => {
        let comp: PositionLinkderDeleteDialogComponent;
        let fixture: ComponentFixture<PositionLinkderDeleteDialogComponent>;
        let service: PositionLinkderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [PositionLinkderDeleteDialogComponent]
            })
                .overrideTemplate(PositionLinkderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PositionLinkderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PositionLinkderService);
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
