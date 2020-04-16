import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-scrollbar',
  templateUrl: './scrollbar.component.html',
  styleUrls: ['./scrollbar.component.css']
})
export class ScrollbarComponent implements OnInit {
  @ViewChild("handler", {static: false})
  set handler (v: ElementRef) {
    this.handlerEl = v.nativeElement;
  }
  // scrollbar hander dom 元素
  handlerEl: HTMLDivElement;
  @Input() scrollbarHeight: number;
  @Input() handlerHeight: number;
  @Input() 
  set scrollTop (v: number) {
    this._scrollTop = v;
    if (this.handlerEl) {
        this.move(v);
    }
  };
  _scrollTop: number;
  @Output() drag = new EventEmitter<number>();

  ngOnInit () {}

  // 是否在拖拽
  isDragging: boolean = false;

  // 用于计算delta
  startY: number = null;

  // handler 顶端的位置
  startHandlerScrollTop: number = 0;

  constructor() { }

  startDrag (e) {
    this.isDragging = true
    this.startY = e.screenY;
    this.startHandlerScrollTop = this._scrollTop;
  }

  mousemoveHandler (e) {
    if (this.isDragging) {
      let deltaY = e.screenY - this.startY;
      let max = (this.scrollbarHeight - this.handlerHeight);
      
      let dest = this.startHandlerScrollTop + deltaY;
      this.move(dest)

      // emit  也需要限制范围
      // 以后再整理
      if (dest < 0) {
        dest = 0
      } else if (dest > max) {
        dest = max
      }
      this.drag.emit(dest);
    }
  }

  cancelDrag()  {
    this.isDragging = false
  }

  // 移动
  move (dest: number) {
      let max = (this.scrollbarHeight - this.handlerHeight);

      if (dest < 0) {
        dest = 0
      } else if (dest > max) {
        dest = max
      }
      this.handlerEl.style.transform = 'translateY(' + dest + 'px)';
      this._scrollTop = dest;
  }



}
