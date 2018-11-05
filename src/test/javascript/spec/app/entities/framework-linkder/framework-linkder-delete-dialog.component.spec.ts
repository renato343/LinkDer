/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LinkderTestModule } from '../../../test.module';
import { FrameworkLinkderDeleteDialogComponent } from 'app/entities/framework-linkder/framework-linkder-delete-dialog.component';
import { FrameworkLinkderService } from 'app/entities/framework-linkder/framework-linkder.service';

describe('Component Tests', () => {
    describe('FrameworkLinkder Management Delete Component', () => {
        let comp: FrameworkLinkderDeleteDialogComponent;
        let fixture: ComponentFixture<FrameworkLinkderDeleteDialogComponent>;
        let service: FrameworkLinkderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [FrameworkLinkderDeleteDialogComponent]
            })
                .overrideTemplate(FrameworkLinkderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FrameworkLinkderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FrameworkLinkderService);
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
