import { Component, Input, OnInit } from '@angular/core';
import { CardSize } from '../core/interfaces/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() size!: CardSize;
  @Input() title!: string;
  @Input() faIcon!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
