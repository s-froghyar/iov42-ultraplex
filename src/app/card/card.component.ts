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
  @Input() set icon(v: CardIcon) {
    this.iconUrl = `../../assets/${v}.svg`;
  }
  @Input() set title(v: string | null) {
    this._title = v ?? 'No title found'; 
  };
  get title(): string {
    return this._title;
  }
  @Input() secondary!: boolean;
  @Input() active!: boolean;
  

  iconUrl = '';
  private _size: string = 'card medium';
  private _title: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
