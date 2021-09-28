import { Component, Input, OnInit, Output } from '@angular/core';
import { CardIcon, CardSize } from '../core/interfaces/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() set size(v) {
    this._size = `card ${v}`;
  }
  get size(){
    return this._size;
  }
  @Input() title!: string;
  @Input() set icon(v: CardIcon) {
    this.iconUrl = `../../assets/${v}.svg`;
  }
  @Input() active!: boolean;
  @Output() 


  iconUrl = '';
  private _size: string = 'card medium';
  constructor() { }

  ngOnInit(): void {
  }

}
