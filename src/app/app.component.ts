import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { finalize, first } from 'rxjs/operators';
import { CardFactory } from './core/card-factory';
import { CardIcon, ICard } from './core/interfaces/card.interface';
import { CinemaScreen, CinemaScreening } from './core/interfaces/cinema.interface';
import { FormComponent } from './form/form.component';
import { CinemaService } from './services/cinema.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('cinema') cinemaEl!: ElementRef;
  @ViewChild('movie') movieEl!: ElementRef;
  @ViewChild('booking') bookingEl!: ElementRef;

  @ViewChild('cinemaNav') cinemaNavEl!: ElementRef;
  @ViewChild('movieNav') movieNavEl!: ElementRef;
  @ViewChild('bookingNav') bookingNavEl!: ElementRef;

  bsModalRef?: BsModalRef;

  title = 'ultraplex';
  cinemaCards: ICard[] = [];
  screenCards: ICard[] = [];
  screeningCards: ICard[] = []
  movieCards: ICard[] = [];
  bookingCards: ICard[] = [];


  selectedCinemaId!: number | string;
  selectedScreenId!: number | string;
  selectedScreeningId!: number | string;

  isLoading = true;
  areScreensLoading = false;
  constructor(
    private readonly service: CinemaService,
    private readonly modal: BsModalService,
    private readonly cd: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.getAllData();
  }
  ngAfterViewInit(): void {
    this.cinemaEl?.nativeElement.focus();
    this.movieEl?.nativeElement.focus();
    this.bookingEl?.nativeElement.focus();
    this.initNavbarObservers();
  }

  selectNavigation($element: HTMLElement): void {
    $element.scrollIntoView(true);
  }
  selectCinema(card: ICard): void {
    this.areScreensLoading = true;

    this.cinemaCards.forEach(card => card.selected = false);
    const cardInd = this.cinemaCards.findIndex(c => c.id === card.id);
    this.cinemaCards[cardInd].selected = true;
    this.cinemaCards = Array.from(this.cinemaCards);

    this.selectedCinemaId = card.id;
    this.service.getScreensAndScreenings(card.id)
      .pipe(
        first(),
        finalize(() => this.areScreensLoading = false))
      .subscribe( ([screens, screenings]) => {        
        this.screenCards = screens.map((s: CinemaScreen) => { return { title: s.name, id: s.id, icon: 'screen', size: 'medium', selected: false };});
        this.screeningCards = screenings.map((s: CinemaScreening) => { 
          const selectedMovieInd = this.movieCards.findIndex(m => m.id === s.movie.id);
          return { 
            title: selectedMovieInd !== -1 
              ? `${this.movieCards[selectedMovieInd].title} starting at ${s.start}`
              : `Movie ${s.movie.id} starting at ${s.start}`, 
            id: `${s.movie.id}-${s.start}`,
            icon: 'screening',
            size: 'medium',
            selected: false
          };
        });
      })
  }
  selectScreen(c: ICard): void {
    this.screenCards.forEach(card => card.selected = false);
    const cardInd = this.screenCards.findIndex(card => card.id === c.id);
    this.screenCards[cardInd].selected = true;
    this.screenCards = Array.from(this.screenCards);

    this.selectedScreenId = c.id;
    
  }
  selectScreening(c: ICard): void {
    this.screeningCards.forEach(card => card.selected = false);
    const cardInd = this.screeningCards.findIndex(card => card.id === c.id);
    this.screeningCards[cardInd].selected = true;
    this.screeningCards = Array.from(this.screeningCards);

    this.selectedScreeningId = c.id;
    this.openCreateModal('booking');
  }
  selectMovie(card: ICard): void {
    const initialState: ModalOptions = {
      initialState: {
        cinemaName: 'Modal with component',
      }
    };
    this.bsModalRef = this.modal.show(FormComponent, initialState);
  }
  openCreateModal(itemType: CardIcon): void {
    const initialState: ModalOptions = {
      class: 'modal-lg',
      initialState: {
        options: {
          createType: itemType,
          cinemaId: this.selectedCinemaId ?? null,
          screenId: this.selectedScreenId ?? null,
          screeningId: this.selectedScreeningId ?? null
        },
        cinemas: this.cinemaCards,
        movies: this.movieCards
      }
    };
    this.bsModalRef = this.modal.show(FormComponent, initialState);
    this.modal.onHide.pipe(first()).subscribe((_: any) => {
      this.getAllData();
  })

    
  }
  private getAllData(): void {
    this.service.getInitialData()
      .pipe(
        first(),
        finalize(() => {
          this.isLoading = false;
          this.cd.detectChanges();
        })
      )
      .subscribe(([c, m, b]) => {
        const fac = new CardFactory(c, m, b);
        [this.cinemaCards, this.movieCards, this.bookingCards] = fac.generateAllCards();               
      });

  }
  private initNavbarObservers(): void {
    const options = {
      root: null, 
      rootMargin: '0px',
      threshold: 0.5
    }
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {

        if (entry.isIntersecting) {
          document.querySelector('.active')?.classList.remove('active');
          const sectionId = entry.target.classList[0];

          switch (sectionId) {
            case 'cinema-section':
              this.cinemaNavEl.nativeElement.classList.add('active');
              break;
            case 'movie-section':
              this.movieNavEl.nativeElement.classList.add('active');
              break;
            case 'booking-section':
              this.bookingNavEl.nativeElement.classList.add('active');
              break;
          }
        }
      });
    }, options);
    [this.cinemaEl, this.movieEl, this.bookingEl].forEach(target => observer.observe(target.nativeElement));
  }


}
