/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LinkderTestModule } from '../../../test.module';
import { PositionLinkderComponent } from 'app/entities/position-linkder/position-linkder.component';
import { PositionLinkderService } from 'app/entities/position-linkder/position-linkder.service';
import { PositionLinkder } from 'app/shared/model/position-linkder.model';

describe('Component Tests', () => {
    describe('PositionLinkder Management Component', () => {
        let comp: PositionLinkderComponent;
        let fixture: ComponentFixture<PositionLinkderComponent>;
        let service: PositionLinkderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [PositionLinkderComponent],
                providers: []
            })
                .overrideTemplate(PositionLinkderComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PositionLinkderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PositionLinkderService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PositionLinkder(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.positions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
