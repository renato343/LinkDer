/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LinkderTestModule } from '../../../test.module';
import { CompanyLinkderDetailComponent } from 'app/entities/company-linkder/company-linkder-detail.component';
import { CompanyLinkder } from 'app/shared/model/company-linkder.model';

describe('Component Tests', () => {
    describe('CompanyLinkder Management Detail Component', () => {
        let comp: CompanyLinkderDetailComponent;
        let fixture: ComponentFixture<CompanyLinkderDetailComponent>;
        const route = ({ data: of({ company: new CompanyLinkder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [CompanyLinkderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CompanyLinkderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CompanyLinkderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.company).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
