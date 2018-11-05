/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LinkderTestModule } from '../../../test.module';
import { ProjectLinkderDetailComponent } from 'app/entities/project-linkder/project-linkder-detail.component';
import { ProjectLinkder } from 'app/shared/model/project-linkder.model';

describe('Component Tests', () => {
    describe('ProjectLinkder Management Detail Component', () => {
        let comp: ProjectLinkderDetailComponent;
        let fixture: ComponentFixture<ProjectLinkderDetailComponent>;
        const route = ({ data: of({ project: new ProjectLinkder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [ProjectLinkderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProjectLinkderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProjectLinkderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.project).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
