/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LinkderTestModule } from '../../../test.module';
import { LocationLinkderUpdateComponent } from 'app/entities/location-linkder/location-linkder-update.component';
import { LocationLinkderService } from 'app/entities/location-linkder/location-linkder.service';
import { LocationLinkder } from 'app/shared/model/location-linkder.model';

describe('Component Tests', () => {
    describe('LocationLinkder Management Update Component', () => {
        let comp: LocationLinkderUpdateComponent;
        let fixture: ComponentFixture<LocationLinkderUpdateComponent>;
        let service: LocationLinkderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [LocationLinkderUpdateComponent]
            })
                .overrideTemplate(LocationLinkderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LocationLinkderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocationLinkderService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LocationLinkder(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.location = entity;
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
                    const entity = new LocationLinkder();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.location = entity;
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
