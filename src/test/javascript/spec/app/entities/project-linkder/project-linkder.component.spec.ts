/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LinkderTestModule } from '../../../test.module';
import { ProjectLinkderComponent } from 'app/entities/project-linkder/project-linkder.component';
import { ProjectLinkderService } from 'app/entities/project-linkder/project-linkder.service';
import { ProjectLinkder } from 'app/shared/model/project-linkder.model';

describe('Component Tests', () => {
    describe('ProjectLinkder Management Component', () => {
        let comp: ProjectLinkderComponent;
        let fixture: ComponentFixture<ProjectLinkderComponent>;
        let service: ProjectLinkderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [ProjectLinkderComponent],
                providers: []
            })
                .overrideTemplate(ProjectLinkderComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProjectLinkderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectLinkderService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ProjectLinkder(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.projects[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
