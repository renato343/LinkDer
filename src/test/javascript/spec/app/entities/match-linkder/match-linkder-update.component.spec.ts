/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LinkderTestModule } from '../../../test.module';
import { MatchLinkderUpdateComponent } from 'app/entities/match-linkder/match-linkder-update.component';
import { MatchLinkderService } from 'app/entities/match-linkder/match-linkder.service';
import { MatchLinkder } from 'app/shared/model/match-linkder.model';

describe('Component Tests', () => {
    describe('MatchLinkder Management Update Component', () => {
        let comp: MatchLinkderUpdateComponent;
        let fixture: ComponentFixture<MatchLinkderUpdateComponent>;
        let service: MatchLinkderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [MatchLinkderUpdateComponent]
            })
                .overrideTemplate(MatchLinkderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MatchLinkderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MatchLinkderService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MatchLinkder(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.match = entity;
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
                    const entity = new MatchLinkder();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.match = entity;
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
