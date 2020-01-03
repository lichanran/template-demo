import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-error-view',
  templateUrl: './error-view.component.html',
  styleUrls: ['./error-view.component.css']
})
export class ErrorViewComponent implements OnInit {

  @Input() message: string = "加载失败...";
  @Output() reload = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }
  
  retry () {
      this.reload.emit()
  }

}
