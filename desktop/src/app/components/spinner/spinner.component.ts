import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  _size: number = 30;
  
  @Input()
  set size (size: number) {
    this._size = size
  };
 
  constructor() { }

  ngOnInit() {
  }

}
