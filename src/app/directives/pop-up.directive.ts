import {ComponentRef, Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {Overlay, OverlayPositionBuilder, OverlayRef} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {PopUpCardComponent} from "../pop-up-card/pop-up-card.component";
import {NavigationEnd, Router} from "@angular/router";

@Directive({
  selector: '[PopUp]'
})
export class PopUpDirective implements OnInit{
  @Input('PopUp') id = '';

  private overlayRef!: OverlayRef;

  constructor(private overlayPositionBuilder: OverlayPositionBuilder,
              private elementRef: ElementRef,
              private overlay: Overlay,
              private router:Router){
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
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.hide();
      }
    })
  }
 private setConst:any;
  @HostListener('mouseover')
   show() {
    this.setConst = setTimeout(()=>{
      const tooltipPortal = new ComponentPortal(PopUpCardComponent);
      const tooltipRef: ComponentRef<PopUpCardComponent> = this.overlayRef.attach(tooltipPortal);
      tooltipRef.instance.id = this.id;
    }, 150)
  }

  @HostListener('mouseout')
  hide() {
    clearTimeout(this.setConst)
    this.overlayRef.detach();
  }



}


