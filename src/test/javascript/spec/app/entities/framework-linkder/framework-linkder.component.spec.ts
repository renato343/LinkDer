/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LinkderTestModule } from '../../../test.module';
import { FrameworkLinkderComponent } from 'app/entities/framework-linkder/framework-linkder.component';
import { FrameworkLinkderService } from 'app/entities/framework-linkder/framework-linkder.service';
import { FrameworkLinkder } from 'app/shared/model/framework-linkder.model';

describe('Component Tests', () => {
    describe('FrameworkLinkder Management Component', () => {
        let comp: FrameworkLinkderComponent;
        let fixture: ComponentFixture<FrameworkLinkderComponent>;
        let service: FrameworkLinkderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [FrameworkLinkderComponent],
                providers: []
            })
                .overrideTemplate(FrameworkLinkderComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FrameworkLinkderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FrameworkLinkderService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FrameworkLinkder(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.frameworks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
