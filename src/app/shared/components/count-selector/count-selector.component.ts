import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'count-selector',
  templateUrl: './count-selector.component.html',
  styleUrls: ['./count-selector.component.scss']
})
export class CountSelectorComponent implements OnInit {

  @Input() count: number = 1;

  @Output() onCountChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  countChange() {

    this.onCountChange.emit(this.count);

  }

  // countChange(value: number) {
  //   this.count = value;
  //   this.onCountChange.emit(value);
  //   // this.onCountChange.emit(this.count);
  // }

  decreaseCount() {
    if (this.count > 1) {
      this.count--;
      this.countChange();
      // this.countChange(this.count);
    }
  }


  increaseCount() {
    this.count++;
    this.countChange();
    // this.countChange(this.count);

  }
}
