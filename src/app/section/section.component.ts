import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardIcon, ICard } from '../core/interfaces/card.interface';
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
export class SectionComponent implements OnInit {
  @Input() title!: string;
  @Input() cardType!: CardIcon;
  @Output() addEmitter: EventEmitter<CardIcon> = new EventEmitter<CardIcon>();
  createItem: ICard = createItemCard;



  constructor() { }

  ngOnInit(): void {
  }
  addNew(): void {
    this.addEmitter.emit(this.cardType);
  }
}
