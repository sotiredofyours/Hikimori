import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {CardPosterComponent} from './card-poster/card-poster.component';
import {CardsComponent} from './cards/cards.component';
import {HeaderComponent} from './header/header.component';
import {FormsModule} from "@angular/forms";
import {PopUpCardComponent} from './pop-up-card/pop-up-card.component';
import {OverlayModule} from "@angular/cdk/overlay";
import { PopUpDirective } from './directives/pop-up.directive';

@NgModule({
  declarations: [
    AppComponent,
    CardPosterComponent,
    CardsComponent,
    HeaderComponent,
    PopUpCardComponent,
    PopUpDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    OverlayModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}

