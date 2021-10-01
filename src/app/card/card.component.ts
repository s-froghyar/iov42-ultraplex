import { Component, HostBinding, Input } from '@angular/core';
import { CardIcon } from '../core/interfaces/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @HostBinding('class.small') isSmallClass: boolean = false;
  @HostBinding('class.medium') isMediumClass: boolean = false;
  @HostBinding('class.large') isLargeClass: boolean = false;
  @Input() set size(v) {
    this._size = v;
    switch (v) {
      case 'small':
        this.isSmallClass = true;
        this.isMediumClass = false;
        this.isLargeClass = false;
        break;
      case 'medium':
        this.isSmallClass = false;
        this.isMediumClass = true;
        this.isLargeClass = false;
        break;
      case 'large':
        this.isSmallClass = false;
        this.isMediumClass = false;
        this.isLargeClass = true;
        break;
    }
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
  @Input() disabled = false;
  

  iconUrl = '';
  private _size: string = 'medium';
  private _title: string = '';
  constructor() { }
}
