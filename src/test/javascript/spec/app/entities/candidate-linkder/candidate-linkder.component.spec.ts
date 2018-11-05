/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LinkderTestModule } from '../../../test.module';
import { CandidateLinkderComponent } from 'app/entities/candidate-linkder/candidate-linkder.component';
import { CandidateLinkderService } from 'app/entities/candidate-linkder/candidate-linkder.service';
import { CandidateLinkder } from 'app/shared/model/candidate-linkder.model';

describe('Component Tests', () => {
    describe('CandidateLinkder Management Component', () => {
        let comp: CandidateLinkderComponent;
        let fixture: ComponentFixture<CandidateLinkderComponent>;
        let service: CandidateLinkderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [CandidateLinkderComponent],
                providers: []
            })
                .overrideTemplate(CandidateLinkderComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CandidateLinkderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CandidateLinkderService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CandidateLinkder(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.candidates[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
