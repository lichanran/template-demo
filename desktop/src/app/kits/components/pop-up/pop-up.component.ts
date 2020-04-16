import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  OnChanges, 
  SimpleChanges, 
 } from '@angular/core';

// 动画状态
type AnimationState = 'enter' | 'leave' | null;

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
})
export class PopUpComponent implements OnChanges {

  @Input() visible: boolean = false; 
  @Output() visibleChange = new EventEmitter<boolean>();

  // 当前动画状态
  animationState: AnimationState;
  maskAnimationClassMap: object;
  modalAnimationClassMap: object;
  // 动画时长需
  // 要与css一致, 可以考虑从css中取 
  modal_animate_duration: number = 300;

  constructor() { }
  
  ngOnChanges (changes: SimpleChanges): void {
    if (changes.visible) {
      this.handleVisibleChange(this.visible, changes.visible.firstChange)
    }
  }

  // 有关动画的....
  get hidden (): boolean {
    // 等到animationState 为null时
    return !this.visible && !this.animationState
  }
  
  handleClose () {
    this.visibleChange.emit(false);
    this.handleVisibleChange(false, false)
  }

  // 处理visible变化
  handleVisibleChange (visible: boolean, firstChange: boolean) {
    if (!firstChange) {
      this.animateTo(visible)
    }
  }

  changeAnimationState(state: AnimationState) {
    this.animationState = state;
    // if not null
    if (state) {
      this.maskAnimationClassMap = {
        [`fade-${state}`]: true,
        [`fade-${state}-active`]: true
      }
      this.modalAnimationClassMap = {
        [`zoom-${state}`]: true,
        [`zoom-${state}-active`]: true
      }
    } else {
      this.maskAnimationClassMap = this.modalAnimationClassMap = null
    }
  }

  animateTo (isVisible: boolean) {

      this.changeAnimationState(isVisible ? 'enter' : 'leave')

      return new Promise((resolve) => {
        setTimeout(() => {  
          this.changeAnimationState(null)
          resolve()
        }, this.modal_animate_duration)
      })

  }


  


}
