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
import { PAnimeComponent } from './p-anime/p-anime.component';
import { AnimeTypePipe } from './pipe/anime-type.pipe';
import {NameTransformPipe, RatingTransformPipe} from './pipe/name-transform.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CardPosterComponent,
    CardsComponent,
    HeaderComponent,
    PopUpCardComponent,
    PopUpDirective,
    PAnimeComponent,
    AnimeTypePipe,
    NameTransformPipe,
    RatingTransformPipe
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

