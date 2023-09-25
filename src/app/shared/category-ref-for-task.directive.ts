import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { CommonConstants } from 'src/app/utility/CommonConstants';
@Directive({
  selector: '[categoryRefForTask]'
})
export class CategoryRefForTaskDirective implements OnInit {
  @Input() 'categoryRefForTask':string;
  constructor(private el : ElementRef, private r2: Renderer2) { }
  ngOnInit(): void {
    let borderClr = CommonConstants.genColorForCategory(this.categoryRefForTask);
    this.r2.setStyle(this.el.nativeElement, 'border', `5px solid ${borderClr}`);
  }
}