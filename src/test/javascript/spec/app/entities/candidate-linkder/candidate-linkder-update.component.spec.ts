/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LinkderTestModule } from '../../../test.module';
import { CandidateLinkderUpdateComponent } from 'app/entities/candidate-linkder/candidate-linkder-update.component';
import { CandidateLinkderService } from 'app/entities/candidate-linkder/candidate-linkder.service';
import { CandidateLinkder } from 'app/shared/model/candidate-linkder.model';

describe('Component Tests', () => {
    describe('CandidateLinkder Management Update Component', () => {
        let comp: CandidateLinkderUpdateComponent;
        let fixture: ComponentFixture<CandidateLinkderUpdateComponent>;
        let service: CandidateLinkderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [CandidateLinkderUpdateComponent]
            })
                .overrideTemplate(CandidateLinkderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CandidateLinkderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CandidateLinkderService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CandidateLinkder(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.candidate = entity;
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
                    const entity = new CandidateLinkder();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.candidate = entity;
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
