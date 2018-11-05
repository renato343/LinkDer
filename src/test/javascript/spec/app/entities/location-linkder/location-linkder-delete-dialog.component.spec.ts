/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LinkderTestModule } from '../../../test.module';
import { LocationLinkderDeleteDialogComponent } from 'app/entities/location-linkder/location-linkder-delete-dialog.component';
import { LocationLinkderService } from 'app/entities/location-linkder/location-linkder.service';

describe('Component Tests', () => {
    describe('LocationLinkder Management Delete Component', () => {
        let comp: LocationLinkderDeleteDialogComponent;
        let fixture: ComponentFixture<LocationLinkderDeleteDialogComponent>;
        let service: LocationLinkderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [LocationLinkderDeleteDialogComponent]
            })
                .overrideTemplate(LocationLinkderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LocationLinkderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocationLinkderService);
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
