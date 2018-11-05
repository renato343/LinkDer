/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LinkderTestModule } from '../../../test.module';
import { LocationLinkderDetailComponent } from 'app/entities/location-linkder/location-linkder-detail.component';
import { LocationLinkder } from 'app/shared/model/location-linkder.model';

describe('Component Tests', () => {
    describe('LocationLinkder Management Detail Component', () => {
        let comp: LocationLinkderDetailComponent;
        let fixture: ComponentFixture<LocationLinkderDetailComponent>;
        const route = ({ data: of({ location: new LocationLinkder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [LocationLinkderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LocationLinkderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LocationLinkderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.location).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
