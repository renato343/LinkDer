/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LinkderTestModule } from '../../../test.module';
import { PositionLinkderUpdateComponent } from 'app/entities/position-linkder/position-linkder-update.component';
import { PositionLinkderService } from 'app/entities/position-linkder/position-linkder.service';
import { PositionLinkder } from 'app/shared/model/position-linkder.model';

describe('Component Tests', () => {
    describe('PositionLinkder Management Update Component', () => {
        let comp: PositionLinkderUpdateComponent;
        let fixture: ComponentFixture<PositionLinkderUpdateComponent>;
        let service: PositionLinkderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [PositionLinkderUpdateComponent]
            })
                .overrideTemplate(PositionLinkderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PositionLinkderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PositionLinkderService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PositionLinkder(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.position = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PositionLinkder();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.position = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
