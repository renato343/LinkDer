/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LinkderTestModule } from '../../../test.module';
import { CompanyLinkderComponent } from 'app/entities/company-linkder/company-linkder.component';
import { CompanyLinkderService } from 'app/entities/company-linkder/company-linkder.service';
import { CompanyLinkder } from 'app/shared/model/company-linkder.model';

describe('Component Tests', () => {
    describe('CompanyLinkder Management Component', () => {
        let comp: CompanyLinkderComponent;
        let fixture: ComponentFixture<CompanyLinkderComponent>;
        let service: CompanyLinkderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [CompanyLinkderComponent],
                providers: []
            })
                .overrideTemplate(CompanyLinkderComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompanyLinkderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyLinkderService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CompanyLinkder(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.companies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
