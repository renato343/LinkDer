/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LinkderTestModule } from '../../../test.module';
import { CandidateLinkderDetailComponent } from 'app/entities/candidate-linkder/candidate-linkder-detail.component';
import { CandidateLinkder } from 'app/shared/model/candidate-linkder.model';

describe('Component Tests', () => {
    describe('CandidateLinkder Management Detail Component', () => {
        let comp: CandidateLinkderDetailComponent;
        let fixture: ComponentFixture<CandidateLinkderDetailComponent>;
        const route = ({ data: of({ candidate: new CandidateLinkder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [CandidateLinkderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CandidateLinkderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CandidateLinkderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.candidate).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
