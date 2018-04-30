import {
  OnInit,
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[close-flash]',
})
export class CloseFlashDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('click')
  hideParent() {
    let parent = this.elementRef.nativeElement.parentElement;
    this.renderer.setStyle(parent, 'display', 'none');
  }
}
