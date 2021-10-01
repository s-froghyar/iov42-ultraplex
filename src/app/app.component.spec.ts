import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { MockBsModalService, MockChangeDetRef, MockCinemaService, MockIntersectionObserver } from './core/testing/services';
import { FormComponent } from './form/form.component';
import { SectionComponent } from './section/section.component';
import { CinemaService } from './services/cinema.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let cinemaServ: CinemaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, CardComponent, SectionComponent, FormComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatSelectModule,
        MatTooltipModule,
        ModalModule.forRoot(),
        TabsModule.forRoot()
      ],
      providers: [
        {provide: CinemaService, useClass: MockCinemaService},
        {provide: BsModalService, useClass: MockBsModalService},
        {provide: ChangeDetectorRef, useClass: MockChangeDetRef},
      ]
    }).compileComponents();
    (window as any).IntersectionObserver = MockIntersectionObserver;
    cinemaServ = TestBed.inject(CinemaService);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('on init', () => {
    it('should call the service for all the initial data', () => {
      const spy = jest.spyOn(cinemaServ, 'getInitialData');
      component.ngOnInit();
      component.ngAfterViewInit();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
