import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CardsComponent} from './cards/cards.component';
import {PAnimeComponent} from "./p-anime/p-anime.component";

const routes: Routes = [
  {path: "animes/:page", component: CardsComponent},
  {path: '', redirectTo: "animes/1", pathMatch: 'full'},
  {path: "animes/:filter1/:filter1-type/:page", component: CardsComponent},
  {path: "animes/:filter1/:filter1-type/:filter2/:filter2-type/:page", component: CardsComponent},
  {path: "animes/:filter1/:filter1-type/:filter2/:filter2-type/:filter3/:filter3-type/:page", component: CardsComponent},
  {path: "animes/:filter1/:filter1-type/:filter2/:filter2-type/:filter3/:filter3-type/:filter4/:filter4-type/:page", component:CardsComponent},
  {path: "animes/:filter1/:filter1-type/:filter2/:filter2-type/:filter3/:filter3-type/:filter4/:filter4-type/:filter5/:filter5-type/:page", component:CardsComponent},
  {path: "animes/:filter1/:filter1-type/:filter2/:filter2-type/:filter3/:filter3-type/:filter4/:filter4-type/:filter5/:filter5-type/:filter6/:filter6-type/:page", component:CardsComponent},
  {path: "anime/:id", component: PAnimeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
