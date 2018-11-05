/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LinkderTestModule } from '../../../test.module';
import { CompanyLinkderUpdateComponent } from 'app/entities/company-linkder/company-linkder-update.component';
import { CompanyLinkderService } from 'app/entities/company-linkder/company-linkder.service';
import { CompanyLinkder } from 'app/shared/model/company-linkder.model';

describe('Component Tests', () => {
    describe('CompanyLinkder Management Update Component', () => {
        let comp: CompanyLinkderUpdateComponent;
        let fixture: ComponentFixture<CompanyLinkderUpdateComponent>;
        let service: CompanyLinkderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [CompanyLinkderUpdateComponent]
            })
                .overrideTemplate(CompanyLinkderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompanyLinkderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyLinkderService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CompanyLinkder(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.company = entity;
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
                    const entity = new CompanyLinkder();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.company = entity;
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
