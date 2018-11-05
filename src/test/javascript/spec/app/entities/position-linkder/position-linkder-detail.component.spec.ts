/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LinkderTestModule } from '../../../test.module';
import { PositionLinkderDetailComponent } from 'app/entities/position-linkder/position-linkder-detail.component';
import { PositionLinkder } from 'app/shared/model/position-linkder.model';

describe('Component Tests', () => {
    describe('PositionLinkder Management Detail Component', () => {
        let comp: PositionLinkderDetailComponent;
        let fixture: ComponentFixture<PositionLinkderDetailComponent>;
        const route = ({ data: of({ position: new PositionLinkder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [PositionLinkderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PositionLinkderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PositionLinkderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.position).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
