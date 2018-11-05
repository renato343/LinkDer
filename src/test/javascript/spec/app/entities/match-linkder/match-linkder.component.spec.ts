/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LinkderTestModule } from '../../../test.module';
import { MatchLinkderComponent } from 'app/entities/match-linkder/match-linkder.component';
import { MatchLinkderService } from 'app/entities/match-linkder/match-linkder.service';
import { MatchLinkder } from 'app/shared/model/match-linkder.model';

describe('Component Tests', () => {
    describe('MatchLinkder Management Component', () => {
        let comp: MatchLinkderComponent;
        let fixture: ComponentFixture<MatchLinkderComponent>;
        let service: MatchLinkderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [MatchLinkderComponent],
                providers: []
            })
                .overrideTemplate(MatchLinkderComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MatchLinkderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MatchLinkderService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MatchLinkder(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.matches[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
