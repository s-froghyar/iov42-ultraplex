import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { finalize, first } from 'rxjs/operators';
import { CardFactory } from './core/card';
import { CardIcon, ICard } from './core/interfaces/card.interface';
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
  movieCards: ICard[] = [];
  bookingCards: ICard[] = [];

  isLoading = true;

  constructor(
    private readonly service: CinemaService,
    private readonly modal: BsModalService  
  ) {}
  ngOnInit(): void {
    console.log('lmao');
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
    const initialState: ModalOptions = {
      initialState: {
        list: [
          'Open a modal with component',
          'Pass your data',
          'Do something else',
          '...'
        ],
        title: 'Modal with component'
      }
    };
    this.bsModalRef = this.modal.show(FormComponent, initialState);
  }
  selectMovie(card: ICard): void {}
  openCreateModal(itemType: CardIcon): void {
    console.log(itemType);
    
  }
  private getAllData(): void {
    this.service.getInitialData()
      .pipe(
        first(),
        finalize(() => this.isLoading = false)
      )
      .subscribe(([c, m, b]) => {
        const fac = new CardFactory(c, m, b);
        [this.cinemaCards, this.movieCards, this.bookingCards] = fac.generateAllCards();
        console.log([this.cinemaCards, this.movieCards, this.bookingCards]);
        
      });

  }
  private initNavbarObservers(): void {
    // const targets = document.getElementsByClassName('section-page')

    const options = {
      root: null, 
      rootMargin: '0px',
      threshold: 0.5
    }
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {

        if(entry.isIntersecting){
          document.querySelector('.active')?.classList.remove('active');
          const sectionId = entry.target.classList[0]; // identify which element is visible in the viewport at 50%
          console.log(sectionId);
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
            default:
              break;
          }
          // classList.add('active');
          
        }
      });
    }, options);
    [this.cinemaEl, this.movieEl, this.bookingEl].forEach(target => observer.observe(target.nativeElement));
  }


}
