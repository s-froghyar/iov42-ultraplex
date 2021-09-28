import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { finalize, first } from 'rxjs/operators';
import { CardFactory } from './core/card';
import { CardIcon, ICard } from './core/interfaces/card.interface';
import { Booking, Cinema, Movie } from './core/interfaces/cinema.interface';
import { createItemCard, dashboardNavigationCards } from './core/nav-cards';
import { CinemaService } from './services/cinema.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ultraplex';
  navCards: ICard[] = dashboardNavigationCards;
  cinemaCards: ICard[] = [];
  movieCards: ICard[] = [];
  bookingCards: ICard[] = [];

  isLoading = true;

  constructor(
    private readonly service: CinemaService,
    // private readonly modal: BsModalService  
  ) {}
  ngOnInit(): void {
    console.log('lmao');
    this.getAllData();
  }


  selectNavigation(card: ICard): void {
    this.navCards.forEach(c => c.selected = false)
    card.selected = true;
  }
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
}
