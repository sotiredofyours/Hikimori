import {ComponentRef, Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {Overlay, OverlayPositionBuilder, OverlayRef} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {PopUpCardComponent} from "../pop-up-card/pop-up-card.component";

@Directive({
  selector: '[PopUp]'
})
export class PopUpDirective implements OnInit{
  @Input('PopUp') id = '';

  private overlayRef!: OverlayRef;

  constructor(private overlayPositionBuilder: OverlayPositionBuilder,
              private elementRef: ElementRef,
              private overlay: Overlay) {
  }

  ngOnInit(): void {
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([{
        originX: 'end',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
      }]);
    this.overlayRef = this.overlay.create({positionStrategy});
  }
 private setConst:any;
  @HostListener('mouseover')
   show() {
    this.setConst = setTimeout(()=>{
      const tooltipPortal = new ComponentPortal(PopUpCardComponent);
      const tooltipRef: ComponentRef<PopUpCardComponent> = this.overlayRef.attach(tooltipPortal);
      tooltipRef.instance.id = this.id;
    }, 300)
  }

  @HostListener('mouseout')
  hide() {
    clearTimeout(this.setConst)
    this.overlayRef.detach();
  }

}


