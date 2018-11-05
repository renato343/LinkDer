/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LinkderTestModule } from '../../../test.module';
import { ProjectLinkderUpdateComponent } from 'app/entities/project-linkder/project-linkder-update.component';
import { ProjectLinkderService } from 'app/entities/project-linkder/project-linkder.service';
import { ProjectLinkder } from 'app/shared/model/project-linkder.model';

describe('Component Tests', () => {
    describe('ProjectLinkder Management Update Component', () => {
        let comp: ProjectLinkderUpdateComponent;
        let fixture: ComponentFixture<ProjectLinkderUpdateComponent>;
        let service: ProjectLinkderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [ProjectLinkderUpdateComponent]
            })
                .overrideTemplate(ProjectLinkderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProjectLinkderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectLinkderService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProjectLinkder(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.project = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProjectLinkder();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.project = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
