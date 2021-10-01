import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardIcon, CardSize, ICard } from '../core/interfaces/card.interface';

export const createItemCard: ICard = {
  title: 'Add new',
  icon: 'add',
  size: 'medium',
  selected: false,
  id: -1
}

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  @Input() title!: string;
  @Input() cardType!: CardIcon;
  @Input() cardSize!: CardSize;
  @Input() isEmpty = false;
  @Output() addEmitter: EventEmitter<CardIcon> = new EventEmitter<CardIcon>();
  createItem: ICard = createItemCard;



  constructor() { }

  addNew(): void {
    this.addEmitter.emit(this.cardType);
  }
}
