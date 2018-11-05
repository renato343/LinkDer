/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LinkderTestModule } from '../../../test.module';
import { FrameworkLinkderDetailComponent } from 'app/entities/framework-linkder/framework-linkder-detail.component';
import { FrameworkLinkder } from 'app/shared/model/framework-linkder.model';

describe('Component Tests', () => {
    describe('FrameworkLinkder Management Detail Component', () => {
        let comp: FrameworkLinkderDetailComponent;
        let fixture: ComponentFixture<FrameworkLinkderDetailComponent>;
        const route = ({ data: of({ framework: new FrameworkLinkder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [FrameworkLinkderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FrameworkLinkderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FrameworkLinkderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.framework).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
