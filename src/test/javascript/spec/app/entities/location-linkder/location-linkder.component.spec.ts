/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LinkderTestModule } from '../../../test.module';
import { LocationLinkderComponent } from 'app/entities/location-linkder/location-linkder.component';
import { LocationLinkderService } from 'app/entities/location-linkder/location-linkder.service';
import { LocationLinkder } from 'app/shared/model/location-linkder.model';

describe('Component Tests', () => {
    describe('LocationLinkder Management Component', () => {
        let comp: LocationLinkderComponent;
        let fixture: ComponentFixture<LocationLinkderComponent>;
        let service: LocationLinkderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [LocationLinkderComponent],
                providers: []
            })
                .overrideTemplate(LocationLinkderComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LocationLinkderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocationLinkderService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new LocationLinkder(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.locations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
