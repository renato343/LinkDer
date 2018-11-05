/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LinkderTestModule } from '../../../test.module';
import { LanguageLinkderDetailComponent } from 'app/entities/language-linkder/language-linkder-detail.component';
import { LanguageLinkder } from 'app/shared/model/language-linkder.model';

describe('Component Tests', () => {
    describe('LanguageLinkder Management Detail Component', () => {
        let comp: LanguageLinkderDetailComponent;
        let fixture: ComponentFixture<LanguageLinkderDetailComponent>;
        const route = ({ data: of({ language: new LanguageLinkder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [LanguageLinkderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LanguageLinkderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LanguageLinkderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.language).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
