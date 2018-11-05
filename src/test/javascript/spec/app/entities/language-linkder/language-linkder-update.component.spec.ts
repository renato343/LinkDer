/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LinkderTestModule } from '../../../test.module';
import { LanguageLinkderUpdateComponent } from 'app/entities/language-linkder/language-linkder-update.component';
import { LanguageLinkderService } from 'app/entities/language-linkder/language-linkder.service';
import { LanguageLinkder } from 'app/shared/model/language-linkder.model';

describe('Component Tests', () => {
    describe('LanguageLinkder Management Update Component', () => {
        let comp: LanguageLinkderUpdateComponent;
        let fixture: ComponentFixture<LanguageLinkderUpdateComponent>;
        let service: LanguageLinkderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [LanguageLinkderUpdateComponent]
            })
                .overrideTemplate(LanguageLinkderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LanguageLinkderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LanguageLinkderService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LanguageLinkder(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.language = entity;
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
                    const entity = new LanguageLinkder();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.language = entity;
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
