/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LinkderTestModule } from '../../../test.module';
import { FrameworkLinkderUpdateComponent } from 'app/entities/framework-linkder/framework-linkder-update.component';
import { FrameworkLinkderService } from 'app/entities/framework-linkder/framework-linkder.service';
import { FrameworkLinkder } from 'app/shared/model/framework-linkder.model';

describe('Component Tests', () => {
    describe('FrameworkLinkder Management Update Component', () => {
        let comp: FrameworkLinkderUpdateComponent;
        let fixture: ComponentFixture<FrameworkLinkderUpdateComponent>;
        let service: FrameworkLinkderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [FrameworkLinkderUpdateComponent]
            })
                .overrideTemplate(FrameworkLinkderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FrameworkLinkderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FrameworkLinkderService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FrameworkLinkder(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.framework = entity;
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
                    const entity = new FrameworkLinkder();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.framework = entity;
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
