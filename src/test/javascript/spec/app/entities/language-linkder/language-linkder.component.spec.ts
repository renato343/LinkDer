/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LinkderTestModule } from '../../../test.module';
import { LanguageLinkderComponent } from 'app/entities/language-linkder/language-linkder.component';
import { LanguageLinkderService } from 'app/entities/language-linkder/language-linkder.service';
import { LanguageLinkder } from 'app/shared/model/language-linkder.model';

describe('Component Tests', () => {
    describe('LanguageLinkder Management Component', () => {
        let comp: LanguageLinkderComponent;
        let fixture: ComponentFixture<LanguageLinkderComponent>;
        let service: LanguageLinkderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [LanguageLinkderComponent],
                providers: []
            })
                .overrideTemplate(LanguageLinkderComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LanguageLinkderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LanguageLinkderService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new LanguageLinkder(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.languages[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
