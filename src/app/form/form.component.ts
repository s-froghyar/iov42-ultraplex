import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { first } from 'rxjs/operators';
import { ICard } from '../core/interfaces/card.interface';
import { CinemaScreen, CinemaScreening } from '../core/interfaces/cinema.interface';
import { FormOptions } from '../core/interfaces/form.interface';
import { CinemaService } from '../services/cinema.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, AfterViewInit {
  @ViewChild('staticTabs', { static: false }) tabs!: TabsetComponent;

  options?: FormOptions;
  cinemas?: ICard[];
  movies?: ICard[];
  screens: CinemaScreen[] = [];
  screenings: CinemaScreening[] = [];

  name = new FormControl('');
  runtime = new FormControl(0);
  seats = new FormControl(1);
  selectedCinemaId = new FormControl(-1);
  selectedScreenId = new FormControl(-1);
  selectedMovieId = new FormControl(-1);
  selectedScreeningId = new FormControl(-1);
  selectedStartTime = new FormControl('');

  constructor(private readonly service: CinemaService) {}

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.selectInitialTab();
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
      selectedStartTime: this.selectedStartTime.value
    }
    console.log(formElements);
  }
  updateScreensAndScreenings(): void {    
    this.service.getScreensAndScreenings(this.selectedCinemaId.value).pipe(first())
      .subscribe(([cScreens, cScreenings]) => {
        this.screens = cScreens;
        this.screenings = cScreenings;
      })
  }
  private selectInitialTab(): void {
    const orderedTabs = ['cinema', 'screen', 'screening', 'movie', 'booking'];
    const ind = orderedTabs.findIndex(t => t === this.options?.createType);
    if (ind !== -1) {
      this.tabs.tabs[ind].active = true;
    }    
  }
}
