import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { first } from 'rxjs/operators';
import { ICard } from '../core/interfaces/card.interface';
import { CinemaScreen, CinemaScreening } from '../core/interfaces/cinema.interface';
import { FormOptions, FormType } from '../core/interfaces/form.interface';
import { CinemaService } from '../services/cinema.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements AfterViewInit {
  @ViewChild('staticTabs', { static: false }) tabs!: TabsetComponent;

  options?: FormOptions;
  cinemas?: ICard[];
  movies?: ICard[];
  screens: CinemaScreen[] = [];
  screenings: CinemaScreening[] = [];

  name = new FormControl('');
  runtime = new FormControl(0);
  seats = new FormControl(1);
  selectedCinemaId!: FormControl;
  selectedScreenId!: FormControl;
  selectedMovieId!: FormControl;
  selectedScreeningId!: FormControl;
  selectedStartTime!: FormControl;

  selectedTab!: FormType;
  isLoading = true;
  constructor(
    private readonly service: CinemaService,
    private readonly modalRef: BsModalRef) {
      this.isLoading = true;
    }

  ngAfterViewInit(): void {
    this.selectInitialTab();
    this.initFormControls();
    this.isLoading = false;
  }

  submit(): void {
    const formElements = {
      name: this.name.value,
      runtime: this.runtime.value,
      seats: this.seats.value,
      selectedCinemaId: this.selectedCinemaId .value,
      selectedScreenId: this.selectedScreenId.value,
      selectedMovieId: this.selectedMovieId.value,
      selectedScreeningId: this.selectedScreeningId.value,
      selectedStartTime: this.selectedStartTime.value,
      tab: this.selectedTab
    }
    
    switch (this.selectedTab) {
      case 'cinema':
        this.service.createCinema(formElements.name).pipe(first())
          .subscribe(_ => this.modalRef.hide())
        break;
      case 'screen':
        this.service.createScreen(formElements.name, formElements.selectedCinemaId).pipe(first())
          .subscribe(_ => this.modalRef.hide())
        break;
      case 'movie':
        this.service.createMovie(formElements.name, formElements.runtime).pipe(first())
          .subscribe(_ => this.modalRef.hide())
        break;

      case 'screening':
        this.service.createScreening(
          formElements.selectedCinemaId,
          formElements.selectedScreenId,
          formElements.selectedMovieId,
          formElements.selectedStartTime
        ).pipe(first())
          .subscribe(_ => this.modalRef.hide())
        break;

      case 'booking':
        this.service.createBooking(
          formElements.selectedScreeningId,
          formElements.seats
        ).pipe(first())
          .subscribe(_ => this.modalRef.hide())
        break;
    }
  }
  updateScreensAndScreenings(cinemaId?: number | string): void {    
    this.service.getScreensAndScreenings(cinemaId ?? this.selectedCinemaId.value).pipe(first())
      .subscribe(([cScreens, cScreenings]) => {
        this.screens = cScreens;
        this.screenings = cScreenings;
      })
  }
  selectTab(tab: FormType): void {
    this.selectedTab = tab
  }
  private selectInitialTab(): void {
    const orderedTabs: FormType[] = ['cinema', 'screen', 'screening', 'movie', 'booking'];
    const ind = orderedTabs.findIndex(t => t === this.options?.createType);
    if (ind !== -1) {
      this.tabs.tabs[ind].active = true;
      this.selectedTab = orderedTabs[ind];
    }
  }
  private initFormControls(): void {
    if (this.options?.cinemaId ?? false) {
      this.updateScreensAndScreenings(this.options?.cinemaId);
    } 
    this.selectedCinemaId = new FormControl(this.options?.cinemaId ?? -1);
    this.selectedScreenId = new FormControl(this.options?.screenId ?? -1);
    this.selectedMovieId = new FormControl(this.options?.movieId ?? -1);
    this.selectedScreeningId = new FormControl(this.options?.screeningId ?? -1);
    this.selectedStartTime = new FormControl('');
  }
}
