import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[proHover]'
})
export class HoverDirective  implements OnInit{
@Input() proHover="red";
  constructor(private elemref: ElementRef, private renderer: Renderer2) {
   
   }
  ngOnInit(): void {
    //this.elemref.nativeElement.style.backgroundColor=this.color;
    this.renderer.setStyle(this.elemref.nativeElement,'backgroundColor', this.proHover);
  }
  @HostListener("mouseenter") noMouseEnter(){
    this.renderer.setStyle(this.elemref.nativeElement,'backgroundColor', "green");
  }
  @HostListener("mouseleave") noMouseLeave(){
    this.renderer.setStyle(this.elemref.nativeElement,'backgroundColor', "white");
  }

}
