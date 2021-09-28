import { Component, OnInit } from '@angular/core';
import { Card } from './core/interfaces/card.interface';
import { dashboardNavigationCards } from './core/nav-cards';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ultraplex';
  navCards: Card[] = dashboardNavigationCards;
  selectedNavigation: Card = dashboardNavigationCards[0];
  ngOnInit(): void {
    console.log('lmao');
    
  }


  selectNavigation(card: Card): void {
    this.navCards.forEach(c => c.selected = false)
    card.selected = true;
    this.selectedNavigation = Object.assign({}, card);
  }

}
