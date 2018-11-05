/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LinkderTestModule } from '../../../test.module';
import { MatchLinkderDetailComponent } from 'app/entities/match-linkder/match-linkder-detail.component';
import { MatchLinkder } from 'app/shared/model/match-linkder.model';

describe('Component Tests', () => {
    describe('MatchLinkder Management Detail Component', () => {
        let comp: MatchLinkderDetailComponent;
        let fixture: ComponentFixture<MatchLinkderDetailComponent>;
        const route = ({ data: of({ match: new MatchLinkder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [MatchLinkderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MatchLinkderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MatchLinkderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.match).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
